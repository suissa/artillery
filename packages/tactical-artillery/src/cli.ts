import fs from 'fs';
import path from 'path';
import { generateVitest } from './generators/vitest';
import { generateCucumber } from './generators/cucumber';
import { generatePlaywright } from './generators/playwright';
import { runTests } from './runner';

export async function cli(args: string[]) {
  const command = args[2];
  const dslFile = args[3] || 'behavior.json';

  if (command === 'generate') {
    const dslContent = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), dslFile), 'utf-8')
    );
    const outDir = path.resolve(process.cwd(), 'tests-generated');

    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    console.log('Generating tests from DSL...');
    generateVitest(dslContent, path.join(outDir, 'vitest'));
    generateCucumber(dslContent, path.join(outDir, 'cucumber'));
    generatePlaywright(dslContent, path.join(outDir, 'playwright'));
    console.log('Test generation complete.');
  } else if (command === 'run') {
    console.log('Running all generated tests...');
    await runTests();
    console.log('All tests finished.');
  } else {
    console.log('Usage: tactical-artillery [generate|run] [dsl-file.json]');
  }
}
