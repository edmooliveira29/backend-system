import { type UserEntity } from '../../entities/user/user-entity'
import { ValidationUser } from '../validation/validation-user'
import { type IUserCreateUseCase } from './port/user-port'

export class UserUseCase {
  public readonly port: IUserCreateUseCase
  constructor (port: IUserCreateUseCase) {
    this.port = port
  }

  async create (user: UserEntity): Promise<any> {
    const validation = new ValidationUser(user)
    if (!validation.emailIsValid()) {
      return 'Email is not valid'
    } else if (!validation.nameIsValid()) {
      return 'Name is not valid'
    } else {
      await this.port.create(user)
      return 'Successfully created user'
    }
  }
}
