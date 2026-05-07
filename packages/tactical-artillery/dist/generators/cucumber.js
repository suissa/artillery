"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCucumber = generateCucumber;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function generateCucumber(dsl, outDir) {
    if (!fs_1.default.existsSync(outDir)) {
        fs_1.default.mkdirSync(outDir, { recursive: true });
    }
    if (dsl.behaviors) {
        let featureCode = 'Feature: E2E Behaviors\n\n';
        let stepsCode = "import { Given, When, Then } from '@cucumber/cucumber';\n\n";
        let existingSteps = new Set();
        for (const [behaviorName, behaviorDef] of Object.entries(dsl.behaviors)) {
            featureCode += `  Scenario: ${behaviorName}\n`;
            for (const step of behaviorDef.steps) {
                featureCode += `    ${step.type} ${step.description}\n`;
                // Map 'And' back to Given/When/Then based on Cucumber standard or just use When
                const stepKeyword = step.type === 'And' ? 'When' : step.type;
                const stepSignature = `${stepKeyword}('${step.description}')`;
                if (!existingSteps.has(stepSignature)) {
                    existingSteps.add(stepSignature);
                    stepsCode += `${stepKeyword}('${step.description}', async function () {\n`;
                    stepsCode += '  // Auto-generated step implementation\n';
                    stepsCode += '});\n\n';
                }
            }
            featureCode += '\n';
        }
        fs_1.default.writeFileSync(path_1.default.join(outDir, 'behavior.feature'), featureCode);
        fs_1.default.writeFileSync(path_1.default.join(outDir, 'steps.ts'), stepsCode);
    }
}
