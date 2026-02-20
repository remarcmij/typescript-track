interface Product {
  name: string;
  price: number;
  inStock: boolean;
}

function formatProduct(product: Product): string {
  const status = product.inStock ? 'In Stock' : 'Out of Stock';
  return `${product.name} — $${product.price.toFixed(2)} (${status})`;
}

const laptop: Product = { name: 'Laptop', price: 999.99, inStock: true };
const keyboard: Product = { name: 'Keyboard', price: 49.95, inStock: false };

console.log(formatProduct(laptop));
console.log(formatProduct(keyboard));
