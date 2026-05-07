import fs from 'fs';
import path from 'path';

export function generateCucumber(dsl: any, outDir: string) {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  if (dsl.behaviors) {
    let featureCode = 'Feature: E2E Behaviors\n\n';
    let stepsCode =
      "import { Given, When, Then } from '@cucumber/cucumber';\n\n";

    let existingSteps = new Set<string>();

    for (const [behaviorName, behaviorDef] of Object.entries(dsl.behaviors) as [
      string,
      any
    ][]) {
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

    fs.writeFileSync(path.join(outDir, 'behavior.feature'), featureCode);
    fs.writeFileSync(path.join(outDir, 'steps.ts'), stepsCode);
  }
}
