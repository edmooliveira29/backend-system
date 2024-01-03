import { type UserHttpRequest, type UserHttpResponse } from '../ports'
import { type IUserCreateUseCase } from '../../../usecases/user/port/user-port'
import { badRequest, internalError, noContent, ok } from '../../helpers/http-helper'
import { InvalidParamError, MissingParamError, NotFound, ServerError } from '../errors'
import { formatNowDate } from '../../../utils/data'

export class UserController {
  public readonly userUseCase: IUserCreateUseCase

  constructor (userUseCase: IUserCreateUseCase) {
    this.userUseCase = userUseCase
  }

  async create (userHttpRequest: UserHttpRequest): Promise<UserHttpResponse> {
    try {
      const userData: any = {
        ...userHttpRequest.body,
        createdAt: formatNowDate()
      }
      const fieldsRequired = ['name', 'password', 'email']
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
        ...userHttpRequest.body,
        editAt: formatNowDate()
      }

      const fildsRequired = userData.newPassword
        ? ['newPassword', 'newPasswordConfirmation']
        : []
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
        ...userHttpRequest.body,
        loginWithGoogle: userHttpRequest.body.loginWithGoogle || false
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

  async getAllUser (companyId: string): Promise<UserHttpResponse> {
    try {
      const userReponseUseCase = await this.userUseCase.getAllUser(companyId)

      if (!userReponseUseCase.data) {
        return noContent(new NotFound(userReponseUseCase.message))
      }
      delete userReponseUseCase.data.password
      return ok({ message: userReponseUseCase.message, ...userReponseUseCase })
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
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }

  async deleteUser (objectId: string): Promise<UserHttpResponse> {
    try {
      const userReponseUseCase = await this.userUseCase.deleteUser(objectId)
      return ok({ message: userReponseUseCase.message, data: userReponseUseCase.data })
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }
}
