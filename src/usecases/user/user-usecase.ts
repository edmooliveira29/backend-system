import { type UserEntity } from '../../entities/user/user-entity'
import { ValidationUser } from '../validation/validation-user'
import { type IUserCreateUseCase } from './port/user-port'
import { type IUserDataAccess } from '../../usecases/user/port/user-data-access'
import { SessionToken } from '../validation/session-token'

export class UserUseCase implements IUserDataAccess {
  public readonly port: IUserCreateUseCase
  public readonly validation: ValidationUser
  public readonly sessionToken = new SessionToken()
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
      const userResponse = (await this.port.create(user))
      return {
        message: 'Usuário criado com sucesso',
        data: {
          id: userResponse.data._id,
          name: userResponse.data.name,
          email: userResponse.data.email,
          sessionToken: this.sessionToken.create(userResponse.data, true),
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
          sessionToken: this.sessionToken.create(userRepository.data, user.remember),
          createdAt: new Date().toLocaleString()
        }
      }
    } else {
      return validationPassword
    }
  }

  async getUser (userId: string): Promise<any> {
    try {
      const userRepository = await this.port.getUser(userId)
      if (!userRepository) {
        return { message: 'Usuário não encontrado' }
      }

      return {
        message: 'Usuário encontrado com sucesso',
        ...userRepository
      }
    } catch (error) {
      return { message: 'Erro ao buscar o usuário' }
    }
  }
}
