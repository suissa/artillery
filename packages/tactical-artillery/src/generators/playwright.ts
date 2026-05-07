import fs from 'fs';
import path from 'path';

export function generatePlaywright(dsl: any, outDir: string) {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  let code = "import { test, expect } from '@playwright/test';\n\n";

  if (dsl.behaviors) {
    for (const [behaviorName, behaviorDef] of Object.entries(dsl.behaviors) as [
      string,
      any
    ][]) {
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
          code += `  expect(response${responseIndex}.status()).toBe(${
            step.expectedStatus || 200
          });\n`;
          responseIndex++;
        }
      }
      code += '});\n\n';
    }
  }

  fs.writeFileSync(path.join(outDir, 'e2e.spec.ts'), code);
}
