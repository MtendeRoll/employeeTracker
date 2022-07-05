class Employee {
  constructor(employeeFirstName, employeeLastName, employeeRole, employeeManager) {
    //super(employeeFirstName, employeeLastName, employeeRole);
    this.employeeFirstName = employeeFirstName;
    this.employeeLastName = employeeLastName;
    this.employeeRole = employeeRole;
    this.employeeManager = employeeManager;
  }

  getemployeeFirstName() {
    return this.employeeFirstName;
  }

  getemployeeLastName() {
    return this.employeeLastName;
  }

  getemployeeRole() {
    return this.employeeRole;
  }

  getemployeeManager() {
    return this.employeeManager;
  }

  getInfo() {
    return "Employee";
  }
}

module.exports = Employee;
