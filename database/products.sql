-- @block
CREATE TABLE product (
    productID INT(4) PRIMARY KEY UNIQUE,
    title VARCHAR(50),
    quantity INT(4),
    price DECIMAL(8,3),
    category VARCHAR(70),
    imgage VARCHAR(255),
    description VARCHAR(255)
);