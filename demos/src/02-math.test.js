const { sum, multiply, divide, restar } = require('./02-math');

describe("test for math", () => {
  describe("test for sum", () => {
   test("adds 1 + 3 should be 4", () => {
   const rta = sum(1,3);
   expect(rta).toBe(4);
  });
});

describe("test for restar", () => {
test("adds 3 - 1 should be 2", () => {
const rta = restar(3,1);
expect(rta).toBe(2);
});
});

describe("test for multiply", () => {
test("should be 4", () => {
const rta = multiply(1,4);
expect(rta).toBe(4);
});
});

describe("should divide normal", () => {
test("should divide normal", () => {
const rta = divide(10,2);
expect(rta).toBe(5);
});
});

test("should divide for zero", () => {
const rta = divide(4,0);
expect(rta).toBeNull();
const rta2 = divide(5,0);
expect(rta2).toBeNull();
const rta3 = divide(100,0);
expect(rta3).toBeNull();
});
});
