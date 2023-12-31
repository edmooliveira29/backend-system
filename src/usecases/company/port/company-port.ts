import { type CompanyData } from '../../../entities/company/company-entity'

export interface ICompanyCreateUseCase {
  createCompany: (company: CompanyData) => Promise<any>
  deleteCompany: (_id: string) => Promise<any>
}
