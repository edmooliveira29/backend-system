import { type UserEntity } from '../../entities/user/user-entity'
import { ValidationUser } from '../validation/validation-user'
import { type IUserCreatePort } from './port/user-port'

export class UserUseCase {
  public readonly port: IUserCreatePort
  constructor (port: IUserCreatePort) {
    this.port = port
  }

  async create (user: UserEntity): Promise<string | undefined> {
    const validation = new ValidationUser(user)
    if (!validation.emailIsValid()) {
      return 'Email is not valid'
    } else if (!validation.nameIsValid()) {
      return 'User is not valid'
    } else {
      return 'Successfully created user'
    }
  }
}
