const mysql = require("mysql2");
const cTable = require("console.table");

// Connect to database
var db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "$D8G9h4Y&=$X3?_w",
    database: "staff_db",
  },
  console.log(`Connected to the staff_db database.`)
);

//start connection
db.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
});

// Function to get all employees from employee table in staff_db
async function getEmployees() {
  let promise = new Promise((resolve, reject) => {
    db.query("SELECT * FROM employee", function (err, data) {
      if (err) throw err;
      resolve(data);
    });
  });
  return await promise;
}

// Function to get all employees with department_id in staff_db
async function getEmployeesByDepartment(departmentID) {
  let promise = new Promise((resolve, reject) => {
    db.query(
      `SELECT first_name, last_name, roles.title AS roles, salary
      FROM employee
      LEFT JOIN roles
      ON employee.roles_id = roles.id
      WHERE roles.department_id = ${departmentID}`,
      function (err, data) {
        if (err) throw err;
        resolve(data);
      }
    );
  });

  return await promise;
}

// Function to get all roles from roles table in staff_db
async function getRoles() {
  let promise = new Promise((resolve, reject) => {
    db.query("SELECT * FROM roles", function (err, data) {
      if (err) throw err;
      resolve(data);
    });
  });
  return await promise;
}

// Function to get all departments from staff_db
async function getDepartments() {
  let promise = new Promise((resolve, reject) => {
    db.query("SELECT * FROM department", function (err, data) {
      if (err) throw err;
      resolve(data);
    });
  });
  return await promise;
}

// Function to insert new employee into employee table
async function createEmployee(employeeOBJ) {
  let promise = new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO employee SET ?",
      {
        first_name: employeeOBJ.first_name,
        last_name: employeeOBJ.last_name,
        role_id: employeeOBJ.role_id,
        manager_id: employeeOBJ.manager_id || -1,
      },
      function (err) {
        if (err) throw err;
        resolve();
      }
    );
  });

  return await promise;
}

// Function to table log each employee in employee table in a readable
async function tableLogEmployees(manager_id) {
  let managerWhere = "";
  if (manager_id) {
    managerWhere = `WHERE E1.manager_id = ${manager_id}`;
  }
  let promise = new Promise((resolve, reject) => {
    db.query(
      `SELECT E1.id AS id, E1.first_name AS first_name, E1.last_name AS last_name, roles.title, E2.first_name AS manager_first_name, E2.last_name AS manager_last_name
      FROM employee E1
      LEFT JOIN employee E2
      ON E1.manager_id = E2.id
      LEFT JOIN roles
      ON E1.roles_id = roles.id
      ${managerWhere}
      `,
      function (err, data) {
        if (err) throw err;
        resolve(data);
      }
    );
  });
  console.table(await promise);
}

//A function to table log each role in roles table in a readable way
async function tableLogRoles() {
  let promise = new Promise((resolve, reject) => {
    db.query(
      `SELECT title, salary, name AS department
      FROM roles
      LEFT JOIN department
      ON roles.department_id = department.id`,
      function (err, data) {
        if (err) throw err;
        resolve(data);
      }
    );
  });
  console.table(await promise);
}

// Function to insert new role into roles table
async function createRole(roleObj) {
  let promise = new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO roles SET ?",
      {
        title: roleObj.title,
        salary: roleObj.salary,
        department_id: roleObj.department_id,
      },
      function (err) {
        if (err) throw err;
        resolve();
      }
    );
  });

  return await promise;
}

// Function to insert new department into department table
async function createDepartment(deptObj) {
  let promise = new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO department SET ?",
      {
        name: deptObj.name,
      },
      function (err) {
        if (err) throw err;
        resolve();
      }
    );
  });

  return await promise;
}

// Function that updates an employee with matching employeeID. updateInfo details the column that should be updated.
async function updateEmployee(employeeID, updateInfo) {
  let promise = new Promise((resolve, reject) => {
    db.query("UPDATE employee SET ? WHERE ?", [updateInfo, employeeID], function (err) {
      if (err) throw err;
      resolve();
    });
  });

  return await promise;
}

// Function to delete an employee from employee table
async function deleteEmployee(empID) {
  let promise = new Promise((resolve, reject) => {
    db.query("DELETE FROM employee WHERE ?", [{ id: empID }], function (err) {
      if (err) throw err;
      resolve();
    });
  });

  return await promise;
}

// Function to delete a role from roles table
async function deleteRole(roleID) {
  let promise = new Promise((resolve, reject) => {
    db.query("DELETE FROM roles WHERE ?", [{ id: roleID }], function (err) {
      if (err) throw err;
      resolve();
    });
  });

  return await promise;
}

// Function to delete a deparment from deparment table
async function deleteDepartment(deptID) {
  let promise = new Promise((resolve, reject) => {
    db.query("DELETE FROM department WHERE ?", [{ id: deptID }], function (err) {
      if (err) throw err;
      resolve();
    });
  });

  return await promise;
}

//A function to end the db connection
function endConnection() {
  db.end();
}

//Exporting all the above functions for use in other modules
exports.getEmployees = getEmployees;
exports.getEmployeesByDepartment = getEmployeesByDepartment;
exports.getRoles = getRoles;
exports.getDepartments = getDepartments;
exports.tableLogEmployees = tableLogEmployees;
exports.tableLogRoles = tableLogRoles;
exports.createEmployee = createEmployee;
exports.createRole = createRole;
exports.createDepartment = createDepartment;
exports.updateEmployee = updateEmployee;
exports.deleteEmployee = deleteEmployee;
exports.deleteRole = deleteRole;
exports.deleteDepartment = deleteDepartment;
exports.endConnection = endConnection;
