import enquirer from 'enquirer';
import chalk from 'chalk';

const { prompt } = enquirer;

async function askQuestions(appNameFromArgs) {
    console.log(chalk.cyan.bold('\n🌊 SassWave Create CLI'));
    console.log(chalk.gray('Behavior-driven scaffolding for your next big project.\n'));

    const questions = [];

    if (!appNameFromArgs) {
        questions.push({
            type: 'input',
            name: 'name',
            message: chalk.magenta.bold('App name'),
            initial: 'my-sasswave-app'
        });
    }

    questions.push({
        type: 'select',
        name: 'framework',
        message: chalk.blue.bold('Choose framework'),
        choices: [
            { name: 'next', message: chalk.white('Next.js (create-next-app)') },
            { name: 'react', message: chalk.white('React (Vite)') },
            { name: 'remix', message: chalk.white('Remix (create-remix)') }
        ]
    });

    const initialAnswers = await prompt(questions);

    // Predefine standard flags for each framework so the generator runs silently
    let flags = [];
    if (initialAnswers.framework === 'next') {
        flags = [
            '--ts',
            '--eslint',
            '--tailwind',
            '--src-dir',
            '--app',
            '--import-alias "@/*"',
            '--yes'
        ];
    } else if (initialAnswers.framework === 'react') {
        flags = ['--', '--template', 'react-ts'];
    } else if (initialAnswers.framework === 'remix') {
        flags = ['--yes', '--no-interactive'];
    }

    return {
        name: appNameFromArgs || initialAnswers.name,
        framework: initialAnswers.framework,
        language: 'TypeScript',
        flags
    };
}

export { askQuestions };
