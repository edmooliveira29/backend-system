import { MongoConnection } from '../../helpers/mongo-helper'
import { type IUserDataAccess } from '../../../usecases/user/port/user-data-access'

export class UserRepository implements IUserDataAccess {
  async create (user: {
    id?: any
    email: string
    name: string
    password: string
    token: string
    sessionId: Date
    createdAt: string
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
      throw new Error('There is already a user with this email')
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

  async login (user: { email: string, password: string }): Promise<any> {
    const userFound = await this.findUserByEmail(user.email)
    if (userFound) {
      return { message: 'User authenticated successfully', data: userFound }
    } else {
      return { message: 'User not found' }
    }
  }
}
