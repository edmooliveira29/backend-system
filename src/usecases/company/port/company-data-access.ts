import { type CompanyEntity } from '../../../entities/company/company-entity'

export interface ICompanyDataAccess {
  createCompany: (company: CompanyEntity) => Promise<string>
  getCompany: (_id: string) => Promise<any>
  editCompany: (_id: string, company: CompanyEntity) => Promise<any>
}
