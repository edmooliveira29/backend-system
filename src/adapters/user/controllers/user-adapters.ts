
import { type IUserCreateUseCase } from '../../../usecases/user/port/user-port'
import { badRequest, internalError, ok } from '../../helpers/http-helper'
import { InvalidParamError } from '../errors/invalid-param-error'
import { MissingParamError } from '../errors/missing-param-error'
import { ServerError } from '../errors/server-error'
import { type UserHttpRequest } from '../ports/user-http-request'
import { type UserHttpResponse } from '../ports/user-http-response'

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
}
