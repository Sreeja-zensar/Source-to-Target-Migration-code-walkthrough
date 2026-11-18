CREATE TABLE test_users (
    id            INT PRIMARY KEY,
    username      VARCHAR(50)  NOT NULL,
    password      VARCHAR(50)  NOT NULL,
    user_type     VARCHAR(20)  NOT NULL,
    expected_error VARCHAR(200)
);

CREATE TABLE products (
    id     INT PRIMARY KEY,
    name   VARCHAR(100) NOT NULL,
    price  DECIMAL(10,2) NOT NULL
);

CREATE TABLE orders (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    username    VARCHAR(50)  NOT NULL,
    first_name  VARCHAR(50),
    last_name   VARCHAR(50),
    postal_code VARCHAR(20),
    item_count  INT,
    status      VARCHAR(20),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
