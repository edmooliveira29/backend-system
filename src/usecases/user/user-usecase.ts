import { type UserEntity } from '../../entities/user/user-entity'
import { ValidationUser } from '../validation/validation-user'
import { type IUserCreateUseCase } from './port/user-port'
import { type IUserDataAccess } from '../../usecases/user/port/user-data-access'

export class UserUseCase implements IUserDataAccess {
  public readonly port: IUserCreateUseCase
  public readonly validation: ValidationUser
  constructor (iUserCreateUseCase: IUserCreateUseCase) {
    this.port = iUserCreateUseCase
    this.validation = new ValidationUser()
  }

  async create (user: UserEntity): Promise<string> {
    const validationPassword: any = this.validation.passwordIsValid(user.password)
    if (!validationPassword.isValid) {
      return validationPassword.message
    } else if (!this.validation.emailIsValid(user.email)) {
      return 'Email is not valid'
    } else if (!this.validation.nameIsValid(user.name)) {
      return 'Name is not valid'
    } else {
      await this.port.create(user)
      return 'Successfully created user'
    }
  }

  async login (user: { email: string, password: string }): Promise<any> {
    const userRepository = await this.port.login(user)
    if (!userRepository.data) {
      return { message: 'User not found' }
    }
    const validationPassword: any = this.validation.comparePassword(userRepository.data.password, user.password)
    if (validationPassword.passwordValid) {
      return { message: 'Successfully authenticated user', data: userRepository.data }
    } else {
      return validationPassword
    }
  }
}
