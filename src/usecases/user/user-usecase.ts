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

  async create (user: UserEntity): Promise<any> {
    const validationPassword: any = this.validation.passwordIsValid(user.password)
    if (!validationPassword.isValid) {
      return validationPassword.message
    } else if (!this.validation.emailIsValid(user.email)) {
      return {
        message: 'E-mail não é valido'
      }
    } else if (!this.validation.nameIsValid(user.name)) {
      return {
        message: 'Nome não é valido'
      }
    } else {
      const userResponse = (await this.port.create(user)).data
      return {
        message: 'Usuário criado com sucesso',
        data: {
          id: userResponse._id,
          name: userResponse.name,
          email: userResponse.email,
          sessionToken: createSessionToken(userResponse),
          createdAt: new Date().toLocaleString()
        }
      }
    }
  }

  async login (user: { email: string, password: string, remember: boolean }): Promise<any> {
    const userRepository = await this.port.login(user)
    if (!userRepository.data) {
      return { message: 'Usuário não encontrado' }
    }

    const validationPassword: any = this.validation.comparePassword(userRepository.data.password, user.password)
    if (validationPassword.passwordValid) {
      return {
        message: 'Usuário autenticado com sucesso',
        data: {
          id: userRepository.data._id,
          name: userRepository.data.name,
          email: userRepository.data.email,
          sessionToken: user.remember ? createSessionToken(userRepository.data) : false,
          createdAt: new Date().toLocaleString()
        }
      }
    } else {
      return validationPassword
    }
  }
}
