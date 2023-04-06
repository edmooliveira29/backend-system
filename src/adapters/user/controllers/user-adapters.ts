
import { type IUserCreatePort } from '../../../usecases/user/port/user-port'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { MissingParamError } from '../errors/missing-param-error'
import { type UserHttpRequest, type UserHttpResponse } from '../ports/http-user-adapter'

export class UserAdapter {
  public readonly userUseCase: IUserCreatePort

  constructor (IUserCreatePort: IUserCreatePort) {
    this.userUseCase = IUserCreatePort
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
      return serverError(createUserResponse)
    }

    return ok(userData)
  }
}
