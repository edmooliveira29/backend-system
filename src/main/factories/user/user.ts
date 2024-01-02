import { UserController } from '../../../interfaces/user/controllers/user-adapters'
import { SessionTokenRepository } from '../../../infra/session-token/session-token-repository'
import { UserRepositoryInfra } from '../../../infra/user/user-repository'
import { SessionTokenUseCase } from '../../../usecases/session-token/session-token-usecase'
import { UserUseCase } from '../../../usecases/user/user-usecase'
import { CompanyUseCase } from '../../../usecases/company/company-usecase'
import { CompanyRepositoryInfra } from '../../../infra/company/company-repository'

export const UserFactory = (): UserController => {
  const userRepositoryInfra = new UserRepositoryInfra()
  const sessionTokenRepository = new SessionTokenRepository()
  const sessionTokenUseCase = new SessionTokenUseCase(sessionTokenRepository)
  const companyRepositoryInfra = new CompanyRepositoryInfra()
  const companyUseCase = new CompanyUseCase(companyRepositoryInfra)
  const userUseCase = new UserUseCase(userRepositoryInfra, sessionTokenUseCase, companyUseCase)
  const userController = new UserController(userUseCase)
  return userController
}
