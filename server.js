const express = require("express");
const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    password: "$D8G9h4Y&=$X3?_w",
    database: "staff_db",
  },
  console.log(`Connected to the staff_db database.`)
);

function companyInfo() {
  this.company = [];
  this.department;
  this.role;
  this.employee;
}

companyInfo.prototype.promptDepartment = function () {
  inquirer.prompt(departmentQuestions);
};

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

// update employee questions
companyInfo.prototype.promptEmployeeUpdate = function () {
  inquirer.prompt({
    type: "list",
    name: "updateEmployee",
    message: "Which employee's role do you want to update?",
    choices: ["employee names"],
  });

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
};

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
