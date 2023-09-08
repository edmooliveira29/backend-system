import { UserController } from '../../../adapters/user/controllers/user-adapters'
import { UserRepository } from '../../../infra/user/repository/user-repository'
import { UserUseCase } from '../../../usecases/user/user-usecase'

export const UserFactory = (): UserController => {
  const userRepository = new UserRepository()
  const userUseCase = new UserUseCase(userRepository)
  const userController = new UserController(userUseCase)
  return userController
}
