interface Room {
  numDoors: number;
  ceilingHeight: number;
}

// Only known properties allowed in object literals
const r: Room = {
  numDoors: 1,
  ceilingHeight: 10,
  elephant: "present", // This will cause a TypeScript error.
};

const obj = {
  numDoors: 1,
  ceilingHeight: 10,
  elephant: "present",
};

// This is allowed due to structural typing, even though obj has an extra
// property 'elephant'.
const r2: Room = obj;
