const Person = require("./06-person");

describe("test for person", () => {
  let person;
  beforeEach(() => {
    person = new Person("nicolas", 45, 1.7);
  });

  test("should return down", () => {
    person.weight = 45;
    const imc = person.calcIMC();
    expect(imc).toBe("down");
  });

  test("should return normal", () => {
    person.weight = 59;
    const imc = person.calcIMC();
    expect(imc).toBe("normal");
   });

   test("should return overweight", () => {
    person.weight = 73;
    const imc = person.calcIMC();
    expect(imc).toBe("overweight");
   });

   test("should return overweight level 1", () => {
    person.weight = 83;
    const imc = person.calcIMC();
    expect(imc).toBe("overweight level 1");
   });

   test("should return overweight level 2", () => {
    person.weight = 93;
    const imc = person.calcIMC();
    expect(imc).toBe("overweight level 2");
   });

   test("should return overweight level 3", () => {
    person.weight = 115;
    const imc = person.calcIMC();
    expect(imc).toBe("overweight level 3");
   });

   test("should return no found", () => {
    person.weight = 0;
    const imc = person.calcIMC();
    expect(imc).toBe("no found");
   });

});
