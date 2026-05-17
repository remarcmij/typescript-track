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
