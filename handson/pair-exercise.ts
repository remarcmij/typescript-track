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
