import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { runCommand } from './utils/exec.js';

export function scaffoldProject(answers) {
    const { name, framework, flags = [] } = answers;
    const projectDir = path.resolve(process.cwd(), name);

    if (fs.existsSync(projectDir)) {
        throw new Error(`Directory "${name}" already exists. Please remove or choose another name.`);
    }

    console.log(chalk.cyan.bold(`\n🚀 Scaffolding ${chalk.yellow(framework)} app: ${chalk.magenta(name)}...`));

    const flagsStr = flags.length > 0 ? ` ${flags.join(' ')}` : '';

    if (framework === 'next') {
        runCommand(`npx create-next-app@latest ${name}${flagsStr}`);
    } else if (framework === 'react') {
        runCommand(`npm create vite@latest ${name}${flagsStr}`);
    } else if (framework === 'remix') {
        runCommand(`npx create-remix@latest ${name}${flagsStr}`);
    } else {
        throw new Error(`Unsupported framework: ${framework}`);
    }

    return projectDir;
}
