# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript learning track for the HackYourFuture curriculum. The target audience is trainees who know JavaScript and will be learning TypeScript before moving on to React. They have **not** learned React yet — avoid React references, props terminology, or React-specific examples in the learning material.

## File Structure

- `pages/` — one markdown file per topic, intended to be copied to Notion as individual pages:
  - `00-introduction.md` — Week 3 Overview with learning goals
  - `01-quick-start.md` — running `.ts` files with Node.js
  - `02-type-system.md` — primitives, arrays, objects, and unions
  - `03-interfaces-vs-types.md` — `interface` vs `type` aliases
  - `04-generics.md` — type parameters, generic interfaces, constraints
  - `05-type-inference.md` — inference vs explicit annotations
  - `06-unions-and-intersections.md` — unions (`|`), intersections (`&`), discriminated unions
  - `07-function-types.md` — parameter/return types, optional/default params, function type expressions
  - `08-utility-types.md` — `Partial`, `Required`, `Pick`, `Omit`, `Record`
  - `09-api-responses.md` — typing fetch responses, generic wrappers
  - `10-type-guards.md` — narrowing, type predicates, exhaustiveness checks
  - `TOOLING.md` — setting up TypeScript project tooling (transpilation with `tsc`, optional ESLint)
- `examples/` — runnable `.ts` files matching each page's "Hands on" exercise (e.g., `basics.ts`, `generics.ts`)

## Writing Guidelines

- **Explain code blocks.** Don't assume syntax is self-explanatory. After each code example, explain what the annotations mean, how type parameters are filled in, what the compiler checks, etc.
- **No premature React references.** Trainees have not learned React. Don't mention props, hooks, JSX, or React-specific patterns.
- **Self-contained examples.** Explanatory code blocks should define all the types they use. Don't reference types from other sections without redefining them.
- **Use GitHub alert blocks** (`[!IMPORTANT]`, `[!TIP]`, etc.) for callouts — not bold-prefix blockquotes.
- **Exercises use `node file.ts`** — trainees are expected to have Node.js v22.18+ or v23.6+ (or upgrade to current LTS). No experimental flags needed.
- **Keep `examples/` in sync.** When you add or update a "Hands on" exercise in a page, copy the code to the corresponding `.ts` file in `examples/`. The file name should match the one in the "Save as" instruction (e.g., `basics.ts`, `api-response.ts`).

## Current State

No build system, tests, linting, or source code exists yet. The repository is documentation-only curriculum content.
