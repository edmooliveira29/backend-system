import { type UserHttpRequest, type UserHttpResponse } from '../ports'
import { type IUserCreateUseCase } from '../../../usecases/user/port/user-port'
import { badRequest, internalError, noContent, ok } from '../../helpers/http-helper'
import { InvalidParamError, MissingParamError, NotFound, ServerError } from '../errors'

export class UserController {
  public readonly userUseCase: IUserCreateUseCase

  constructor (userUseCase: IUserCreateUseCase) {
    this.userUseCase = userUseCase
  }

  async create (userHttpRequest: UserHttpRequest): Promise<UserHttpResponse> {
    try {
      const userData: any = {
        _id: userHttpRequest.body._id,
        name: userHttpRequest.body.name,
        email: userHttpRequest.body.email,
        password: userHttpRequest.body.password || `${Math.random().toFixed(5)}Aa*`,
        createdAt: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
        profilePicture: userHttpRequest.body.profilePicture || null,
        createWithGoogle: userHttpRequest.body.createWithGoogle,
        companyId: userHttpRequest.body.companyId,
        createdBy: userHttpRequest.body.createdBy
      }
      const fieldsRequired = ['name', 'password', 'email', 'companyId', 'createdBy']
      for (const field of fieldsRequired) {
        const fieldExists = Object.prototype.hasOwnProperty.call(userData, field)
        const value = userData[`${field}`]
        if (!fieldExists || value === undefined || value == null) {
          return badRequest(new MissingParamError(field))
        }
      }

      const createUserResponse = await this.userUseCase.createUser(userData)
      if (createUserResponse.message !== 'Usuário criado com sucesso') {
        return badRequest(new InvalidParamError(createUserResponse.message))
      }
      return ok(createUserResponse)
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }

  async edit (userHttpRequest: UserHttpRequest): Promise<UserHttpResponse> {
    try {
      const userData = {
        _id: userHttpRequest.body._id,
        address: userHttpRequest.body.address,
        birthday: userHttpRequest.body.birthday,
        city: userHttpRequest.body.city,
        complement: userHttpRequest.body.complement,
        cpf: userHttpRequest.body.cpf,
        email: userHttpRequest.body.email,
        gender: userHttpRequest.body.gender,
        houseNumber: userHttpRequest.body.houseNumber,
        name: userHttpRequest.body.name,
        neighborhood: userHttpRequest.body.neighborhood,
        nickname: userHttpRequest.body.nickname,
        phoneNumber: userHttpRequest.body.phoneNumber,
        stateOfTheCountry: userHttpRequest.body.stateOfTheCountry,
        zipCode: userHttpRequest.body.zipCode,
        password: userHttpRequest.body.password,
        newPassword: userHttpRequest.body.newPassword,
        newPasswordConfirmation: userHttpRequest.body.newPasswordConfirmation,
        editAt: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
        profilePicture: userHttpRequest.body.profilePicture
      }

      const fildsRequired = userData.newPassword
        ? ['newPassword', 'newPasswordConfirmation']
        : ['name', 'cpf', 'birthday', 'gender', 'phoneNumber', 'email', 'zipCode', 'address', 'houseNumber', 'neighborhood', 'stateOfTheCountry', 'city']
      for (const field of fildsRequired) {
        if (!Object.prototype.hasOwnProperty.call(userHttpRequest.body, field)) {
          return badRequest(new MissingParamError(field))
        }
      }
      const createUserResponse = await this.userUseCase.editUser(userHttpRequest.body._id, userData)

      if (!createUserResponse.data) {
        return badRequest(new InvalidParamError(createUserResponse.message))
      }
      return ok(createUserResponse)
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }

  async login (userHttpRequest: UserHttpRequest): Promise<UserHttpResponse> {
    try {
      const userData = {
        email: userHttpRequest.body.email,
        password: userHttpRequest.body.password,
        remember: userHttpRequest.body.remember,
        loginWithGoogle: userHttpRequest.body.loginWithGoogle || false,
        companyId: userHttpRequest.body.companyId,
        createdBy: userHttpRequest.body.createdBy
      }
      const userReponseUseCase = await this.userUseCase.login(userData)

      if (!userReponseUseCase.data) {
        return noContent(new NotFound(userReponseUseCase.message))
      }

      if (Object.prototype.hasOwnProperty.call(userReponseUseCase.data, 'passwordValid')) {
        return badRequest(new InvalidParamError(userReponseUseCase.data.message))
      }
      delete userReponseUseCase.data.password
      return ok({ message: userReponseUseCase.message, data: userReponseUseCase.data })
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }

  async getUser (objectId: string): Promise<UserHttpResponse> {
    try {
      const userReponseUseCase = await this.userUseCase.getUser(objectId)

      if (!userReponseUseCase.data) {
        return noContent(new NotFound(userReponseUseCase.message))
      }
      delete userReponseUseCase.data.password
      return ok({ message: userReponseUseCase.message, ...userReponseUseCase })
    } catch (error: any) {
      // console.error(error)
      return internalError(new ServerError(error.message))
    }
  }
}
