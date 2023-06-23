import { type UserEntity } from '../../entities/user/user-entity'
import { ValidationUser } from '../validation/validation-user'
import { type IUserCreateUseCase } from './port/user-port'
import { type IUserDataAccess } from '../../usecases/user/port/user-data-access'
import { createSessionToken } from '../validation/session-token'

export class UserUseCase implements IUserDataAccess {
  public readonly port: IUserCreateUseCase
  public readonly validation: ValidationUser
  constructor (iUserCreateUseCase: IUserCreateUseCase) {
    this.port = iUserCreateUseCase
    this.validation = new ValidationUser()
  }

  async create (user: UserEntity): Promise<string> {
    const validationPassword: any = this.validation.passwordIsValid(user.password)
    if (!validationPassword.isValid) {
      return validationPassword.message
    } else if (!this.validation.emailIsValid(user.email)) {
      return 'E-mail não é valido'
    } else if (!this.validation.nameIsValid(user.name)) {
      return 'Nome não é valido'
    } else {
      await this.port.create(user)
      return 'Usuário criado com sucesso'
    }
  }

  async login (user: { email: string, password: string }): Promise<any> {
    const userRepository = await this.port.login(user)
    if (!userRepository.data) {
      return { message: 'Usuário não encontrado' }
    }
    const validationPassword: any = this.validation.comparePassword(userRepository.data.password, user.password)
    if (validationPassword.passwordValid) {
      userRepository.data.sessionToken = createSessionToken(userRepository.data)
      return { message: 'Usuário autenticado com sucesso', data: userRepository.data }
    } else {
      return validationPassword
    }
  }
}
