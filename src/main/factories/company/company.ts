import { CompanyController } from '../../../adapters/company/controllers/company-adapters'
import { CompanyRepository } from '../../../infra/company/repository/company-repository'
import { CompanyUseCase } from '../../../usecases/company/company-usecase'

export const CompanyFactory = (): CompanyController => {
  const companyRepository = new CompanyRepository()
  const companyUseCase = new CompanyUseCase(companyRepository)
  const companyController = new CompanyController(companyUseCase)
  return companyController
}
