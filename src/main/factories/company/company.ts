import { CompanyRepositoryInfra } from '../../../infra/company/repository/company-repository'
import { UserRepositoryInfra } from '../../../infra/user/repository/user-repository'
import { CompanyControllerInterface } from '../../../interfaces/company/controllers/company-adapters'
import { CompanyUseCase } from '../../../usecases/company/company-usecase'

const companyRepositoryInfra = new CompanyRepositoryInfra()
const userRepositoryInfra = new UserRepositoryInfra()
const companyUseCase = new CompanyUseCase(companyRepositoryInfra, userRepositoryInfra)
const companyController = new CompanyControllerInterface(companyUseCase)
export const CompanyFactory = (): CompanyControllerInterface => {
  return companyController
}
