import { MongoConnection } from '../../helpers/mongo-helper'
import { type IUserDataAccess } from '../../../usecases/user/port/user-data-access'
import { ObjectId } from 'mongodb'

export class UserRepository implements IUserDataAccess {
  async create (user: {
    _id?: any
    email: string
    name: string
    password: string
    sessionToken: string
    createdAt: string
  }): Promise<any> {
    const userCollection = MongoConnection.getCollection('users')
    const exists = await this.exists(user.email)
    if (!exists) {
      const userInserted = await userCollection.insertOne(user)
      return {
        data: {
          ...user,
          _id: userInserted.insertedId
        }
      }
    } else {
      throw new Error('Já existe um usuário com este e-mail')
    }
  }

  async findUserByEmailOrId (information: string): Promise<any> {
    const userCollection = MongoConnection.getCollection('users')
    let result
    if (information.includes('@')) {
      result = await userCollection.findOne({ email: information })
    } else {
      const objectId = new ObjectId(information)
      result = await userCollection.findOne({ _id: objectId })
    }
    return result
  }

  async exists (email: string): Promise<boolean> {
    const result = await this.findUserByEmailOrId(email)
    if (result != null) {
      return true
    } else {
      return false
    }
  }

  async login (user: { email: string, password: string }): Promise<any> {
    const userFound = await this.findUserByEmailOrId(user.email)
    if (userFound) {
      return { message: 'Usuário autenticado com sucesso', data: userFound }
    } else {
      return { message: 'Usuário não encontrado' }
    }
  }

  async getUser (_id: string): Promise<any> {
    const user = await this.findUserByEmailOrId(_id)

    if (user) {
      return { message: 'Usuário encontrado com sucesso', data: user }
    } else {
      return { message: 'Usuário não encontrado' }
    }
  }
}
