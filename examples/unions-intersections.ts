type Light = 'red' | 'yellow' | 'green';

function trafficMessage(light: Light): string {
  switch (light) {
    case 'red':
      return 'Stop';
    case 'yellow':
      return 'Caution';
    case 'green':
      return 'Go';
  }
}

console.log(trafficMessage('red'));
console.log(trafficMessage('green'));

type HasName = { name: string };
type HasAge = { age: number };
type Person = HasName & HasAge;

const person: Person = { name: 'Aisha', age: 27 };
console.log(`${person.name} is ${person.age} years old`);
