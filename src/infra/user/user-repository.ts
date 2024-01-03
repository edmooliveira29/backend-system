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
    createdByTheCompanyId: any
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
      throw new Error('Nome de usuário não permitido. Tente outro nome de usuário')
    }
  }

  async findUserByUsernameOrId (user: any): Promise<any> {
    const userCollection = MongoConnection.getCollection('users')
    if (user.username) {
      const result = await userCollection.findOne({ username: user.username })
      return result
    } else {
      const objectId = new ObjectId(user._id)
      const result = await userCollection.findOne({ _id: objectId })
      return result
    }
  }

  async findAllUsers (companyId: string): Promise<any> {
    const userCollection = MongoConnection.getCollection('users')
    const result = await userCollection.find({ createdByTheCompanyId: companyId }).toArray()
    return result
  }

  async exists (user: any): Promise<boolean> {
    const result = await this.findUserByUsernameOrId(user)
    if (result != null) {
      return true
    } else {
      return false
    }
  }

  async login (user: { username: string, password: string }): Promise<any> {
    const userFound = await this.findUserByUsernameOrId(user)
    if (userFound) {
      return { message: 'Usuário autenticado com sucesso', data: userFound }
    } else {
      return { message: 'Usuário não encontrado' }
    }
  }

  async getUser (objectId: any): Promise<any> {
    const userInfra = await this.findUserByUsernameOrId({ _id: new ObjectId(objectId) })
    if (userInfra) {
      return { data: userInfra }
    } else {
      return { message: 'Usuário não encontrado' }
    }
  }

  async getAllUser (companyId: string): Promise<any> {
    const category = await this.findAllUsers(companyId)

    if (category) {
      return { message: 'Usuários encontrada com sucesso', data: category }
    } else {
      return { message: 'Usuários não encontrado' }
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
