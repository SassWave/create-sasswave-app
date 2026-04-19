import { jest } from '@jest/globals';
import nock from 'nock';
import request from 'supertest';
import { createServer } from 'http';
import https from 'https';

// We need to mock child_process.execSync
jest.unstable_mockModule('child_process', () => ({
    execSync: jest.fn()
}));

// We also need to mock chalk
const makeChalkMock = () => {
    const fn = jest.fn(text => text);
    fn.bold = jest.fn(text => text);
    return fn;
};

jest.unstable_mockModule('chalk', () => ({
    default: {
        gray: makeChalkMock(),
        cyan: makeChalkMock(),
        yellow: makeChalkMock(),
        magenta: makeChalkMock(),
        green: makeChalkMock(),
        red: makeChalkMock(),
        blue: makeChalkMock(),
        white: makeChalkMock()
    }
}));

// Mock fs-extra
jest.unstable_mockModule('fs-extra', () => ({
    default: {
        existsSync: jest.fn(() => false)
    }
}));

describe('CLI Tests using Jest, Nock, and Supertest', () => {
    let scaffoldProject;
    let setupSass;
    let execSyncMock;

    beforeAll(async () => {
        const cp = await import('child_process');
        execSyncMock = cp.execSync;

        const scaffoldModule = await import('../src/scaffold.js');
        scaffoldProject = scaffoldModule.scaffoldProject;

        const setupSassModule = await import('../src/setup/setupSass.js');
        setupSass = setupSassModule.setupSass;
    });

    afterEach(() => {
        jest.clearAllMocks();
        nock.cleanAll();
    });

    it('scaffoldProject executes correct command for React', () => {
        scaffoldProject({ name: 'my-react-app', framework: 'react', flags: ['--', '--template', 'react-ts'] });
        expect(execSyncMock).toHaveBeenCalledWith(
            expect.stringContaining('npm create vite@latest my-react-app -- --template react-ts'),
            expect.any(Object)
        );
    });

    it('scaffoldProject executes correct command for Next', () => {
        scaffoldProject({ name: 'my-next-app', framework: 'next', flags: ['--ts', '--yes'] });
        expect(execSyncMock).toHaveBeenCalledWith(
            expect.stringContaining('npx create-next-app@latest my-next-app --ts --yes'),
            expect.any(Object)
        );
    });

    it('setupSass runs correct npm install command', () => {
        setupSass('/mock/dir');
        expect(execSyncMock).toHaveBeenCalledWith(
            expect.stringContaining('npm install -D sass'),
            expect.objectContaining({ cwd: '/mock/dir' })
        );
    });

    it('demonstrates nock mocking an HTTP request', async () => {
        nock('https://api.github.com')
            .get('/repos/SassWave/create-sasswave-app')
            .reply(200, { name: 'create-sasswave-app' });

        const data = await new Promise((resolve, reject) => {
            https.get('https://api.github.com/repos/SassWave/create-sasswave-app', (res) => {
                let body = '';
                res.on('data', chunk => body += chunk);
                res.on('end', () => resolve(JSON.parse(body)));
            }).on('error', reject);
        });

        expect(data.name).toBe('create-sasswave-app');
    });

    it('demonstrates supertest with a dummy server', async () => {
        // Create a dummy node http server to test with supertest
        const server = createServer((req, res) => {
            if (req.url === '/ping') {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'pong' }));
            }
        });

        const response = await request(server).get('/ping');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('pong');
    });
});
