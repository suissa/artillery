"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePlaywright = generatePlaywright;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function generatePlaywright(dsl, outDir) {
    if (!fs_1.default.existsSync(outDir)) {
        fs_1.default.mkdirSync(outDir, { recursive: true });
    }
    let code = "import { test, expect } from '@playwright/test';\n\n";
    if (dsl.behaviors) {
        for (const [behaviorName, behaviorDef] of Object.entries(dsl.behaviors)) {
            code += `test('${behaviorName}', async ({ request }) => {\n`;
            let responseIndex = 1;
            for (const step of behaviorDef.steps) {
                code += `  // ${step.type} ${step.description}\n`;
                if (step.action === 'api_request') {
                    const method = step.method || 'get';
                    const payloadStr = step.payload
                        ? `, { data: ${JSON.stringify(step.payload)} }`
                        : '';
                    code += `  const response${responseIndex} = await request.${method}('${step.url}'${payloadStr});\n`;
                    code += `  expect(response${responseIndex}.status()).toBe(${step.expectedStatus || 200});\n`;
                    responseIndex++;
                }
            }
            code += '});\n\n';
        }
    }
    fs_1.default.writeFileSync(path_1.default.join(outDir, 'e2e.spec.ts'), code);
}
