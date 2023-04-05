import { type UserEntity } from '../../entities/user/user-entity'
import { ValidationUser } from '../validation/validation-user'
import { type IUserPort } from './port/user-port'

export class UserUseCase {
  public readonly port: IUserPort
  constructor (port: IUserPort) {
    this.port = port
  }

  async create (user: UserEntity): Promise<string | undefined> {
    const validation = new ValidationUser(user)
    console.log(!validation.nameIsValid())
    if (!validation.emailIsValid()) {
      return 'Email is not valid'
    } else if (!validation.nameIsValid()) {
      return 'User is not valid'
    } else {
      return 'Successfully created user'
    }
  }
}
