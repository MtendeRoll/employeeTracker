class Department {
  constructor(departmentName) {
    super(departmentName);
    this.departmentName = departmentName;
  }

  getDepartmentName() {
    return this.departmentName;
  }

  getInfo() {
    return "Department";
  }
}

module.exports = Department;
