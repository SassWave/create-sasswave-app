import chalk from 'chalk';
import { runCommand } from '../utils/exec.js';

export function setupSass(projectDir) {
    console.log(chalk.magenta.bold('\nInstalling Sass...'));
    runCommand('npm install -D sass', projectDir);
    console.log(chalk.green('✔ Sass setup complete.'));
}
