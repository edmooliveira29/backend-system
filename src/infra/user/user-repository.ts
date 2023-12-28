import { type IUserDataAccess } from '../../usecases/user/port/user-data-access'
import { MongoConnection } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class UserRepositoryInfra implements IUserDataAccess {
  async createUser (user: {
    _id?: any
    email: string
    name: string
    password: string
    role: string
    createdAt: string
    createWithGoogle: boolean
    createdBy: any
  }): Promise<any> {
    const userCollection = MongoConnection.getCollection('users')
    const exists = await this.exists(user)
    if ((!exists)) {
      user = {
        ...user
      }
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

  async findAllUsers (): Promise<any> {
    const userCollection = MongoConnection.getCollection('users')
    const result = await userCollection.find({}).toArray()
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
    let user
    if (_id) {
      user = await this.findUserByEmailOrId({ _id, email: '' })
    } else {
      user = await this.findAllUsers()
    }
    if (user) {
      return { data: user }
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

  async deleteUser (_id: string): Promise<any> {
    const userCollection = MongoConnection.getCollection('users')
    const objectId = new ObjectId(_id)
    const user = await userCollection.deleteOne({ _id: objectId })
    if (user) {
      return { message: 'Usuário deletado com sucesso', data: await userCollection.find({}).toArray() }
    } else {
      return { message: 'Usuário não encontrado' }
    }
  }
}
