/* eslint-disable @typescript-eslint/no-floating-promises */
import { MongoConnection } from '../../helpers/mongo-helper'
import { UserRepository } from './user-repository'
import dotenv from 'dotenv'
dotenv.config()

describe('Mongodb User repository', () => {
  beforeAll(async () => {
    await MongoConnection.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoConnection.disconnect()
  })

  afterEach(async () => {
    await MongoConnection.clearCollection('users')
  })

  test('Should created a new user', async () => {
    const sut = new UserRepository()
    const userAdded = await sut.create({
      id: 'anyId',
      name: 'anyName',
      email: 'email@email.com',
      password: 'password',
      token: 'anyToken',
      sessionId: new Date('01-01-01'),
      createdAt: new Date('01-01-01').toLocaleString()
    })
    expect(userAdded).toBeTruthy()
  })

  test('Should return error if exist user with same email', async (): Promise<void> => {
    const sut = new UserRepository()
    const userMock = {
      id: 'anyId',
      name: 'anyName',
      email: 'email@email.com',
      password: 'password',
      token: 'anyToken',
      sessionId: new Date('01-01-01'),
      createdAt: new Date('01-01-01').toLocaleString()
    }
    await sut.create(userMock)
    expect(async () => await sut.create(userMock)).rejects.toStrictEqual(new Error('Já existe um usuário com este e-mail'))
  })

  test('Return true with user exist', async () => {
    const sut = new UserRepository()
    const userMock = {
      id: 'anyId',
      name: 'anyName',
      email: 'email@email.com',
      password: 'password',
      token: 'anyToken',
      sessionId: new Date('01-01-01'),
      createdAt: new Date('01-01-01').toLocaleString()
    }
    await sut.create(userMock)

    expect(await sut.exists('email@email.com')).toBeTruthy()
  })

  test('Return true with authentication with sucessfuly', async () => {
    const sut = new UserRepository()
    const userMock = {
      id: 'anyId',
      name: 'anyName',
      email: 'email@email.com',
      password: 'Password1*',
      token: 'anyToken',
      sessionId: new Date('01-01-01'),
      createdAt: new Date('01-01-01')
    }
    jest.spyOn(sut, 'findUserByEmail').mockResolvedValue(userMock)
    expect(await sut.login({ email: 'email@email.com', password: 'Password1*' }))
      .toStrictEqual({
        message: 'Usuário autenticado com sucesso',
        data: userMock
      })
  })

  test('Return message if Usuário não encontrado to authentication', async () => {
    const sut = new UserRepository()
    expect(await sut.login({ email: 'emailnotcreated@email.com', password: 'Password1*' })).toStrictEqual({ message: 'Usuário não encontrado' })
  })
})
