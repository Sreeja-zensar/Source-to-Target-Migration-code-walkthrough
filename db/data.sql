INSERT INTO test_users VALUES (1, 'standard_user',   'secret_sauce', 'VALID',   NULL);
INSERT INTO test_users VALUES (2, 'locked_out_user', 'secret_sauce', 'LOCKED',  'Epic sadface: Sorry, this user has been locked out.');
INSERT INTO test_users VALUES (3, 'invalid_user',    'wrong_pass',   'INVALID', 'Epic sadface: Username and password do not match any user in this service');

INSERT INTO products VALUES (1, 'Sauce Labs Backpack',      29.99);
INSERT INTO products VALUES (2, 'Sauce Labs Bike Light',     9.99);
INSERT INTO products VALUES (3, 'Sauce Labs Bolt T-Shirt',  15.99);
INSERT INTO products VALUES (4, 'Sauce Labs Fleece Jacket', 49.99);
INSERT INTO products VALUES (5, 'Sauce Labs Onesie',         7.99);
INSERT INTO products VALUES (6, 'Test.allTheThings() T-Shirt (Red)', 15.99);
