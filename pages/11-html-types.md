# HTML Element Types

TypeScript ships type definitions for the browser DOM. Every HTML element has a corresponding TypeScript type arranged in a hierarchy. Understanding this hierarchy helps you get precise types when querying elements — and lets TypeScript catch mistakes like accessing `.value` on an element that doesn't have it.

## The DOM Type Hierarchy

DOM types form a chain where each level adds more properties:

```
EventTarget → Node → Element → HTMLElement → HTMLInputElement, HTMLButtonElement, …
```

- **`EventTarget`** — the base for anything that can receive events (`addEventListener`).
- **`Node`** — adds tree-structure properties (`.childNodes`, `.parentNode`, `.textContent`).
- **`Element`** — adds `.tagName`, `.id`, `.className`, and attribute methods like `.getAttribute()`.
- **`HTMLElement`** — adds browser-specific properties: `.style`, `.dataset`, `.classList`, `.hidden`.
- **Specific subtypes** — each HTML tag has its own type that adds tag-specific properties. `HTMLInputElement` adds `.value`, `.checked`, `.type`; `HTMLFormElement` adds `.reset()` and `.elements`; and so on.

When you query the DOM, TypeScript gives you a general type. If you need a property that only exists on a specific subtype, TypeScript will stop you:

```ts
const el: HTMLElement = document.querySelector("#my-input")!;
el.value; // Error: Property 'value' does not exist on type 'HTMLElement'
```

The property `.value` lives on `HTMLInputElement`, not on the broader `HTMLElement`. You need to tell TypeScript which specific element type you expect.

## Typing querySelector with a Generic

`querySelector` returns `Element | null` by default — the broadest useful type, because the selector string could match any element. To get a more specific type back, you pass the element type in angle brackets between the method name and the parentheses:

```ts
const input = document.querySelector<HTMLInputElement>("#title-input");
// input is HTMLInputElement | null

if (input) {
  console.log(input.value);   // OK — .value exists on HTMLInputElement
  console.log(input.checked); // OK — .checked too
}
```

The `<HTMLInputElement>` between the method name and the parentheses is the generic type argument. It tells TypeScript: "I expect this query to find an `<input>` element." TypeScript then narrows the return type from `Element | null` to `HTMLInputElement | null`.

You'll sometimes see `querySelector` paired with `!` — the non-null assertion operator:

```ts
const form = document.querySelector<HTMLFormElement>(".todo-form")!;
// form is HTMLFormElement (no null)

form.reset();
```

The `!` at the end tells TypeScript that the value is definitely not `null`. This removes `| null` from the type.

> [!IMPORTANT]
> The `!` operator silences the null check at compile time only. If the element doesn't exist at runtime, you'll get a runtime error. Only use it when you're certain the element is in the DOM.

## Common HTML Element Types

Here are the types you'll encounter most often when working with the DOM:

| Type | HTML element | Key properties |
|---|---|---|
| `HTMLInputElement` | `<input>` | `.value`, `.checked`, `.type`, `.required` |
| `HTMLFormElement` | `<form>` | `.reset()`, `.elements` |
| `HTMLButtonElement` | `<button>` | `.disabled`, `.type` |
| `HTMLUListElement` | `<ul>` | (inherits from `HTMLElement`) |
| `HTMLLIElement` | `<li>` | (inherits from `HTMLElement`) |
| `HTMLDivElement` | `<div>` | (inherits from `HTMLElement`) |

Notice the naming convention: `HTML` + the tag name in PascalCase + `Element`. Once you know this pattern, you can guess the type for most tags — `HTMLSpanElement`, `HTMLAnchorElement`, `HTMLTextAreaElement`, and so on.

## querySelectorAll and Iterating

`querySelectorAll` works the same way but returns a list of elements instead of a single one. The result is iterable, so you can loop over it with `for...of`:

```ts
const buttons = document.querySelectorAll<HTMLButtonElement>(".filter-bar button");

for (const btn of buttons) {
  console.log(btn.dataset.filter);
  btn.addEventListener("click", () => {
    console.log("clicked", btn.textContent);
  });
}
```

Each `btn` in the loop is typed as `HTMLButtonElement`, so you get full autocomplete and type checking for button-specific properties. There's no `| null` to worry about — `querySelectorAll` returns a list (possibly empty), not nullable elements.

## Type Assertions as an Alternative

You may see code that uses the `as` keyword instead of a generic argument:

```ts
const form = document.querySelector(".todo-form") as HTMLFormElement;
```

This is a **type assertion** — it tells TypeScript to treat the result as `HTMLFormElement`. It works, but there's an important difference: `as` overrides the type entirely, including removing `| null`. The generic approach preserves the null:

```ts
// Generic — keeps | null, you must handle it
const a = document.querySelector<HTMLFormElement>(".todo-form");
// a is HTMLFormElement | null

// Assertion — removes | null silently
const b = document.querySelector(".todo-form") as HTMLFormElement;
// b is HTMLFormElement (no null)
```

The generic approach is generally preferred because it makes null handling explicit. Use `as` only when you have a good reason to bypass the null check — and when you're certain the element exists.
