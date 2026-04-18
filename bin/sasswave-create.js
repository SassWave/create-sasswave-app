#!/usr/bin/env node

import chalk from 'chalk';
import { askQuestions } from '../src/prompts.js';
import { scaffoldProject } from '../src/scaffold.js';
import { setupSass } from '../src/setup/setupSass.js';
import { setupNextProject } from '../src/lib/nextSetup.js';
import { setupReactProject } from '../src/lib/reactSetup.js';
import { downloadAssets } from '../src/lib/assets.js';

async function run() {
    try {
        const appNameArg = process.argv[2];
        const answers = await askQuestions(appNameArg);

        console.log(chalk.gray('\nCreating app...'));
        const projectDir = scaffoldProject(answers);

        console.log(chalk.gray('\nInstalling dependencies...'));

        if (answers.framework === 'next') {
            await setupNextProject(answers, projectDir);
        } else if (answers.framework === 'react') {
            await setupReactProject(answers, projectDir);
        }

        // SassWave requires Sass to be installed across all frameworks (Next, React, Remix)
        setupSass(projectDir);

        // Download required assets based on the framework
        await downloadAssets(answers, projectDir);

        console.log('\n' + chalk.green.bold('✔ Setup complete! Next steps:'));
        console.log(`  ${chalk.cyan('cd')} ${chalk.magenta(answers.name)}`);
        console.log(`  ${chalk.cyan('npm run dev')}`);
    } catch (err) {
        console.error('\n' + chalk.red.bold('CLI Failed:'), err.message || err);
        process.exit(1);
    }
}

run();
