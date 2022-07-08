const inquirer = require("inquirer");
const cTable = require("console.table");
const query = require("./lib/server.js");
const asciiartLogo = require("asciiart-logo");

// Function to introduce the application
introMsg = function () {
  const introText = "This is a command-line application that manages a company's employee database, using Node.js, Inquirer, and MySQL";
  console.log(
    asciiartLogo({
      name: "Employee Tracker",
      font: "3D-ASCII",
      lineChars: 10,
      padding: 1,
      margin: 2,
      borderColor: "bold-cyan",
      logoColor: "bold-cyan",
      textColor: "bold-white",
    })
      .center(introText)
      .render()
  );
  promptQuestions();
};

// Function to start the application
function promptQuestions() {
  inquirer
    .prompt({
      type: "list",
      name: "firstQuestion",
      message: "What would you like to do?",
      choices: ["View All Employees", "View All Roles", "View All Departments", "View Employees by Manager", "Add an Employee", "Add a Role", "Add a Department", "Update an Employee's Role", "Update an Employee's Manager", "Delete an Employee", "Delete a Role", "Delete a Department", "View total utilized budget of a Department", "Quit"],
    })
    .then(async function (answer) {
      switch (answer.firstQuestion) {
        case "View All Employees":
          await query.tableLogEmployees();
          promptQuestions();
          break;

        case "View Employees by Manager":
          let employeeChoices = await getEmployeeChoices();
          inquirer
            .prompt({
              name: "manager_id",
              type: "list",
              message: "Choose the manager who's employee list you'd like to see.",
              choices: employeeChoices,
            })
            .then(async function (answers) {
              await query.tableLogEmployees(answers.manager_id);
              promptQuestions();
            });
          break;

        case "View All Roles":
          await query.tableLogRoles();
          promptQuestions();
          break;

        case "View All Departments":
          console.table(await query.getDepartments());
          promptQuestions();
          break;

        case "Add an Employee":
          promptEmployee();
          break;

        case "Add a Role":
          promptRole();
          break;

        case "Add a Department":
          promptDepartment();
          break;

        case "Update an Employee's Role":
          promptEmployeeUpdate();
          break;

        case "Update an Employee's Manager":
          promptEmployeeManagerUpdate();
          break;

        //If user selects "Delete an Employee", prompt which employee they'd like to delete then call deleteEmployee() function passing that employee's id.
        case "Delete an Employee":
          let deleteEmployeeChoices = await getEmployeeChoices();
          inquirer
            .prompt({
              name: "id",
              type: "list",
              message: "Which employee would you like to delete?",
              choices: deleteEmployeeChoices,
            })
            .then(async function (answers) {
              await query.deleteEmployee(answers.id);
              promptQuestions();
            });
          break;

        //If user selects "Delete a Role", prompt which role they'd like to delete then call deleteRole() function passing that role's id.
        case "Delete a Role":
          let deleteRoleChoices = await getRoleChoices();
          inquirer
            .prompt({
              name: "id",
              type: "list",
              message: "Which Role would you like to delete?",
              choices: deleteRoleChoices,
            })
            .then(async function (answers) {
              await query.deleteRole(answers.id);
              promptQuestions();
            });
          break;

        //If user selects "Delete a Department", prompt which department they'd like to delete then call deleteDepartment() function passing that department's id.
        case "Delete a Department":
          let deleteDepartmentChoices = await getDepartmentChoices();
          inquirer
            .prompt({
              name: "id",
              type: "list",
              message: "Which Department would you like to delete?",
              choices: deleteDepartmentChoices,
            })
            .then(async function (answers) {
              await query.deleteDepartment(answers.id);
              console.log("----------- DEPARTMENT DELETED FROM DATABASE------------");
              promptQuestions();
            });
          break;

        case "View total utilized budget of a Department":
          await tableLogTotal();
          break;

        case "Quit":
          query.endConnection();
          break;
      }
    });
}

async function promptDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department_name",
        message: "What is the name of the department?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the department's name!");
            return false;
          }
        },
      },
    ])
    .then(async function (answers) {
      await query.createDepartment(answers);
      console.log("---------ADDED", answers, " TO THE DATATBASE !----------");
      promptQuestions();
    });
}

async function promptEmployee() {
  let employeeChoices = await getEmployeeChoices();
  let roleChoices = await getRoleChoices();

  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the employee's first name?",
        validate: function (value) {
          if (!/[^a-z-\s]/.test(value.toLowerCase())) {
            return true;
          }
          return false;
        },
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the employee's last name?",
        validate: function (value) {
          if (!/[^a-z-\s]/.test(value.toLowerCase())) {
            return true;
          }
          return false;
        },
      },
      {
        name: "roles_id",
        type: "list",
        message: "What is the employee's role?",
        choices: roleChoices,
      },
      {
        name: "hasManager",
        type: "confirm",
        message: "Does the employee have a manger?",
        validate: function (value) {
          if (value.toLowerCase() === "y" || value.toLowerCase === "n") {
            return true;
          }
          return false;
        },
      },
      {
        name: "manager_id",
        type: "list",
        message: "Who is the employee's manager?",
        choices: employeeChoices,
        when: (answ) => {
          return answ.hasManager;
        },
      },
    ])
    .then(async function (answers) {
      await query.createEmployee(answers);
      console.log("---------ADDED EMPLOYEE TO THE DATATBASE !----------");

      promptQuestions();
    });
}

async function promptRole() {
  let departmentChoices = await getDepartmentChoices();

  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the new role?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the role's annual salary?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
      {
        name: "department_id",
        type: "list",
        message: "To which department does this role belong?",
        choices: departmentChoices,
      },
    ])
    .then(async function (answers) {
      await query.createRole(answers);
      console.log("---------ADDED ROLE TO THE DATATBASE !----------");
      promptQuestions();
    });
}

async function promptEmployeeUpdate() {
  let employeeChoices = await getEmployeeChoices();
  let roleChoices = await getRoleChoices();
  inquirer
    .prompt([
      {
        name: "employee_id",
        type: "list",
        message: "Which employee's role would you like to update?",
        choices: employeeChoices,
      },
      {
        name: "roles_id",
        type: "list",
        message: "What is the employee's new role?",
        choices: roleChoices,
      },
    ])
    .then(async function (answers) {
      await query.updateEmployee({ id: answers.employee_id }, { roles_id: answers.roles_id });
      console.log("---------UPDATED EMPLOYEE'S ROLE----------");
      promptQuestions();
    });
}

async function promptEmployeeManagerUpdate() {
  let employeeChoices = await getEmployeeChoices();

  inquirer
    .prompt([
      {
        name: "employee_id",
        type: "list",
        message: "Which employee would you like to update?",
        choices: employeeChoices,
      },
      {
        name: "manager_id",
        type: "list",
        message: "Who is the employee's new manager?",
        choices: employeeChoices,
      },
    ])
    .then(async function (answers) {
      await query.updateEmployee({ id: answers.employee_id }, { manager_id: answers.manager_id });
      console.log("---------UPDATED EMPLOYEE'S MANAGER !----------");
      promptQuestions();
    });
}

//A helper function that calls query.getEmployees() and uses that data to create an array of employee choices to be used in inquirer lists.
async function getEmployeeChoices() {
  let employees = await query.getEmployees();
  let employeeChoices = [];
  for (let employee of employees) {
    employeeChoices.push({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    });
  }

  return employeeChoices;
}

//A helper function that calls query.getRoles() and uses that data to create an array of role choices to be used in inquirer lists.
async function getRoleChoices() {
  let rolesNew = await query.getRoles();
  let roleChoices = [];
  for (let roles of rolesNew) {
    roleChoices.push({
      name: roles.title,
      value: roles.id,
    });
  }

  return roleChoices;
}

//A helper function that calls query.getDepartments() and uses that data to create an array of department choices to be used in inquirer lists.
async function getDepartmentChoices() {
  let departments = await query.getDepartments();
  let departmentChoices = [];
  for (let dept of departments) {
    departmentChoices.push({
      name: dept.department_name,
      value: dept.id,
    });
  }

  return departmentChoices;
}

//A function that prompts the user for which department they'd like budget information on, console.table() is then called with employee's in that department
//and a total of those employees' salaries is calculated and logged as well.
async function tableLogTotal() {
  let departmentChoices = await getDepartmentChoices();
  inquirer
    .prompt({
      name: "id",
      type: "list",
      message: "For which Department would you like to see the total utilized budget?",
      choices: departmentChoices,
    })
    .then(async function (answers) {
      let employees = await query.getEmployeesByDepartment(answers.id);

      let total = 0;
      for (let emp of employees) {
        total += parseFloat(emp.salary);
      }

      total = total.toFixed(2);
      console.table(employees);
      console.log(`----------- THIS IS THE TOTAL BUDGET: $${total} ----------`);
      promptQuestions();
    });
}

introMsg();
