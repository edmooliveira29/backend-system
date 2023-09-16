import { UserController } from '../../../adapters/user/controllers/user-adapters'
import { SessionTokenRepository } from '../../../infra/session-token/repository/session-token-repository'
import { UserRepository } from '../../../infra/user/repository/user-repository'
import { SessionTokenUseCase } from '../../../usecases/session-token/session-token-usecase'
import { UserUseCase } from '../../../usecases/user/user-usecase'

export const UserFactory = (): UserController => {
  const userRepository = new UserRepository()
  const sessionTokenRepository = new SessionTokenRepository()
  const sessionTokenUseCase = new SessionTokenUseCase(sessionTokenRepository)
  const userUseCase = new UserUseCase(userRepository, sessionTokenUseCase)
  const userController = new UserController(userUseCase)
  return userController
}
