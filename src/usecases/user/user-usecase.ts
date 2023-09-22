import { type UserEntity } from '../../entities/user/user-entity'
import { type IUserDataAccess } from './port/user-data-access'
import { type UserEdit, type IUserCreateUseCase } from './port/user-port'
import { ValidationUser } from '../validation/validation-user'
import { type ISessionTokenUseCase } from '../session-token/session-token-interface'

export class UserUseCase implements IUserDataAccess {
  public readonly portRepository: IUserCreateUseCase
  public readonly validation: ValidationUser
  public readonly sessionToken: ISessionTokenUseCase

  constructor (IUserCreateUseCase: IUserCreateUseCase, ISessionTokenUseCase: ISessionTokenUseCase) {
    this.portRepository = IUserCreateUseCase
    this.validation = new ValidationUser()
    this.sessionToken = ISessionTokenUseCase
  }

  async login (user: { email: string, password: string, remember: boolean }): Promise<any> {
    const userRepository = await this.portRepository.login(user)
    if (!userRepository.data) {
      return { message: 'Usuário não encontrado' }
    }
    const validationPassword: any = this.validation.comparePassword(userRepository.data.password, user.password)
    const sessionToken = await this.sessionToken.createSessionToken(userRepository, user.remember)
    if (validationPassword.passwordValid) {
      return {
        message: 'Usuário autenticado com sucesso',
        data: {
          _id: userRepository.data._id,
          name: userRepository.data.name,
          email: userRepository.data.email,
          sessionToken: sessionToken.data.token,
          createdAt: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
        }
      }
    } else {
      return validationPassword
    }
  }

  async createUser (user: UserEntity): Promise<any> {
    const validationPassword: any = this.validation.passwordIsValid(user.password)
    if (!validationPassword.isValid) {
      return { message: validationPassword.message }
    } else if (!this.validation.emailIsValid(user.email)) {
      return { message: 'E-mail não é valido' }
    } else if (!this.validation.nameIsValid(user.name)) {
      return { message: 'Nome não é valido' }
    } else {
      const userResponse = (await this.portRepository.createUser(user))
      const sessionToken = await this.sessionToken.createSessionToken({ data: user }, false)
      return {
        message: 'Usuário criado com sucesso',
        data: {
          _id: userResponse.data._id,
          name: userResponse.data.name,
          email: userResponse.data.email,
          sessionToken: sessionToken.data.token,
          createdAt: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
        }
      }
    }
  }

  async editUser (_id: string, user: UserEdit): Promise<any> {
    if (!this.validation.emailIsValid(user.email)) {
      return { message: 'E-mail não é valido' }
    } else if (!this.validation.nameIsValid(user.name)) {
      return { message: 'Nome não é valido' }
    } else {
      const userResponse = (await this.portRepository.editUser(_id, user))
      return {
        message: 'Usuário editado com sucesso',
        data: {
          _id: userResponse.data._id,
          address: userResponse.data.address,
          birthday: userResponse.data.birthday,
          city: userResponse.data.city,
          complement: userResponse.data.complement,
          cpf: userResponse.data.cpf,
          email: userResponse.data.email,
          gender: userResponse.data.gender,
          houseNumber: userResponse.data.houseNumber,
          name: userResponse.data.name,
          neighborhood: userResponse.data.neighborhood,
          nickname: userResponse.data.nickname,
          phoneNumber: userResponse.data.phoneNumber,
          stateOfTheCountry: userResponse.data.stateOfTheCountry,
          zipCode: userResponse.data.zipCode
        }
      }
    }
  }

  async getUser (userId: string): Promise<any> {
    const userRepository = await this.portRepository.getUser(userId)
    if (!userRepository) {
      return { message: 'Usuário não encontrado' }
    }

    return { message: 'Usuário encontrado com sucesso', ...userRepository }
  }
}
