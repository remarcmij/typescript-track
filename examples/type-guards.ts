type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rectangle'; width: number; height: number };

function assertNever(value: never): never {
  throw new Error(`Unhandled shape: ${JSON.stringify(value)}`);
}

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'rectangle':
      return shape.width * shape.height;
    default:
      return assertNever(shape);
  }
}

console.log(area({ kind: 'circle', radius: 5 }));
console.log(area({ kind: 'rectangle', width: 4, height: 7 }));
