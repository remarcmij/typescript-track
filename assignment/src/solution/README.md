# Solution (instructor only)

This folder contains the complete TypeScript solution. It is not distributed to trainees.

## Running the solution

Change the script source in `index.html` to point to the solution entry point:

```html
<script type="module" src="/src/solution/main.ts"></script>
```

Then run `npm run dev` as usual.

## Type-checking the solution

From the `assignment/` folder:

```bash
npx tsc --noEmit
```

This checks all `.ts` files under `src/`, including the solution. The JS files in `src/` are ignored by `tsc` (no `checkJs` in `tsconfig.json`).

Once trainees have completed their conversion (renamed `.js` → `.ts`), the same command checks their work too.

> [!NOTE]
> When the solution folder coexists with trainee code, `tsconfig.json` checks both. If this causes interference (e.g., duplicate identifier errors), add `"exclude": ["src/solution"]` to `tsconfig.json`. In the trainee-facing repo this is moot since the solution folder won't exist.
