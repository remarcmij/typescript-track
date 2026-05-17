Q: I need an example that should transpilation from modern TypeScript syntax to an older version of JavaScript. So the TypeScript compiler should not just remove types but generate code for the older version. It needs to be a simple example that does not require external libraries of polyfills.

A classic example for this is **async/await transpilation**. When you target ES5 or ES2015, the TypeScript compiler replaces `async`/`await` with generator functions or state machine code — not just type stripping, but genuine code generation.

**Why this example works well for students:**

The ES5 output shows two distinct transformations happening simultaneously:

1. **Type erasure** — `: number`, `: Promise<string>` are gone
2. **Syntax lowering** — `async function` → `function* ()` wrapped in `__awaiter`, each `await` → `yield`, arrow function → regular `function` expression

The `__awaiter` helper is the key teaching moment. It's a hand-rolled Promise state machine that drives the generator step by step. Students who've learned about generators and Promises will recognise the pattern; those who haven't now have a reason to.

The ES2017 tab drives the point home from the other direction: when the runtime already understands `async`/`await`, the compiler has nothing to translate — it only strips types.

**ES5** generates the most code. It injects a `__awaiter` helper that wraps a generator function (`function*`) in a Promise chain. Each `await` becomes a `yield`, and arrow functions become regular `function` expressions. The runtime has no knowledge of async or generators, so the compiler has to emulate everything.

**ES2016** generates the same `__awaiter` + generator pattern as ES5, because `async`/`await` wasn't part of ES2016. Arrow functions survive though, since ES2016 targets support them natively.

**ES2017** is where the transformation disappears. `async`/`await` was introduced in ES2017, so the compiler only strips the type annotations and leaves the async syntax untouched.

The short version: ES5 and ES2016 both need the state machine workaround; ES2017 doesn't.
