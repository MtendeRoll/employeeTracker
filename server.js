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
const getEmployees = () => {
  db.query("SELECT * FROM employee", function (err, data) {
    if (err) {
      return;
    }
  });
};

// Function to get all employees with department_id in staff_db
const getEmployeesByDepartment = (departmentID) => {
  db.query(
    `SELECT first_name, last_name, roles.title AS roles, salary
      FROM employee
      LEFT JOIN roles
      ON employee.roles_id = roles.id
      WHERE roles.department_id = ${departmentID}`,
    function (err, rows) {
      if (err) {
        return;
      }
      console.table(rows);
    }
  );
};

// Function to get all roles from roles table in staff_db
const getRoles = () => {
  db.query("SELECT * FROM roles", function (err, data) {
    if (err) {
      return;
    }
  });
};

// Function to get all departments from staff_db
const getDepartments = () => {
  db.query("SELECT * FROM department", (err, rows) => {
    if (err) {
      return;
    }
    console.table(rows);
  });
  promptQuestions();
};

// Function to insert new employee into employee table
const createEmployee = (employeeOBJ) => {
  db.query(
    "INSERT INTO employee SET ?",
    {
      first_name: employeeOBJ.first_name,
      last_name: employeeOBJ.last_name,
      role_id: employeeOBJ.role_id,
      manager_id: employeeOBJ.manager_id || -1,
    },
    function (err) {
      if (err) {
        return;
      }
      console.log(`Added ${first_name} ${last_name} `);
    }
  );
  promptQuestions();
};

// Function to table log each employee in employee table in a readable way
const tableEmployees = (manager_id) => {
  let managerWhere = "";
  if (manager_id) {
    managerWhere = `WHERE E1.manager_id = ${manager_id}`;
  }

  db.query(
    `SELECT E1.id AS id, E1.first_name AS first_name, E1.last_name AS last_name, roles.title, E2.first_name AS manager_first_name, E2.last_name AS manager_last_name
      FROM employee E1
      LEFT JOIN employee E2
      ON E1.manager_id = E2.id
      LEFT JOIN roles
      ON E1.roles_id = roles.id
      ${managerWhere}
      `,
    function (err, rows) {
      if (err) {
        return;
      }
      console.table(rows);
    }
  );
  promptQuestions();
};

//A function to table log each role in roles table in a readable way
const tableRoles = () => {
  db.query(
    `SELECT title, salary, name AS department
      FROM roles
      LEFT JOIN department
      ON roles.department_id = department.id`,
    (err, rows) => {
      if (err) {
        return;
      }
      console.table(rows);
    }
  );
  promptQuestions();
};

// Function to insert new role into roles table
const createRole = (roleObj) => {
  db.query(
    "INSERT INTO roles SET ?",
    {
      title: roleObj.title,
      salary: roleObj.salary,
      department_id: roleObj.department_id,
    },
    function (err) {
      if (err) {
        return;
      }
    }
  );
  promptQuestions();
};

// Function to insert new department into department table
const createDepartment = (deptObj) => {
  db.query(
    "INSERT INTO department SET ?",
    {
      name: deptObj.name,
    },
    function (err) {
      if (err) {
        return;
      }
    }
  );
  promptQuestions();
};

// Function that updates an employee with matching employeeID. updateInfo details the column that should be updated.
const updateEmployee = (employeeID, updateInfo) => {
  db.query("UPDATE employee SET ? WHERE ?", [updateInfo, employeeID], function (err) {
    if (err) {
      return;
    }
  });
  promptQuestions();
};

// Function to delete an employee from employee table
const deleteEmployee = (empID) => {
  db.query("DELETE FROM employee WHERE ?", [{ id: empID }], function (err) {
    if (err) {
      return;
    }
  });
  promptQuestions();
};

// Function to delete a role from roles table
const deleteRole = (roleID) => {
  db.query("DELETE FROM roles WHERE ?", [{ id: roleID }], function (err) {
    if (err) {
      return;
    }
  });
  promptQuestions();
};

// Function to delete a deparment from deparment table
const deleteDepartment = (deptID) => {
  db.query("DELETE FROM department WHERE ?", [{ id: deptID }], function (err) {
    if (err) {
      return;
    }
  });
  promptQuestions();
};

//A function to end the db connection
function endConnection() {
  db.end();
}

//Exporting all the above functions for use in other modules
// exports.getEmployees = getEmployees;
// exports.getEmployeesByDepartment = getEmployeesByDepartment;
// exports.getRoles = getRoles;
// exports.getDepartments = getDepartments;
// exports.tableEmployees = tableEmployees;
// exports.tableRoles = tableRoles;
// exports.createEmployee = createEmployee;
// exports.createRole = createRole;
// exports.createDepartment = createDepartment;
// exports.updateEmployee = updateEmployee;
// exports.deleteEmployee = deleteEmployee;
// exports.deleteRole = deleteRole;
// exports.deleteDepartment = deleteDepartment;
// exports.endConnection = endConnection;

module.exports = { getDepartments, getEmployees, getEmployeesByDepartment, getRoles, tableEmployees, tableRoles, createEmployee, createRole, createDepartment, updateEmployee, deleteEmployee, deleteRole, deleteDepartment, endConnection };
