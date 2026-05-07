import { spawn } from 'child_process';
import path from 'path';

export async function runTests() {
  console.log('--- Running Vitest ---');
  await runCommand('npx', ['vitest', 'run', '--dir', 'tests-generated/vitest']);

  console.log('--- Running Cucumber ---');
  await runCommand('npx', [
    'cucumber-js',
    'tests-generated/cucumber/behavior.feature',
    '--require',
    'tests-generated/cucumber/steps.ts',
    '--require-module',
    'ts-node/register'
  ]);

  console.log('--- Running Playwright ---');
  await runCommand('npx', ['playwright', 'test', 'tests-generated/playwright']);
}

function runCommand(command: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, { stdio: 'inherit', shell: true });
    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(
            `Command ${command} ${args.join(' ')} failed with code ${code}`
          )
        );
      }
    });
  });
}
