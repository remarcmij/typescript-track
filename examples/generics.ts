function last<T>(arr: T[]): T {
  return arr[arr.length - 1];
}

console.log(last([1, 2, 3])); // 3
console.log(last(['a', 'b', 'c'])); // "c"
console.log(last([true, false, true])); // true
