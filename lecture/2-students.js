// @ts-check

/**
 * @typedef {Object} Student
 * @property {string} name
 * @property {number} age
 * @property {number[]} grades
 */

/**
 * @param {string} name
 * @param {number} age
 * @param {number[]} grades
 * @returns {Student}
 */
function createStudent(name, age, grades) {
  return { name, age, grades };
}

/**
 * @param {Student} student
 * @returns {number}
 */
function getAverage(student) {
  const total = student.grades.reduce((sum, g) => sum + g, 0);
  return total / student.grades.length;
}

/**
 * @param {Student} student
 * @returns {string}
 */
function describe(student) {
  return `${student.name} (age ${student.age}) — average: ${getAverage(student)}`;
}

const student = createStudent("Aisha", 27, [85, 92, 78]);
console.log(describe(student));
