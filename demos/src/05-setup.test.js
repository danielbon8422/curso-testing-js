describe("grupo 1", () => {
  beforeAll(() => {
    console.log("beforeAll")
  })
  beforeEach(() => {
    console.log("beforeEach")
  })
  afterEach(() => {
    console.log("afterEach")
  })
  test("case 1", () => {
    console.log ("case 1");
    expect(1 + 1).toBe(2);
  })

    test("case 2", () => {
    console.log ("case 2");
    expect(10 + 14).toBe(24);
  })

  describe("grupo 2", () => {
    afterAll(() => {
    console.log("afterAll")
  })
  test("case 3", () => {
    console.log ("case 3");
    expect(13 + 12).toBe(25);
  })
  test("case 4", () => {
    console.log ("case 4");
    expect(10 + 10).toBe(20);
  })
 })
})
