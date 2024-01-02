import { type ISessionTokenDataAccess } from '../../usecases/session-token/port/session-token-data-access'
import { MongoConnection } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'
import { formatNowDate } from '../../utils/data'
interface SessionTokenCreate {
  expiresIn: string
  createdByTheCompany: string
  createdAt?: string
  token: string
  updatedAt?: string
  history?: any[]
}

export class SessionTokenRepository implements ISessionTokenDataAccess {
  async createSessionToken (session: SessionTokenCreate): Promise<any> {
    const userCollection = MongoConnection.getCollection('sessions')
    const exists = await this.existsSessionTokenUser(session.createdByTheCompany)
    if (!exists) {
      session.createdAt = formatNowDate()
      session.history = [{ login: `Login in system at ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}` }]
      const sessionToken = await userCollection.insertOne(session)
      return { message: 'Token criado com sucesso', data: sessionToken }
    } else {
      return await this.editSessionToken(exists._id, session)
    }
  }

  async editSessionToken (existingSessionId: string, updatedSession: SessionTokenCreate): Promise<any> {
    const userCollection = MongoConnection.getCollection('sessions')
    const objectId = new ObjectId(existingSessionId)
    updatedSession.updatedAt = formatNowDate()
    const sessionToken = await userCollection.updateOne(
      { _id: objectId },
      {
        $set: updatedSession,
        $push: {
          history: {
            login: `Login in system at ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`
          }
        }
      }
    )
    return { message: 'Token editado com sucesso', data: sessionToken }
  }

  async findSessionTokenBycreatedByTheCompany (createdByTheCompany: any): Promise<any> {
    const userCollection = MongoConnection.getCollection('sessions')
    const result = await userCollection.findOne({ createdByTheCompany })
    if (result == null) {
      return false
    } else {
      return result
    }
  }

  async existsSessionTokenUser (createdByTheCompany: any): Promise<any> {
    const result = await this.findSessionTokenBycreatedByTheCompany(createdByTheCompany)
    if (result) {
      return result
    } else {
      return false
    }
  }
}
