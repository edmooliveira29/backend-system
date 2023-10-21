import { UserController } from '../../../interfaces/user/controllers/user-adapters'
import { SessionTokenRepository } from '../../../infra/session-token/repository/session-token-repository'
import { UserRepositoryInfra } from '../../../infra/user/repository/user-repository'
import { SessionTokenUseCase } from '../../../usecases/session-token/session-token-usecase'
import { UserUseCase } from '../../../usecases/user/user-usecase'

export const UserFactory = (): UserController => {
  const userRepositoryInfra = new UserRepositoryInfra()
  const sessionTokenRepository = new SessionTokenRepository()
  const sessionTokenUseCase = new SessionTokenUseCase(sessionTokenRepository)
  const userUseCase = new UserUseCase(userRepositoryInfra, sessionTokenUseCase)
  const userController = new UserController(userUseCase)
  return userController
}
