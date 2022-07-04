DROP DATABASE IF EXISTS staff_db;
CREATE DATABASE staff_db;

USE staff_db;

CREATE TABLE department (
id INT PRIMARY KEY,
name VARCHAR(30)

FOREIGN KEY (id)
REFERENCES role(department_id)
ON DELETE SET NULL
);

CREATE TABLE role (
id INT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
department_id INT

FOREIGN KEY (id)
REFERENCES employee(role_id)
ON DELETE SET NULL
);

CREATE TABLE employee (
id INT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT

FOREIGN KEY (id)
REFERENCES employee(manager_id)
ON DELETE SET NULL
);
