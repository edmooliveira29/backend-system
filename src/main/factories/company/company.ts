import { CompanyRepositoryInfra } from '../../../infra/company/repository/company-repository'
import { SessionTokenRepository } from '../../../infra/session-token/repository/session-token-repository'
import { UserRepositoryInfra } from '../../../infra/user/repository/user-repository'
import { CompanyControllerInterface } from '../../../interfaces/company/controllers/company-adapters'
import { CompanyUseCase } from '../../../usecases/company/company-usecase'
import { SessionTokenUseCase } from '../../../usecases/session-token/session-token-usecase'
import { UserUseCase } from '../../../usecases/user/user-usecase'

const companyRepositoryInfra = new CompanyRepositoryInfra()
const userRepositoryInfra = new UserRepositoryInfra()
const sessionTokenRepository = new SessionTokenRepository()
const sessionTokenUseCase = new SessionTokenUseCase(sessionTokenRepository)
const userUseCase = new UserUseCase(userRepositoryInfra, sessionTokenUseCase)
const companyUseCase = new CompanyUseCase(companyRepositoryInfra, userUseCase)
const companyController = new CompanyControllerInterface(companyUseCase)
export const CompanyFactory = (): CompanyControllerInterface => {
  return companyController
}
