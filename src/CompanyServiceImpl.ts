import { ICompanyService } from "./IComponyService";
import { Company } from "./Company";

class CompanyServiceImpl implements ICompanyService {
  getTopLevelParent(child: Company | null): Company | null {
    if (!child) {
      return null;
    }

    let currentCompany: Company | null = child;
    while (currentCompany && currentCompany.getParent()) {
      currentCompany = currentCompany.getParent();
    }

    return currentCompany;
  }

  getEmployeeCountForCompanyAndChildren(
    company: Company,
    companies: Company[]
  ): number {
    if (!company) {
      return 0;
    }

    let count = company.getEmployeesCount();
    const uniqueCompanies = [...new Set(companies)];
    const children = uniqueCompanies.filter((c) => c.getParent() === company);
    for (const child of children) {
      count += this.getEmployeeCountForCompanyAndChildren(child, companies);
    }

    return count;
  }
}

export { CompanyServiceImpl };
