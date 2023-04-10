import { type IUserCreateData } from '../../../usecases/user/port/user-adapters'
import { type UserEntity } from '../../../entities/user/user-entity'
import { MongoHelper } from '../helpers/mongo-helper'

export class UserRepository implements IUserCreateData {
  async create (user: UserEntity): Promise<string> {
    const userCollection = MongoHelper.getCollection('users')
    const exists = await this.exists(user.email)
    if (!exists) {
      await userCollection.insertOne(user)
    }
    return ''
  }

  async findUserByEmail (email: string): Promise<any> {
    const userCollection = MongoHelper.getCollection('users')
    const result = await userCollection.findOne({ email })

    return result
  }

  async exists (email: string): Promise<boolean> {
    const result = await this.findUserByEmail(email)
    if (result != null) {
      if (result.email === email) {
        return true
      }
    }
    return false
  }
}
