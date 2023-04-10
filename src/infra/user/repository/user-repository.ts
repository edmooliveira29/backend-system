import { type IUserCreateData } from '../../../usecases/user/port/user-adapters'
import { type UserEntity } from '../../../entities/user/user-entity'
import { MongoConnection } from '../../helpers/mongo-helper'

export class UserRepository implements IUserCreateData {
  async create (user: UserEntity): Promise<any> {
    const userCollection = MongoConnection.getCollection('users')
    const exists = await this.exists(user.email)
    if (!exists) {
      await userCollection.insertOne(user)
      return 'User created successfully'
    } else {
      return new Error('There is already a user with this email')
    }
  }

  async findUserByEmail (email: string): Promise<any> {
    const userCollection = MongoConnection.getCollection('users')
    const result = await userCollection.findOne({ email })
    return result
  }

  async exists (email: string): Promise<boolean> {
    const result = await this.findUserByEmail(email)
    if (result != null) {
      return true
    } else {
      return false
    }
  }
}
