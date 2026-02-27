# Quick Start: Running TypeScript with Node.js

Node.js can run `.ts` files directly — no install, no setup, no build step. Node.js strips the type annotations and executes the remaining JavaScript:

```bash
node example.ts
```

> [!IMPORTANT]
> Check your version with `node -v`. You need **Node.js v22.18+** or **v23.6+** for this to work. If you're on an older version, upgrade to the current LTS version (presently v24) from [nodejs.org](https://nodejs.org/).

That's all you need to run every exercise in these pages.

> [!TIP]
> See [TOOLING.md](TOOLING.md) for setting up a proper TypeScript project with transpilation (`tsc`), fast dev running (`tsx`), and linting (ESLint).
