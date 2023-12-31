import { type CompanyEntity } from '../../../entities/company/company-entity'

export interface ICompanyDataAccess {
  createCompany: (company: CompanyEntity) => Promise<string>
  deleteCompany: (_id: string) => Promise<string>
}
