import { CompanyController } from '../../../interfaces/company/controllers/company-adapters'
import { CompanyUseCase } from '../../../usecases/company/company-usecase'
import { CompanyRepositoryInfra } from '../../../infra/company/company-repository'

export const CompanyFactory = (): CompanyController => {
  const companyRepositoryInfra = new CompanyRepositoryInfra()
  const companyUseCase = new CompanyUseCase(companyRepositoryInfra)
  const companyController = new CompanyController(companyUseCase)
  return companyController
}
