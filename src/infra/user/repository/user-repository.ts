import { type IUserDataAccess } from '../../../usecases/user/port/user-data-access'
import { MongoConnection } from '../../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class UserRepository implements IUserDataAccess {
  async createUser (user: {
    _id?: any
    email: string
    name: string
    password: string
    createdAt: string
    createWithGoogle: boolean
  }): Promise<any> {
    const userCollection = MongoConnection.getCollection('users')
    const exists = await this.exists(user)
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

  async findUserByEmailOrId (user: any): Promise<any> {
    const userCollection = MongoConnection.getCollection('users')
    let result: any | null
    if (user.email.includes('@')) {
      result = await userCollection.findOne({ email: user.email })
    } else {
      const objectId = new ObjectId(user._id)
      result = await userCollection.findOne({ _id: objectId })
    }
    if (result != null) {
      const objectId = new ObjectId(result._id)
      await userCollection.updateOne(
        { _id: objectId },
        { $set: result }
      )
    }
    return result
  }

  async exists (user: any): Promise<boolean> {
    const result = await this.findUserByEmailOrId(user)
    if (result != null) {
      return true
    } else {
      return false
    }
  }

  async login (user: { email: string, password: string }): Promise<any> {
    const userFound = await this.findUserByEmailOrId(user)
    if (userFound) {
      return { message: 'Usuário autenticado com sucesso', data: userFound }
    } else {
      return { message: 'Usuário não encontrado' }
    }
  }

  async getUser (_id: string): Promise<any> {
    const user = await this.findUserByEmailOrId({ _id, email: '' })
    if (user) {
      return { message: 'Usuário encontrado com sucesso', data: user }
    } else {
      return { message: 'Usuário não encontrado' }
    }
  }

  async editUser (_id: string, updatedUserData: any): Promise<any> {
    const userCollection = MongoConnection.getCollection('users')
    const objectId = new ObjectId(_id)
    delete updatedUserData._id
    delete updatedUserData.newPassword
    delete updatedUserData.newPasswordConfirmation
    const user = await userCollection.updateOne(
      { _id: objectId },
      { $set: updatedUserData }
    )

    if (user) {
      updatedUserData._id = _id
      return { data: updatedUserData }
    } else {
      return { message: 'Usuário não encontrado' }
    }
  }
}
