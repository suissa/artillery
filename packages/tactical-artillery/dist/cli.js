"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = cli;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const vitest_1 = require("./generators/vitest");
const cucumber_1 = require("./generators/cucumber");
const playwright_1 = require("./generators/playwright");
const runner_1 = require("./runner");
async function cli(args) {
    const command = args[2];
    const dslFile = args[3] || 'behavior.json';
    if (command === 'generate') {
        const dslContent = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(process.cwd(), dslFile), 'utf-8'));
        const outDir = path_1.default.resolve(process.cwd(), 'tests-generated');
        if (!fs_1.default.existsSync(outDir)) {
            fs_1.default.mkdirSync(outDir, { recursive: true });
        }
        console.log('Generating tests from DSL...');
        (0, vitest_1.generateVitest)(dslContent, path_1.default.join(outDir, 'vitest'));
        (0, cucumber_1.generateCucumber)(dslContent, path_1.default.join(outDir, 'cucumber'));
        (0, playwright_1.generatePlaywright)(dslContent, path_1.default.join(outDir, 'playwright'));
        console.log('Test generation complete.');
    }
    else if (command === 'run') {
        console.log('Running all generated tests...');
        await (0, runner_1.runTests)();
        console.log('All tests finished.');
    }
    else {
        console.log('Usage: tactical-artillery [generate|run] [dsl-file.json]');
    }
}
