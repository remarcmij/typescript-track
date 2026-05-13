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
