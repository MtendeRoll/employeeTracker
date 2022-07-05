--department seeds
INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department(name)
VALUES("Legal");

--role seeds
INSERT INTO roles (title, salary, department_id)
VALUES("Salesperson", 80000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES("Lead Engineer", 150000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES("Software Engineer", 120000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES("Account Manager", 160000, 3);

INSERT INTO roles (title, salary, department_id)
VALUES("Accountant", 125000, 3);

INSERT INTO roles (title, salary, department_id)
VALUES("Legal Team Lead", 250000, 4);

INSERT INTO roles (title, salary, department_id)
VALUES("Lawyer", 190000, 4);

--employee seeds
INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES("Mike", "Chan", 1, 1);

INSERT INTO employee (first_name, last_name, roles_id)
VALUES("Ashley", "Rodriguez", 2);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES("Kevin", "Tupik", 2, 2);

INSERT INTO employee (first_name, last_name, roles_id)
VALUES("Kunal", "Sing", 3);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES("Malia", "Brown", 3, 3);

INSERT INTO employee (first_name, last_name, roles_id)
VALUES("Sarah", "Lourd", 4);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES("Tom", "Allen", 4, 4);