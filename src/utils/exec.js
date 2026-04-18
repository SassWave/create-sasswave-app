import { execSync } from 'child_process';
import chalk from 'chalk';

export function runCommand(command, cwd = process.cwd()) {
    console.log(chalk.gray(`> ${command}`));
    try {
        execSync(command, { cwd, stdio: 'inherit' });
    } catch (error) {
        console.error(chalk.red(`\nFailed to execute: ${command}`));
        throw new Error(`Command failed: ${command}`);
    }
}
