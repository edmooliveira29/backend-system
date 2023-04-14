
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
        id: userHttpRequest.body.id,
        name: userHttpRequest.body.name,
        email: userHttpRequest.body.email,
        password: userHttpRequest.body.password,
        token: userHttpRequest.body.token,
        sessionId: userHttpRequest.body.sessionId
      }
      const fildsRequired = ['name', 'password', 'email']
      for (const field of fildsRequired) {
        if (!Object.prototype.hasOwnProperty.call(userHttpRequest.body, field)) {
          return badRequest(new MissingParamError(field))
        }
      }

      const createUserResponse = await this.userUseCase.create(userData)
      if (createUserResponse !== 'Successfully created user') {
        return badRequest(new InvalidParamError(createUserResponse))
      }
      return ok(userData)
    } catch (error: any) {
      return internalError(new ServerError(error.message))
    }
  }

  async login (userHttpRequest: UserHttpRequest): Promise<UserHttpResponse> {
    try {
      const userData = {
        id: userHttpRequest.body.id,
        name: userHttpRequest.body.name,
        email: userHttpRequest.body.email,
        password: userHttpRequest.body.password,
        token: userHttpRequest.body.token,
        sessionId: userHttpRequest.body.sessionId
      }
      const createUserResponse = await this.userUseCase.login(userData)
      if (createUserResponse === 'User not found') {
        return noContent(new NotFound(createUserResponse))
      }
      return ok({ message: createUserResponse })
    } catch (error: any) {
      return internalError(new ServerError(error.message))
    }
  }
}
