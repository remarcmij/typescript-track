interface Product {
  name: string;
  price: number;
  category: string;
  inStock?: boolean;
}

type CartItem = Product & { quantity: number };

function formatLineItem(item: CartItem): string {
  const total = (item.price * item.quantity).toFixed(2);
  return `${item.quantity}x ${item.name} — $${total}`;
}

const widget: Product = {
  name: "Widget",
  price: 9.99,
  category: "Tools",
  inStock: true,
};
const gadget: Product = {
  name: "Gadget",
  price: 24.99,
  category: "Electronics",
};

const cart: CartItem[] = [
  { ...widget, quantity: 2 },
  { ...gadget, quantity: 1 },
];

cart.map(formatLineItem).forEach((line) => console.log(line));
