const express = require("express");
const inquirer = require("inquirer");
const fs = require("fs");
const Department = require("./lib/Department");
const Role = require("./lib/Role");
const Employee = require("./lib/Employee");

// Department Questions
const departmentQuestions = [
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
];

// Role Questions
const roleQuestions = [
  {
    type: "input",
    name: "roleName",
    message: "What is the name of the role?",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Please enter the role's name!");
        return false;
      }
    },
  },
  {
    type: "number",
    name: "salary",
    message: "What is the salary of the role?",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Please enter the role's salary and only use numbers");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "roleDepartment",
    message: "What department does the role belong to?",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Please enter the department that the role belongs to");
        return false;
      }
    },
  },
];

// Employee Quesions
const employeeQuestions = [
  {
    type: "input",
    name: "employeeFirstName",
    message: "What is the employee's first name?",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Please enter the employee's first name!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "employeeLastName",
    message: "What is the employee's last name?",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Please enter the employee's last name!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "employeeRole",
    message: "What is the employee's role?",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Please enter the employee's role!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "employeeManager",
    message: "Who is the employee's manager?",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Please enter the employee's manager!");
        return false;
      }
    },
  },
];

// ------------> update employee questions
// const employeeUpdateQuestions = [
//   {
//     type: "list",
//     name: "updateEmployee",
//     message: "Which employee would you like to update?",
//     choices: ["names of employees", "example"],
//   },
// add functionality to update list

// .then(({ member }) => {
//   if (member === "Engineer") {
//     this.promptEngineer();
//   } else if (member === "Intern") {
//     this.promptIntern();
//   } else {
//     createFile(renderHTML(this.team));
//     console.log("team file has been created");
//   }
// })
// .catch((err) => {
//   console.log(err);
// });
//];

const updateEmployeeQuestions = [
  {
    type: "input",
    name: "roleName",
    message: "What is the name of the role?",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Please enter the role's name!");
        return false;
      }
    },
  },
];

function companyInfo() {
  this.company = [];
  this.department;
  this.role;
  this.employee;
  //this.updateEmployee;
}

companyInfo.prototype.promptQuestions = function () {
  inquirer
    .prompt({
      type: "list",
      name: "firstQuestion",
      message: "What would you like to do?",
      choices: ["Add Department", "Add Role", "Add Employee", "Update Employee Role", "Submit"],
    })
    .then(({ firstQuestion }) => {
      if (firstQuestion === "Add Department") {
        this.promptDepartment();
      } else if (firstQuestion === "Add Role") {
        this.promptRole();
      } else if (firstQuestion === "Add Employee") {
        this.promptEmployee();
        // } else if (firstQuestion === "Update Employee Role") {
        //   this.promptUpdate();
      } else {
        //createFile(renderHTML(this.companyInfo));
        console.log("company file has been created");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

companyInfo.prototype.promptDepartment = function () {
  inquirer.prompt(departmentQuestions).then(({ departmentName }) => {
    this.department = new Department(departmentName);
    this.company.push(this.department);
    this.promptQuestions();
  });
};

companyInfo.prototype.promptRole = function () {
  inquirer.prompt(roleQuestions).then(({ roleName, salary, roleDepartment }) => {
    this.role = new Department(roleName, salary, roleDepartment);
    this.company.push(this.role);
    this.promptQuestions();
  });
};

companyInfo.prototype.promptEmployee = function () {
  inquirer.prompt(employeeQuestions).then(({ updateEmployee }) => {
    this.updateEmployee = new Department(updateEmployee);
    this.company.push(this.updateEmployee);
    this.promptQuestions();
  });
};

// ---------> prompt for employee update
// companyInfo.prototype.promptUpdate = function () {
//   inquirer.prompt(employeeUpdateQuestions).then(({ updateEmployee }) => {
//     this.employee = new Department(updateEmployee);
//     this.company.push(this.employee);
//     this.promptQuestions();
//   });
// };

// ---------> create file with prompts
// const createFile = (mainHTML) => {
//   return new Promise((resolve, reject) => {
//     fs.writeFile("./dist/team.html", mainHTML, (err) => {
//       if (err) {
//         reject(err);
//         return;
//       }
//       resolve({
//         ok: true,
//         message: "teamFile created!",
//       });
//     });
//   });
// };

new companyInfo().promptQuestions();
