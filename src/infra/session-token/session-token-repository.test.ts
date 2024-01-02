/* eslint-disable @typescript-eslint/no-floating-promises */
import { MongoConnection } from '../helpers/mongo-helper'
import { SessionTokenRepository } from './session-token-repository'
import dotenv from 'dotenv'
dotenv.config()

describe('Mongodb Session repository', () => {
  beforeAll(async () => {
    await MongoConnection.connect(process.env.MONGO_URL_TEST as string)
  })

  afterAll(async () => {
    await MongoConnection.disconnect()
  })

  afterEach(async () => {
    await MongoConnection.clearCollection('sessions')
  })

  test('Should created a new session', async () => {
    const sut = new SessionTokenRepository()
    const sessionAdded = await sut.createSessionToken({
      expiresIn: 'string',
      createdByTheCompanyId: 'anyId',
      createdAt: new Date().toLocaleString(),
      token: 'stringToken',
      updatedAt: new Date().toLocaleString(),
      history: []
    })
    expect(sessionAdded).toBeTruthy()
  })

  test('Return true with session exist', async () => {
    const sut = new SessionTokenRepository()
    const session = {
      _id: 'anyId',
      expiresIn: 'string',
      createdByTheCompanyId: 'anyId',
      createdAt: new Date().toLocaleString(),
      token: 'stringToken',
      updatedAt: new Date().toLocaleString(),
      history: []
    }
    await sut.createSessionToken(session)

    expect(await sut.existsSessionTokenUser(session._id)).toBeTruthy()
  })
})
