-- SQLite

DROP TABLE IF EXISTS ORDERDETAILS;
DROP TABLE IF EXISTS STAFFACCOUNTS;
DROP TABLE IF EXISTS BILLS;
DROP TABLE IF EXISTS ORDERS;
DROP TABLE IF EXISTS TABLES;
DROP TABLE IF EXISTS DISCOUNTCODES;
DROP TABLE IF EXISTS PRODUCTS;
DROP TABLE IF EXISTS STAFFS;
DROP TABLE IF EXISTS CUSTOMERS;
DROP TABLE IF EXISTS ROLES;
DROP TABLE IF EXISTS CATEGORIES;
DROP TABLE IF EXISTS ORDERSTATES;
DROP TABLE IF EXISTS ORDERDETAILSTATES;
DROP TABLE IF EXISTS TABLESTATES;

CREATE TABLE ROLES
(
	ID INTEGER PRIMARY KEY ,
	NAME TEXT
);

CREATE TABLE CATEGORIES
(
	ID INTEGER PRIMARY KEY ,
	NAME TEXT
);

CREATE TABLE ORDERSTATES
(
	ID INTEGER PRIMARY KEY ,
	NAME TEXT
);

CREATE TABLE ORDERDETAILSTATES
(
	ID INTEGER PRIMARY KEY ,
	NAME TEXT
);

CREATE TABLE TABLESTATES
(
	ID INTEGER PRIMARY KEY ,
	NAME TEXT
);

CREATE TABLE PRODUCTS
(
	ID INTEGER PRIMARY KEY ,
	NAME TEXT,
	IMAGE_URL TEXT,
	IDCATEGORY INTEGER NOT NULL,
	PRICE REAL DEFAULT 0,

	FOREIGN KEY (IDCATEGORY) REFERENCES CATEGORIES(ID)
);

CREATE TABLE STAFFS
(
	ID INTEGER PRIMARY KEY ,
	NAME TEXT,
	ADDRESS TEXT,
	PHONE TEXT,
	CODE TEXT,
	BIRTHDAY TEXT,
	SEX TEXT,
	IDROLE INTEGER NOT NULL,

	FOREIGN KEY (IDROLE) REFERENCES ROLES(ID)
);

CREATE TABLE STAFFACCOUNTS
(
	ID INTEGER PRIMARY KEY,
	USERNAME TEXT,
	PASSWORD TEXT,

	FOREIGN KEY (ID) REFERENCES STAFFS(ID)
);

CREATE TABLE CUSTOMERS
(
	ID INTEGER PRIMARY KEY ,
	NAME TEXT,
	ADDRESS TEXT,
	PHONE TEXT,
	CODE TEXT,
	BIRTHDAY TEXT,
	POINT REAL DEFAULT 0,
	SEX TEXT
);

CREATE TABLE DISCOUNTCODES
(
	ID INTEGER PRIMARY KEY,
	NAME TEXT,
	COUNT REAL,
	MINPRICE REAL DEFAULT 0,
	LIMITPRICE REAL,
	DUETIME TEXT NOT NULL,
	IDCUSTOMER INTEGER,
	USED INTEGER DEFAULT 0,

	FOREIGN KEY(IDCUSTOMER) REFERENCES CUSTOMERS(ID)
);

CREATE TABLE TABLES
(
	ID INTEGER PRIMARY KEY ,
	NAME TEXT,
	IDSTATE INTEGER,

	FOREIGN KEY (IDSTATE) REFERENCES TABLESTATES(ID)
);

CREATE TABLE ORDERS
(
	ID INTEGER PRIMARY KEY ,
	IDTABLE INTEGER,
	IDSTATE INTEGER,

	FOREIGN KEY (IDTABLE) REFERENCES TABLES(ID),
	FOREIGN KEY (IDSTATE) REFERENCES ORDERSTATES(ID)
);

CREATE TABLE ORDERDETAILS
(
	ID INTEGER PRIMARY KEY ,
	COUNT INTEGER,
	ORDERTIME TEXT,
	IDORDER INTEGER,
	IDPRODUCT INTEGER,
	IDSTATE INTEGER,

	FOREIGN KEY (IDORDER) REFERENCES ORDERS(ID),
	FOREIGN KEY (IDPRODUCT) REFERENCES PRODUCTS(ID),
	FOREIGN KEY (IDSTATE) REFERENCES ORDERDETAILSTATES(ID)
);

CREATE TABLE BILLS
(
	ID INTEGER PRIMARY KEY,
	PAYTIME TEXT,
	IDSTAFF INTEGER,
	IDCUSTOMER INTEGER,
	IDDISCOUNT INTEGER,

	FOREIGN KEY (IDSTAFF) REFERENCES STAFFS(ID),
	FOREIGN KEY (IDCUSTOMER) REFERENCES CUSTOMERS(ID),
	FOREIGN KEY (ID) REFERENCES ORDERS(ID),
	FOREIGN KEY (IDDISCOUNT) REFERENCES DISCOUNTCODES(ID)
);

DROP TRIGGER IF EXISTS insertTable;
CREATE TRIGGER insertTable
AFTER INSERT
ON TABLES
BEGIN
	UPDATE TABLES SET IDSTATE = 1 WHERE ID = NEW.ID;
END;

DROP TRIGGER IF EXISTS insertOrder;
CREATE TRIGGER insertOrder
AFTER INSERT
ON ORDERS
BEGIN
	UPDATE ORDERS SET IDSTATE = 1 WHERE ID = NEW.ID;
	UPDATE TABLES SET IDSTATE = 2 WHERE ID = NEW.IDTABLE;
END;

DROP TRIGGER IF EXISTS beforeInsertOrder;
CREATE TRIGGER beforeInsertOrder 
BEFORE INSERT
ON ORDERS
BEGIN
	SELECT CASE
		WHEN (SELECT IDSTATE FROM TABLES WHERE ID = NEW.IDTABLE) = 2 THEN
			RAISE(ABORT, 'Table does not empty!')
	END;
END;

DROP TRIGGER IF EXISTS insertBill;
CREATE TRIGGER insertBill
AFTER INSERT
ON BILLS
BEGIN
	UPDATE ORDERS SET IDSTATE = 2 WHERE ID = NEW.ID;
	UPDATE TABLES SET IDSTATE = 1 WHERE ID = (SELECT IDTABLE FROM ORDERS WHERE ID = NEW.ID);
	UPDATE DISCOUNTCODES SET USED = 1 WHERE ID = NEW.IDDISCOUNT AND (SELECT IDCUSTOMER FROM DISCOUNTCODES WHERE ID = NEW.IDDISCOUNT);
	UPDATE ORDERDETAILS SET IDSTATE = 3 WHERE IDSTATE = 1 AND IDORDER = NEW.ID;
END;

DROP TRIGGER IF EXISTS beforeInsertBill;
CREATE TRIGGER beforeInsertBill
BEFORE INSERT
ON BILLS
BEGIN
	SELECT CASE
		WHEN (SELECT IDSTATE FROM ORDERS WHERE ID = NEW.ID) = 2 THEN
			RAISE(ABORT, 'The order was paid!')
	END;
END;