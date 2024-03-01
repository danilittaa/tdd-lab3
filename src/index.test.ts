import { CompanyServiceImpl } from "./CompanyServiceImpl";
import { Company } from "./Company";

describe("CompanyServiceImpl", () => {
  const main = new Company(null, 2);
  const book = new Company(main, 3);
  const manager = new Company(main, 4);
  const developer = new Company(manager, 8);
  const design = new Company(manager, 6);
  const lawyer = new Company(null, 1);

  const companies = [main, book, manager, developer, design];

  const companyService = new CompanyServiceImpl();

  //1
  it("should return null when company is null", () => {
    const result = companyService.getTopLevelParent(null);
    expect(result).toBeNull();
  });
  //2
  it("should return main when company has no parent", () => {
    const result = companyService.getTopLevelParent(main);
    expect(result).toEqual(main);
  });
  //3
  it("should return lawyer when company is single", () => {
    const result = companyService.getTopLevelParent(lawyer);
    expect(result).toEqual(lawyer);
  });
  //4
  it("should return main when company has one step to the top", () => {
    const result = companyService.getTopLevelParent(book);
    expect(result).toEqual(main);
  });
  //5
  it("should return main when company has two steps to the top", () => {
    const result = companyService.getTopLevelParent(developer);
    expect(result).toEqual(main);
  });
  //6
  it("should calculate employee count for main and children", () => {
    const result = companyService.getEmployeeCountForCompanyAndChildren(
      main,
      companies
    );
    expect(result).toEqual(23);
  });
  //7
  it("should calculate employee count for manager and children", () => {
    const result = companyService.getEmployeeCountForCompanyAndChildren(
      manager,
      companies
    );
    expect(result).toEqual(18);
  });
  //8
  it("should return only the number of employees of the company itself for an empty list of companies", () => {
    const result = companyService.getEmployeeCountForCompanyAndChildren(
      main,
      []
    );
    expect(result).toEqual(2);
  });
  //9
  it("should throw an error if employee count is negative", () => {
    const createCompanyWithNegativeEmployees = () => {
      new Company(null, -5);
    };
    expect(createCompanyWithNegativeEmployees).toThrow(
      "Employee count cannot be negative"
    );
  });
  //10
  it("should throw an error for non-integer employee count", () => {
    const createCompanyWithNonIntegerEmployees = () => {
      new Company(null, 7.5);
    };
    expect(createCompanyWithNonIntegerEmployees).toThrow(
      "Employee count must be an integer"
    );
  });
  //11
  it("should throw an error if employee count in setter is negative", () => {
    const company = new Company(null, 5);
    const setNegativeCount = () => {
      company.setEmployeesCount(-5);
    };
    expect(setNegativeCount).toThrow("Employee count cannot be negative");
  });
  //12
  it("should throw an error for non-integer employee count in setter", () => {
    const company = new Company(null, 5);
    const setNonIntegerCount = () => {
      company.setEmployeesCount(7.5);
    };
    expect(setNonIntegerCount).toThrow("Employee count must be an integer");
  });
  //13
  it("should handle duplicate companies in the list without double counting", () => {
    const duplicates = [main, book, manager, developer, design, developer]; // 'developer' is listed twice
    const result = companyService.getEmployeeCountForCompanyAndChildren(
      main,
      duplicates
    );
    expect(result).toEqual(23);
  });
});
