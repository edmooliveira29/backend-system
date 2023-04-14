import { type UserEntity } from '../../entities/user/user-entity'
import { ValidationUser } from '../validation/validation-user'
import { type IUserCreateUseCase } from './port/user-port'
import { type IUserDataAccess } from '../../usecases/user/port/user-data-access'

export class UserUseCase implements IUserDataAccess {
  public readonly port: IUserCreateUseCase
  constructor (iUserCreateUseCase: IUserCreateUseCase) {
    this.port = iUserCreateUseCase
  }

  async create (user: UserEntity): Promise<string> {
    const validation = new ValidationUser(user)
    const validationPassword: any = validation.passwordIsValid()
    if (!validationPassword.isValid) {
      return validationPassword.message
    } else if (!validation.emailIsValid()) {
      return 'Email is not valid'
    } else if (!validation.nameIsValid()) {
      return 'Name is not valid'
    } else {
      await this.port.create(user)
      return 'Successfully created user'
    }
  }

  async login (user: { email: string, password: string }): Promise<any> {
    const userFound = await this.port.login(user)
    if (userFound) {
      return 'Successfully authenticated user'
    } else {
      return 'User not found'
    }
  }
}
