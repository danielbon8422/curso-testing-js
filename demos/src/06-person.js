class Person {
  constructor(name, weight, height) {
    this.name = name;
    this.weight = weight;
    this.height = height;
  }

  calcIMC() {
    const result = Math.round(this.weight / (this.height * this.height));
    if (result < 1) {
      return 'no found';
    } else if (result >= 0 && result < 18) {
      return 'down';
    } else if (result >= 18 && result <= 24) {
      return 'normal';
    } else if (result >= 25 && result <= 26) {
      return 'overweight';
    } else if (result >= 27 && result <= 29) {
      return 'overweight level 1';
    } else if (result >= 30 && result <= 39) {
      return 'overweight level 2';
    } else if (result >= 40) {
      return 'overweight level 3';
    }

  }
}
module.exports = Person;
