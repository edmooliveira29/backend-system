import { type UserEntity } from '../../entities/user/user-entity'
import { type IUserDataAccess } from './port/user-data-access'
import { type UserEdit, type IUserCreateUseCase } from './port/user-port'
import { Validation } from '../validation/validations'
import { type ISessionTokenUseCase } from '../session-token/session-token-interface'
import { formatNowDate } from '../../utils/data'
import { type ICompanyUseCase } from '../company/port/company-port'

export class UserUseCase implements IUserDataAccess {
  public readonly portRepository: IUserCreateUseCase
  public readonly validation: Validation
  public readonly sessionToken: ISessionTokenUseCase
  public readonly companyUseCase: ICompanyUseCase

  constructor (IUserCreateUseCase: IUserCreateUseCase, ISessionTokenUseCase: ISessionTokenUseCase, ICompanyUseCase: ICompanyUseCase) {
    this.portRepository = IUserCreateUseCase
    this.sessionToken = ISessionTokenUseCase
    this.companyUseCase = ICompanyUseCase
    this.validation = new Validation()
  }

  async login (user: { username: string, password: string, remember: boolean, loginWithGoogle?: boolean }): Promise<any> {
    const userRepositoryInfra = await this.portRepository.login(user)
    if (!userRepositoryInfra.data) {
      return { message: 'Usuário não encontrado' }
    }
    const validationPassword: any = !user.loginWithGoogle
      ? await this.validation.comparePassword(user.password, userRepositoryInfra.data.password)
      : { passwordIsValid: true }
    const sessionToken = await this.sessionToken.createSessionToken(userRepositoryInfra, user.remember)
    if (validationPassword.passwordIsValid) {
      return {
        message: 'Usuário autenticado com sucesso',
        data: {
          ...userRepositoryInfra.data,
          sessionToken: sessionToken.data.token
        }
      }
    } else {
      return validationPassword
    }
  }

  async createUser (user: UserEntity): Promise<any> {
    const validationPassword: any = this.validation.passwordIsValid(user.password)
    user = {
      ...user,
      sessionToken: (await this.sessionToken.createSessionToken({ data: user }, false)).data.token,
      password: await this.validation.hashPassword(user.password)
    }
    if (!validationPassword.passwordIsValid) {
      return { message: validationPassword.message }
    } else if (!this.validation.emailIsValid(user.email)) {
      return { message: 'E-mail não é valido' }
    } else if (!this.validation.nameIsValid(user.name)) {
      return { message: 'Nome não é valido' }
    } else {
      const userResponse = await this.portRepository.createUser(user)
      return {
        message: 'Usuário criado com sucesso',
        data: {
          ...userResponse.data
        }
      }
    }
  }

  async editUser (_id: string, user: UserEdit): Promise<any> {
    let validationPassword: any = { passwordIsValid: true }
    const userFound = await this.getUser(_id)
    validationPassword = user.newPassword ? await this.validation.comparePassword(user.password, userFound.data.password) : validationPassword
    if (!validationPassword.passwordIsValid && user.newPassword) {
      return { message: 'Senha atual esta incorreta' }
    }
    const newPassword = user.newPassword
    if (user.newPassword) {
      validationPassword = this.validation.passwordIsValid(user.newPassword)
      user = {
        ...userFound.data,
        lastChangedPassword: formatNowDate(),
        password: await this.validation.hashPassword(user.newPassword)
      }
    } else {
      user = {
        ...user,
        lastChangedPassword: userFound.data.lastChangedPassword,
        password: userFound.data.password
      }
    }
    const userResponse = (await this.portRepository.editUser(_id, user))
    if (!validationPassword.passwordIsValid) {
      return { message: validationPassword.message }
    } else if (!this.validation.emailIsValid(user.email)) {
      return { message: 'E-mail não é valido' }
    } else if (!this.validation.nameIsValid(user.name)) {
      return { message: 'Nome não é valido' }
    } else {
      return {
        message: newPassword ? 'Senha editada com sucesso' : 'Usuário editado com sucesso',
        data: {
          _id: userResponse.data._id,
          street: userResponse.data.street,
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
          zipCode: userResponse.data.zipCode,
          lastChangedPassword: userResponse.data.lastChangedPassword ? userResponse.data.lastChangedPassword : null,
          profilePicture: userResponse.data.profilePicture,
          role: userResponse.data.role
        }
      }
    }
  }

  async getUser (objectId: string): Promise<any> {
    const userRepositoryInfra = await this.portRepository.getUser(objectId)
    if (!userRepositoryInfra) {
      return { message: 'Usuário não encontrado' }
    }

    return { ...userRepositoryInfra }
  }

  async getAllUser (companyId: string): Promise<any> {
    const userRepositoryInfra = await this.portRepository.getAllUser(companyId)
    if (!userRepositoryInfra) {
      return { message: 'Usuário não encontrado' }
    }

    return { ...userRepositoryInfra }
  }

  async deleteUser (userId: string): Promise<any> {
    const userRepositoryInfra = await this.portRepository.deleteUser(userId)
    if (!userRepositoryInfra) {
      return { message: 'Usuário não encontrado' }
    }
    return { message: 'Usuário deletado com sucesso', data: userRepositoryInfra.data }
  }
}
