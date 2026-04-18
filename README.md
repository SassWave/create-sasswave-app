# 🌊 create-sasswave-app

> Zero-config CLI to scaffold **SCSS-first** React, Next.js, or Remix apps — ready to build in seconds.

[![npm version](https://img.shields.io/npm/v/create-sasswave-app)](https://www.npmjs.com/package/create-sasswave-app)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)
[![License](https://img.shields.io/npm/l/create-sasswave-app)](https://github.com/shiv-am-saxena/Sasswave-CLI)

---

## 🚀 Usage

### Create a new app

```bash
npm create sasswave-app
```

### Or with npx

```bash
npx create-sasswave-app
```

### Pass the app name directly

```bash
npx create-sasswave-app my-app
```

The CLI will walk you through framework selection, scaffold your project, install Sass, apply SassWave-branded layouts, and download required assets — all in one command.

---

## 📦 What Gets Scaffolded

When you run the CLI, you'll be prompted to choose a framework:

| Option | What runs under the hood |
|--------|--------------------------|
| **Next.js** | `npx create-next-app@latest` (App Router + TypeScript + ESLint) |
| **React** | `npm create vite@latest` (react-ts template) |
| **Remix** | `npx create-remix@latest` |

After scaffolding, the CLI automatically:

1. **Installs Sass** as a dev dependency
2. **Removes boilerplate** (Tailwind configs, default CSS files, placeholder SVGs)
3. **Writes SassWave-ready SCSS** — global resets, variables, mixins, and module styles
4. **Generates branded components** — `layout`, `page`, `App` files with SassWave markup
5. **Downloads assets** — favicon, wordmark, and Urbanist font from the cloud

---

## 🎨 What Your Project Looks Like

### Next.js

```
my-app/
├── src/app/
│   ├── globals.scss          # Global styles, variables, mixins
│   ├── page.module.scss      # Page-level scoped styles
│   ├── layout.tsx            # SassWave-branded root layout
│   ├── page.tsx              # Landing page with hero section
│   └── favicon.ico           # SassWave favicon
├── public/
│   ├── wordmark.png          # SassWave logo
│   └── Urbanist-Regular.woff # Custom font
└── package.json
```

### React (Vite)

```
my-app/
├── src/
│   ├── App.tsx               # SassWave landing page
│   ├── App.module.scss       # Scoped component styles
│   ├── main.tsx              # Entry point with global SCSS
│   └── styles.scss           # Global styles, variables, mixins
├── public/
│   ├── favicon.png           # SassWave favicon
│   ├── wordmark.png          # SassWave logo
│   └── Urbanist-Regular.woff # Custom font
├── index.html
└── package.json
```

---

## ⚙️ Commands Reference

| Command | Description |
|---------|-------------|
| `npm create sasswave-app` | Launch the CLI (npm create convention) |
| `npx create-sasswave-app` | Launch the CLI (npx) |
| `npx create-sasswave-app my-app` | Skip the app name prompt |

### After scaffolding

```bash
cd my-app
npm run dev
```

---

## 🔧 Custom Assets

Assets are configured in `assets-manifest.json`. The CLI downloads them into your project during setup:

```json
[
  {
    "url": "https://example.com/logo.png",
    "dest": "public/logo.png",
    "frameworks": ["next", "react", "remix"],
    "description": "Project logo"
  }
]
```

| Field | Description |
|-------|-------------|
| `url` | Remote URL to download from |
| `dest` | Path inside the generated project |
| `frameworks` | Which frameworks receive this asset (`next`, `react`, `remix`) |

---

## 📋 Requirements

- **Node.js** >= 18.0.0
- **npm** >= 7 (ships with Node 18+)

---

## 🛠️ Development

```bash
git clone https://github.com/shiv-am-saxena/Sasswave-CLI.git
cd Sasswave-CLI
npm install
npm run dev     # Run the CLI locally
npm test        # Run unit tests
```

---

## 📝 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a list of changes in each release.

Releases are automated with [semantic-release](https://github.com/semantic-release/semantic-release) — version bumps, changelogs, and npm publishes happen on every push to `main`.

---

## 🔗 Links

- [SassWave Components](https://sasswave.in/components/)
- [SassWave Documentation](https://sasswave.in/docs/)
- [GitHub Repository](https://github.com/SassWave/create-sasswave-app)
- [Report Issues](https://github.com/SassWave/create-sasswave-app/issues)

---

## License

UNLICENSED
