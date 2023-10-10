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
INSERT INTO Products (title, description, "manufacturerId")
VALUES
  ('Smartphone', 'High-end smartphone', 1),
  ('Running Shoes', 'Men''s running shoes', 2),
  ('Science Fiction Novel', 'Classic sci-fi book', 3);

INSERT INTO "productCategories" ("productId", "categoryId")
VALUES
  (1, 1), 
  (2, 2), 
  (3, 3); 