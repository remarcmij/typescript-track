# Week 3 – TypeScript Lesson Plan

## Agenda

[Week 3 slides](https://docs.google.com/presentation/d/1NhiOJ5kOS_8kkiaA8KWXqTpEGnymA1iJXp1p3wc_0bI/edit?usp=drive_link)

| Time          | Topic                                        |
| ------------- | -------------------------------------------- |
| 09:30 – 09:45 | 🤝 Introductions & Interactive Quiz          |
| 09:45 – 10:00 | Key Takeaways: TypeScript                    |
| 10:00 – 10:30 | Refactoring Untyped JavaScript to TypeScript |
| 10:30 – 11:00 | 👥 Pair Exercise                             |
| 11:00 – 11:20 | Coffee Break                                 |
| 11:20 – 12:00 | Debugging Activity                           |
| 12:00 – 12:30 | Q&A                                          |

## 🤝 Introductions & Interactive Quiz (09:30 – 09:45)

_Mentor-led._

- [ ] Introductions
- [ ] Kahoot

### Kahoot questions

**1. What is the main benefit of TypeScript over plain JavaScript?**

- A) It runs faster in the browser
- B) It replaces the need for a framework like React
- C) ✅ It catches type mistakes before the code runs
- D) It automatically fixes bugs in your code

**2. Do you always need to write type annotations in TypeScript?**

- A) Yes, every variable must have an annotation
- B) ✅ No, TypeScript can often infer the type from the assigned value
- C) No, TypeScript ignores types unless you enable strict mode
- D) Yes, but only for functions

**3. What is an interface in TypeScript?**

- A) A visual component you add to a webpage
- B) A way to write CSS inside TypeScript files
- C) A built-in function that validates data at runtime
- D) ✅ A named description of an object's shape that you can reuse as a type

**4. What does `Partial<User>` do?**

- A) Removes half the properties from `User`
- B) ✅ Makes all properties of `User` optional
- C) Makes all properties of `User` required
- D) Creates a version of `User` with only string properties

**5. What is a union type?**

- A) A way to merge two objects into one
- B) A type that only works inside functions
- C) ✅ A type that allows a value to be one of several specified types
- D) A special type for arrays with mixed values

**6. What is the purpose of a type guard?**

- A) To prevent other developers from changing your types
- B) To make all types optional at runtime
- C) To convert a value from one type to another automatically
- D) ✅ To check which specific type a value is at a given point in the code

## Key Takeaways: TypeScript (09:45 – 10:00)

_Mentor-led._

- **Type annotations** — you add `: type` after a variable or parameter to tell TypeScript what it should contain; TypeScript then catches mismatches before the code runs
- **Type inference** — TypeScript figures out types automatically from assigned values, so you don't need to annotate everything; annotate when it can't infer, or when clarity matters
- **Interfaces and type aliases** — use `interface` to name and reuse object shapes; use `type` when you need unions, tuples, or other computed types
- **Generics** — a type placeholder written as `<T>` that gets filled in at the call site, letting you write reusable functions and interfaces without losing type safety
- **Utility types** — built-in helpers like `Partial<T>`, `Pick<T>`, and `Omit<T>` let you transform existing types instead of rewriting them from scratch
- **Type guards** — patterns like `typeof`, `in`, and custom `is` predicates let you narrow a union type so TypeScript knows which variant you're working with

## Refactoring Untyped JavaScript to TypeScript (10:00 – 10:30)

_Mentor-led. The goal is to show how adding TypeScript to existing JavaScript is incremental — you don't rewrite everything at once, you add types where they add the most value._

Scenario: a student management tool was written in plain JavaScript. Walk through adding types step by step, showing how each addition catches a real class of mistake.

### Starting code

```jsx
function createStudent(name, age, grades) {
  return { name, age, grades };
}

function getAverage(student) {
  const total = student.grades.reduce((sum, g) => sum + g, 0);
  return total / student.grades.length;
}

function describe(student) {
  return `${student.name} (age ${student.age}) — average: ${getAverage(student)}`;
}

const student = createStudent("Aisha", 27, [85, 92, 78]);
console.log(describe(student));
```

### First iteration — annotate parameters and return types (mentor-led)

- [ ] Add `: string`, `: number`, `: number[]` to `createStudent`'s parameters
- [ ] Add a return type annotation to `createStudent` using an inline object shape
- [ ] Show what happens when you call `createStudent("Aisha", "27", [85, 92])` — TypeScript catches the wrong type for `age`
- [ ] Annotate `getAverage` — parameter and return type

### Second iteration — extract an interface (mentor-led)

- [ ] The inline object shape on `createStudent` is getting verbose — extract a `Student` interface
- [ ] Replace the inline annotation with `: Student` on the return type and on the `student` parameter in `describe` and `getAverage`
- [ ] Add an optional `email?: string` to the interface and show that it doesn't break existing code
- [ ] Ask the group: when would `Partial<Student>` be useful here?

## 👥 Pair Exercise (10:30 – 11:00)

_Trainee exercise with mentor support. Trainees only write types — the logic is already in place. The single focus is: add interfaces, annotate functions, and use one utility type._

```tsx
/*
  The JavaScript logic below already works.
  Your job is to add TypeScript types — do not change the logic.

  Requirements:
  · Define a Product interface with: id (number), name (string),
    price (number), inStock (boolean)
  · Annotate all function parameters and return types
  · Use Partial<Product> for the updateProduct parameter

  Checkpoints:
  1. Define the Product interface and annotate getProductNames
  2. Annotate filterInStock and calculate TotalValue
  3. Annotate updateProduct using Partial<Product>
*/

function getProductNames(products) {
  return products.map((p) => p.name);
}

function filterInStock(products) {
  return products.filter((p) => p.inStock);
}

function calculateTotalValue(products) {
  return products.reduce((sum, p) => sum + p.price, 0);
}

function updateProduct(product, changes) {
  return { ...product, ...changes };
}

const inventory = [
  { id: 1, name: "Laptop", price: 999, inStock: true },
  { id: 2, name: "Mouse", price: 25, inStock: true },
  { id: 3, name: "Monitor", price: 300, inStock: false },
];

console.log(getProductNames(inventory));
console.log(filterInStock(inventory));
console.log(calculateTotalValue(inventory));
console.log(updateProduct(inventory[0], { price: 899 }));
```

## 🍱 Lunch Break (11:00 – 11:30)

## Debugging Activity (11:30 – 12:00)

_Mentor explains the scenario, then group activity to find the bugs._

Scenario: a trainee added TypeScript to a small order processing module. The code has several type errors and one logic mistake that TypeScript would have caught if the types were correct. Ask the group: "What does TypeScript complain about? What caused it? What should it look like instead?"

```tsx
interface Order {
  id: number;
  customer: string;
  total: number;
  status: "pending" | "shipped" | "delivered";
}

function getOrderSummary(order: Order): string {
  return `Order ${order.id} for ${order.customer}: €${order.total}`;
}

function markAsShipped(order: Order) {
  order.status = "shipped";
  return order;
}

function getTotalRevenue(orders: Order[]): string {
  return orders.reduce((sum, o) => sum + o.total, 0);
}

const orders = [
  { id: 1, customer: "Aisha", total: 120, status: "pending" },
  { id: 2, customer: "Ben", total: "80", status: "shipped" },
  { id: 3, customer: "Carlos", total: 45, status: "completed" },
];

console.log(getTotalRevenue(orders));
```

### Bugs to find

- `getTotalRevenue` is annotated to return `string` but `reduce` returns a `number` — the return type annotation is wrong
- `order.total` for Ben is `"80"` (a string) — this violates the `Order` interface where `total` must be a `number`; it would also silently break `getTotalRevenue` at runtime by concatenating instead of adding
- `status: "completed"` for Carlos is not a valid value — the `Order` interface only allows `"pending"`, `"shipped"`, or `"delivered"`

**Bonus:** _trainees_ fix all three issues and add a `console.log` that calls `getOrderSummary` on one of the corrected orders.

## Q&A (12:00 – 12:30)
