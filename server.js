const mysql = require("mysql2");

// Connect to database
var db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    port: 4003,
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
      `SELECT first_name, last_name, role.title AS role, salary
      FROM employee
      LEFT JOIN role
      ON employee.role_id = role.id
      WHERE role.department_id = ${departmentID}`,
      function (err, data) {
        if (err) throw err;
        resolve(data);
      }
    );
  });

  return await promise;
}

// Function to get all roles from role table in staff_db
async function getRoles() {
  let promise = new Promise((resolve, reject) => {
    db.query("SELECT * FROM role", function (err, data) {
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
      `SELECT E1.id AS id, E1.first_name AS first_name, E1.last_name AS last_name, role.title, E2.first_name AS manager_first_name, E2.last_name AS manager_last_name
      FROM employee E1
      LEFT JOIN employee E2
      ON E1.manager_id = E2.id
      LEFT JOIN role
      ON E1.role_id = role.id
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

//A function to table log each role in role table in a readable way
async function tableLogRoles() {
  let promise = new Promise((resolve, reject) => {
    db.query(
      `SELECT title, salary, name AS department
      FROM role
      LEFT JOIN department
      ON role.department_id = department.id`,
      function (err, data) {
        if (err) throw err;
        resolve(data);
      }
    );
  });
  console.table(await promise);
}

// Function to insert new role into role table
async function createRole(roleObj) {
  let promise = new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO role SET ?",
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

// Function to delete a role from role table
async function deleteRole(roleID) {
  let promise = new Promise((resolve, reject) => {
    db.query("DELETE FROM role WHERE ?", [{ id: roleID }], function (err) {
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
