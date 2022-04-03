﻿DELETE FROM ORDERDETAILS;
DELETE FROM STAFFACCOUNTS;
DELETE FROM BILLS;
DELETE FROM ORDERS;
DELETE FROM TABLES;
DELETE FROM PRODUCTS;
DELETE FROM STAFFS;
DELETE FROM CUSTOMERS;
DELETE FROM ROLES;
DELETE FROM CATEGORIES;
DELETE FROM ORDERSTATES;
DELETE FROM ORDERDETAILSTATES;
DELETE FROM TABLESTATES;

-- TABLE ROLES
INSERT INTO ROLES(NAME) VALUES
('Admin'),
('Staff');

-- TABLE CATEGORIES
INSERT INTO CATEGORIES(NAME) VALUES
('Đồ nướng'), 
('Đồ xào'),
('Đồ hấp'),
('Nước');

-- TABLE PRODUCTS
INSERT INTO PRODUCTS(NAME, IMAGE_URL, IDCATEGORY, PRICE) VALUES 
('King Cake', 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/367792.jpg', 1, 90000),
('7 Days 7 Pastas', 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/367564.jpg', 1, 140000),
('Fresh Basil & Parmesan Pesto', 'https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/c4bdaa0c3e0a441d9ab90be8700e9aab.jpeg', 1, 210000),
('Air Fried Soy Chicken With Potatoes', 'https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/09d29b155771410f8bceba6c94e00f6c.jpeg', 1, 200000),
('Roasted Moroccan Carrots With Baba Ganoush', 'https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/f99eecda92ad4aa18d14b5f2130169f4.jpeg', 1, 100000),
('Wave Goodbye To A Boring Lunch!', 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/363468.jpg', 1, 130000),
('Seafood Soup (Sopa Marinera)', 'https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/967676d8e7ee438db163b43ab0d82aa8.jpeg', 3, 160000),
('Salad With Zucchini And Baby Spinach', 'https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/4a37714f62f7414a8c744cead0d8e3f5.jpeg', 1, 70000),
('Couscous And Turkey Sandwiches', 'https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/283df07fd5954ada9fdf288432a71670.png', 2, 230000),
('Fancy Hash Brown', 'https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/421afefe85bf40f98fe2a050917cd708.jpeg', 2, 130000),
('New Orleans Seafood Filé Gumbo', 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/366796.jpg', 3, 180000),
('Ricotta Toast For Every Season', 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/367129.jpg', 3, 50000),
('Potatoes Fondant', 'https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/a8c8879cb1d74c91bd2fd59f83f2d7b4.jpeg', 3, 230000),
('Crispy Japanese Sweet Potatoes', 'https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/62b2c4e370ad4ca4984198b43001daf7.jpeg', 3, 140000),
('Bubble Potato Chips', 'https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/8e00b770f3c143cca849ff96a8ed0196.jpeg', 1, 170000),
('Sour Cream And Onion Potato Chip Frittata', 'https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/140c7642327249b4bbda2770c15ae8e3.jpeg', 4, 70000),
('Lazy Girl 5 Minute Noodles', 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/64995a7b6143483da4f66ece85f548ab/PBNOODS_FB.jpg', 3, 50000),
('One-Bowl Fudgy Brownies As Made By Alexis Deboschnek', 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/366130.jpg', 2, 160000),
('Saffron Rasmalai', 'https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/a051055034094cbca09cdf2082d7a032.jpeg', 3, 150000);

-- TABLE ORDERSTATES
INSERT INTO ORDERDETAILSTATES(NAME) VALUES
('Đang làm'),
('Đã dọn'),
('Đã hủy');

-- TABLE ORDERSTATES
INSERT INTO ORDERSTATES(NAME) VALUES
('Chưa thanh toán'),
('Đã thanh toán');

-- TABLE TABLESTATES
INSERT INTO TABLESTATES(NAME) VALUES
('Trống'),
('Đầy');

INSERT INTO TABLES(NAME, IDSTATE) VALUES
('Bàn 1', 1),
('Bàn 2', 2),
('Bàn 3', 1),
('Bàn 4', 2),
('Bàn 5', 1),
('Bàn 6', 1),
('Bàn 7', 1),
('Bàn 8', 2),
('Bàn 9', 1),
('Bàn 10', 1),
('Bàn 11', 1),
('Bàn 12', 1);

-- TABLE STAFFS
INSERT INTO STAFFS(ID, NAME, ADDRESS, PHONE, CODE, BIRTHDAY, SEX, IDROLE) VALUES
(
	1,
	'Nghĩa Trà',
	'05 Phan Lưu Thanh',
	'0914609259',
	'221526921',
	'14-08-2002',
	'Nữ',
	1
),
(
	2,
	'Minh Nguyễn',
	'210 Man Thiện',
	'0922562124',
	'221624925',
	'14-08-2002',
	'Nam',
	2
);

INSERT INTO STAFFACCOUNTS(USERNAME, PASSWORD, ID) VALUES
(
	'nghiatnh',
	'14082002',
	1
),
(
	'nghia1234',
	'123456',
	2
);

INSERT INTO CUSTOMERS(NAME, ADDRESS, PHONE, CODE, BIRTHDAY, SEX, POINT) VALUES
(
	'Nghĩa Trà',
	'05 Phan Lưu Thanh',
	'0914609259',
	'221526921',
	'14-08-2002',
	'Nữ',
	1
),
(
	'Minh Nguyễn',
	'210 Man Thiện',
	'0922562124',
	'221624925',
	'15-09-2019',
	'Nam',
	2
);

-- TABLE ORDERS
INSERT INTO ORDERS(IDTABLE, IDSTATE) VALUES
(6, 2),
(7, 2),
(8, 1),
(11, 2),
(12, 1);

-- TABLE OERDERDETAILS
INSERT INTO ORDERDETAILS(ORDERTIME, COUNT, IDORDER, IDPRODUCT, IDSTATE) VALUES
( '2022-08-03 18:40:25', 10, 1, 3, 1),
( '2022-08-03 18:40:25', 4, 5, 5, 1),
( '2022-08-03 18:40:25', 4, 2, 1, 1),
( '2022-08-03 18:40:25', 8, 4, 5, 2),
( '2022-08-03 18:40:25', 8, 2, 14, 2),
( '2022-08-03 18:40:25', 8, 3, 5, 2),
( '2022-08-03 18:40:25', 4, 1, 3, 1),
( '2022-08-03 18:40:25', 9, 4, 7, 1),
( '2022-08-03 18:40:25', 10, 2, 15, 1),
( '2022-08-03 18:40:25', 6, 1, 13, 1),
( '2022-08-03 18:40:25', 7, 3, 18, 2),
( '2022-08-03 18:40:25', 4, 5, 10, 1),
( '2022-08-03 18:40:25', 10, 1, 7, 1),
( '2022-08-03 18:40:25', 5, 2, 3, 2),
( '2022-08-03 18:40:25', 10, 4, 12, 1),
( '2022-08-03 18:40:25', 4, 3, 12, 2),
( '2022-08-03 18:40:25', 5, 2, 4, 1),
( '2022-08-03 18:40:25', 8, 3, 7, 2),
( '2022-08-03 18:40:25', 7, 2, 7, 1),
( '2022-08-03 18:40:25', 1, 2, 7, 2),
( '2022-08-03 18:40:25', 10, 5, 17, 2),
( '2022-08-03 18:40:25', 3, 2, 19, 2);

-- TABLE BILLS
INSERT INTO BILLS(ID, CUSTOMERNAME, IDSTAFF, IDCUSTOMER) VALUES
(1, '', 1, 1),
(2, 'Nghia tra', 1, 2);