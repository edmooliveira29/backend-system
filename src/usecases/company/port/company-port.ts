import { type CompanyData } from '../../../entities/company/company-entity'

export interface ICompanyUseCase {
  createCompany: (company: CompanyData) => Promise<any>
  getCompany: (_id: string) => Promise<any>
  editCompany: (_id: string, company: CompanyData) => Promise<any>
}
