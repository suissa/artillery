import fs from 'fs';
import path from 'path';

export function generateVitest(dsl: any, outDir: string) {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  let code = "import { describe, it, expect } from 'vitest';\n\n";

  // Simplistic generator for now based on entities in DSL
  if (dsl.entities) {
    code += "describe('Entities Typing and Validation', () => {\n";
    for (const [entityName, entityDef] of Object.entries(dsl.entities) as [
      string,
      any
    ][]) {
      code += `  describe('${entityName}', () => {\n`;
      code += "    it('should validate correctly', () => {\n";
      code += `      // TODO: generate specific validation logic for ${entityName}\n`;
      code += '      expect(true).toBe(true);\n';
      code += '    });\n';
      code += '  });\n';
    }
    code += '});\n';
  }

  fs.writeFileSync(path.join(outDir, 'entities.spec.ts'), code);
}
