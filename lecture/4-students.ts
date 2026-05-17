type Student = {
  name: string;
  age: number;
  grades: number[];
};

function createStudent(name: string, age: number, grades: number[]): Student {
  return { name, age, grades };
}

function getAverage(student: Student): number {
  const total = student.grades.reduce((sum, g) => sum + g, 0);
  return total / student.grades.length;
}

function describe(student: Student): string {
  return `${student.name} (age ${student.age}) — average: ${getAverage(student)}`;
}

// const student = createStudent("Aisha", 27, [85, 92, 78]);
// console.log(describe(student));

// Structural typing allows us to use an object that has the same *shape* as the
// Student type, even if it wasn't created using the createStudent function.

// Also demo: type annotation vs type assertion
const student = {
  name: "Aisha",
  age: 27,
  grades: [85, 92, 78],
  extra:
    "This property is not defined in the Student type, but it's still allowed due to structural typing.",
};

// type StudentKeys = keyof Student; // "name" | "age" | "grades"

console.log(describe(student));
