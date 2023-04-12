
import { type IUserCreateUseCase } from '../../../usecases/user/port/user-port'
import { badRequest, internalError, ok } from '../../helpers/http-helper'
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
    const fildsRequired = ['name', 'password', 'email']
    for (const field of fildsRequired) {
      if (!Object.prototype.hasOwnProperty.call(userHttpRequest.body, field)) {
        return badRequest(new MissingParamError(field))
      }
    }
    const userData = {
      id: userHttpRequest.body.id,
      name: userHttpRequest.body.name,
      email: userHttpRequest.body.email,
      password: userHttpRequest.body.password,
      token: userHttpRequest.body.token,
      expiration: userHttpRequest.body.expiration
    }
    const createUserResponse = await this.userUseCase.create(userData)
    if (createUserResponse !== 'Successfully created user') {
      return internalError(new ServerError(createUserResponse))
    }

    return ok(userData)
  }
}
