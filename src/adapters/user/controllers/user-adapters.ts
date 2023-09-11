import { type UserHttpRequest, type UserHttpResponse } from '../ports'
import { type IUserCreateUseCase } from '../../../usecases/user/port/user-port'
import { badRequest, internalError, noContent, ok } from '../../helpers/http-helper'
import { InvalidParamError, MissingParamError, NotFound, ServerError } from '../errors'

export class UserController {
  public readonly userUseCase: IUserCreateUseCase

  constructor (IUserCreateUseCase: IUserCreateUseCase) {
    this.userUseCase = IUserCreateUseCase
  }

  async create (userHttpRequest: UserHttpRequest): Promise<UserHttpResponse> {
    try {
      const userData = {
        _id: userHttpRequest.body._id,
        name: userHttpRequest.body.name,
        email: userHttpRequest.body.email,
        password: userHttpRequest.body.password,
        sessionToken: userHttpRequest.body.sessionToken,
        createdAt: new Date().toLocaleString()
      }
      const fildsRequired = ['name', 'password', 'email']
      for (const field of fildsRequired) {
        if (!Object.prototype.hasOwnProperty.call(userHttpRequest.body, field)) {
          return badRequest(new MissingParamError(field))
        }
      }

      const createUserResponse = await this.userUseCase.create(userData)
      console.log(createUserResponse)
      if (createUserResponse.message !== 'Usuário criado com sucesso') {
        return badRequest(new InvalidParamError(createUserResponse.message))
      }
      return ok(createUserResponse)
    } catch (error: any) {
      return internalError(new ServerError(error.message))
    }
  }

  async login (userHttpRequest: UserHttpRequest): Promise<UserHttpResponse> {
    try {
      const userData = {
        email: userHttpRequest.body.email,
        password: userHttpRequest.body.password,
        remember: userHttpRequest.body.remember
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
      console.trace()
      return internalError(new ServerError(error.message))
    }
  }
}
