const BooksService = require("./books.service");

describe("test for BooksService", () => {
  let service;
  beforeEach(() => {
    service = new BooksService();
  });

  describe("test for getBooks", () => {
    test("should return a list book", async() => {
      // Arrenge
      // Act
      const books = await service.getBooks({});
      console.log(books);
      // Assert
      expect(books.length).toEqual(4);

    });
  });
});
