class Role {
  constructor(roleName, salary, roleDepartment) {
    //super(roleName, salary, roleDepartment);
    this.roleName = roleName;
    this.salary = salary;
    this.roleDepartment = roleDepartment;
  }

  getroleName() {
    return this.roleName;
  }

  getsalary() {
    return this.salary;
  }

  getroleDepartment() {
    return this.roleDepartment;
  }

  getInfo() {
    return "Role";
  }
}

module.exports = Role;
