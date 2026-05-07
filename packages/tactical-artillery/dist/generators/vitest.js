"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVitest = generateVitest;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function generateVitest(dsl, outDir) {
    if (!fs_1.default.existsSync(outDir)) {
        fs_1.default.mkdirSync(outDir, { recursive: true });
    }
    let code = "import { describe, it, expect } from 'vitest';\n\n";
    // Simplistic generator for now based on entities in DSL
    if (dsl.entities) {
        code += "describe('Entities Typing and Validation', () => {\n";
        for (const [entityName, entityDef] of Object.entries(dsl.entities)) {
            code += `  describe('${entityName}', () => {\n`;
            code += "    it('should validate correctly', () => {\n";
            code += `      // TODO: generate specific validation logic for ${entityName}\n`;
            code += '      expect(true).toBe(true);\n';
            code += '    });\n';
            code += '  });\n';
        }
        code += '});\n';
    }
    fs_1.default.writeFileSync(path_1.default.join(outDir, 'entities.spec.ts'), code);
}
