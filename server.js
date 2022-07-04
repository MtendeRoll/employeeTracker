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
