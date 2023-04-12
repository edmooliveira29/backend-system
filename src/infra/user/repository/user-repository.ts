import { MongoConnection } from '../../helpers/mongo-helper'
import { type IUserCreateUseCase } from '../../../usecases/user/port/user-port'

export class UserRepository implements IUserCreateUseCase {
  async create (user: {
    id?: any
    email: string
    name: string
    password: string
    token: string
    expiration: Date
  }): Promise<any> {
    const userCollection = MongoConnection.getCollection('users')
    const exists = await this.exists(user.email)
    if (!exists) {
      const userInserted = await userCollection.insertOne(user)

      return {
        data: {
          ...user,
          id: userInserted.insertedId
        }
      }
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
