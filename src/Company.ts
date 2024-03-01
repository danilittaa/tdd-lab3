class Company {
  private parent: Company | null;
  private employeesCount: number;

  constructor(parent: Company | null, employeesCount: number) {
    this.validateEmployeesCount(employeesCount);
    this.parent = parent;
    this.employeesCount = employeesCount;
  }

  getParent(): Company | null {
    return this.parent;
  }

  getEmployeesCount(): number {
    return this.employeesCount;
  }

  setEmployeesCount(employeesCount: number): void {
    this.validateEmployeesCount(employeesCount);
    this.employeesCount = employeesCount;
  }

  private validateEmployeesCount(employeesCount: number): void {
    if (!Number.isInteger(employeesCount)) {
      throw new Error("Employee count must be an integer");
    }
    if (employeesCount < 0) {
      throw new Error("Employee count cannot be negative");
    }
  }
}

export { Company };
