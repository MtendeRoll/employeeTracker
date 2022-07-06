const inquirer = require("inquirer");
const cTable = require("console.table");
const query = require("./server.js");
const { createPromptModule } = require("inquirer");
const ExpandPrompt = require("inquirer/lib/prompts/expand");

// Function prompt the application
function promptQuestions() {
  inquirer
    .prompt({
      type: "list",
      name: "firstQuestion",
      message: "What would you like to do?",
      choices: ["View All Employees", "View All Roles", "View All Departments", "View Employees by Manager", "Add Employee", "Add Role", "Add Department", "Update an Employee's Role", "Update an Employee's Manager", "Delete an Employee", "Delete a Role", "Delete a Department", "View total utilized budget of a Department", "Quit"],
    })
    .then(function (answer) {
      switch (answer.todo) {
        case "View All Employees":
          query.tableEmployees();
          break;

        case "View Employees by Manager":
          let employeeChoices = getEmployeeChoices();
          inquirer
            .prompt({
              name: "manager_id",
              type: "list",
              message: "Choose the manager who's employee list you'd like to see.",
              choices: employeeChoices,
            })
            .then(function (answers) {
              tableEmployees(answers.manager_id);
            });
          break;

        case "View All Roles":
          query.tableRoles();
          break;

        case "View All departments":
          query.getDepartments();
          break;

        case "Add Employee":
          promptEmployee();
          break;

        case "Add Role":
          promptRole();
          break;

        case "Add Department":
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
          let deleteEmployeeChoices = getEmployeeChoices();
          inquirer
            .prompt({
              name: "id",
              type: "list",
              message: "Which employee would you like to delete?",
              choices: deleteEmployeeChoices,
            })
            .then(function (answers) {
              query.deleteEmployee(answers.id);
            });
          break;

        //If user selects "Delete a Role", prompt which role they'd like to delete then call deleteRole() function passing that role's id.
        case "Delete a Role":
          let deleteRoleChoices = getRoleChoices();
          inquirer
            .prompt({
              name: "id",
              type: "list",
              message: "Which Role would you like to delete?",
              choices: deleteRoleChoices,
            })
            .then(function (answers) {
              query.deleteRole(answers.id);
            });
          break;

        //If user selects "Delete a Department", prompt which department they'd like to delete then call deleteDepartment() function passing that department's id.
        case "Delete a Department":
          let deleteDepartmentChoices = getDepartmentChoices();
          inquirer
            .prompt({
              name: "id",
              type: "list",
              message: "Which Department would you like to delete?",
              choices: deleteDepartmentChoices,
            })
            .then(function (answers) {
              query.deleteDepartment(answers.id);
            });
          break;

        case "View total utilized budget of a Department":
          tableLogTotal();
          break;

        case "Quit":
          query.endConnection();
          break;
      }
    });
}

const promptDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
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
    .then(function (answers) {
      query.createDepartment(answers);
    });
};

const promptEmployee = () => {
  let employeeChoices = getEmployeeChoices();
  let roleChoices = getRoleChoices();

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
        name: "role_id",
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
    .then(function (answers) {
      query.createEmployee(answers);
    });
};

const promptRole = () => {
  let departmentChoices = getDepartmentChoices();

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
    .then(function (answers) {
      query.createRole(answers);
    });
};

const promptEmployeeUpdate = () => {
  let employeeChoices = getEmployeeChoices();
  let roleChoices = getRoleChoices();
  inquirer
    .prompt([
      {
        name: "employee_id",
        type: "list",
        message: "Which employee's role would you like to update?",
        choices: employeeChoices,
      },
      {
        name: "role_id",
        type: "list",
        message: "What is the employee's new role?",
        choices: roleChoices,
      },
    ])
    .then(function (answers) {
      query.updateEmployee({ id: answers.employee_id }, { role_id: answers.role_id });
    });
};

const promptEmployeeManagerUpdate = () => {
  let employeeChoices = getEmployeeChoices();

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
    .then(function (answers) {
      query.updateEmployee({ id: answers.employee_id }, { manager_id: answers.manager_id });
    });
};

//A helper function that calls query.getEmployees() and uses that data to create an array of employee choices to be used in inquirer lists.
const getEmployeeChoices = () => {
  let employees = query.getEmployees();
  let employeeChoices = [];
  for (let employee of employees) {
    employeeChoices.push({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    });
  }

  return employeeChoices;
};

//A helper function that calls query.getRoles() and uses that data to create an array of role choices to be used in inquirer lists.
const getRoleChoices = () => {
  let roles = query.getRoles();
  let roleChoices = [];
  for (let role of roles) {
    roleChoices.push({
      name: role.title,
      value: role.id,
    });
  }

  return roleChoices;
};

//A helper function that calls query.getDepartments() and uses that data to create an array of department choices to be used in inquirer lists.
const getDepartmentChoices = () => {
  let departments = query.getDepartments();
  let departmentChoices = [];
  for (let dept of departments) {
    departmentChoices.push({
      name: dept.name,
      value: dept.id,
    });
  }

  return departmentChoices;
};

//A function that prompts the user for which department they'd like budget information on, console.table() is then called with employee's in that department
//and a total of those employees' salaries is calculated and logged as well.
const tableLogTotal = () => {
  let departmentChoices = getDepartmentChoices();
  inquirer
    .prompt({
      name: "id",
      type: "list",
      message: "For which Department would you like to see the total utilized budget?",
      choices: departmentChoices,
    })
    .then(function (answers) {
      let employees = query.getEmployeesByDepartment(answers.id);

      let total = 0;
      for (let emp of employees) {
        total += parseFloat(emp.salary);
      }

      total = total.toFixed(2);
      console.table(employees);
      console.log(`Total Budget Usage: $${total}`);
      promptQuestions();
    });
};

promptQuestions();
