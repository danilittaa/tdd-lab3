import { Company } from "./Company";

interface ICompanyService {
  /**
   * @param child - company for whom we are searching the top level parent
   *                  (parent of parent of ...)
   * @return top level parent
   */
  getTopLevelParent(child: Company): Company | null;

  /**
   *
   * @param company  - company for whom we are searching the count of employees
   *                 (count of this company employees +
   *                 count employees of all children and their children employees )
   * @param companies  - list of all available companies
   *
   * @return count of employees
   */
  getEmployeeCountForCompanyAndChildren(
    company: Company,
    companies: Company[]
  ): number;
}

export { ICompanyService };
