import { type UserEntity } from '../../entities/user/user-entity'
import { EmailValidation } from '../validation/email-validation'
import { type IUserPort } from './port/user-port'

export class UserUseCase implements IUserPort {
  public readonly port: IUserPort
  constructor (port: IUserPort) {
    this.port = port
  }

  async authenticate (user: UserEntity): Promise<string> {
    const emailValidation = new EmailValidation(user.email)
    if (emailValidation.isValid()) {
      return 'Successfully authenticated user'
    } else {
      return 'Email is invalid'
    }
  }

  async create (user: UserEntity): Promise<string> {
    return await this.port.create(user)
  }

  async update (user: UserEntity): Promise<string> {
    return await this.port.update(user)
  }
}
