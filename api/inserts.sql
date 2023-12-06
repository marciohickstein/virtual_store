-- Limpa a base de testes
DELETE FROM "productCategories";
DELETE FROM Products;
DELETE FROM Manufacturers;
DELETE FROM Categories;

SELECT setval('categories_id_seq', 1);
SELECT setval('manufacturers_id_seq', 1);
SELECT setval('products_id_seq', 1);

-- Insert data into Category table
INSERT INTO Categories (name)
VALUES
  ('Electronics'),
  ('Clothing'),
  ('Books');

-- Insert data into Manufacturer table
INSERT INTO Manufacturers (name, info)
VALUES
  ('Sony', 'Electronics manufacturer'),
  ('Nike', 'Sportswear manufacturer'),
  ('Penguin Books', 'Book publisher');

-- Insert data into Product table
INSERT INTO Products (title, description, price, "manufacturerId")
VALUES
  ('Smartphone', 'High-end smartphone', 1, 2),
  ('Running Shoes', 'Men''s running shoes', 1, 3),
  ('Science Fiction Novel', 'Classic sci-fi book', 1, 4);

INSERT INTO "productCategories" ("productId", "categoryId")
VALUES
  (2, 2), 
  (3, 3), 
  (4, 4); 