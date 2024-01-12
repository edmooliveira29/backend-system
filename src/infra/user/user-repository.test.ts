/* eslint-disable @typescript-eslint/no-floating-promises */
import { MongoConnection } from '../helpers/mongo-helper'
import { UserRepositoryInfra } from './user-repository'
import dotenv from 'dotenv'
dotenv.config()

describe('Mongodb User repository', () => {
  beforeAll(async () => {
    await MongoConnection.connect(process.env.MONGO_URL_TEST as string)
  })

  afterAll(async () => {
    await MongoConnection.disconnect()
  })

  afterEach(async () => {
    await MongoConnection.clearCollection('users')
  })

  it('Should created a new user', async () => {
    const sut = new UserRepositoryInfra()
    const userAdded = await sut.createUser({
      name: 'anyName',
      email: 'email@email.com',
      password: 'password',
      createdAt: new Date('01-01-01').toLocaleString('pt-BR'),
      role: '',
      createWithGoogle: false,
      createdByTheCompanyId: undefined
    })
    expect(userAdded).toBeTruthy()
  })

  it('Return true with user exist', async () => {
    const sut = new UserRepositoryInfra()
    const userMock = {
      _id: '64f9304f0f87f700a28984b5',
      name: 'anyName',
      username: 'email@email.com',
      email: 'email@email.com',
      password: 'password',
      createdAt: new Date('01-01-01').toLocaleString('pt-BR'),
      role: '',
      createWithGoogle: false,
      createdByTheCompanyId: undefined
    }
    await sut.createUser(userMock)

    expect(await sut.exists({ username: 'email@email.com', _id: userMock._id })).toBeTruthy()
  })

  it('Return true with authentication with sucessfuly', async () => {
    const sut = new UserRepositoryInfra()
    const userMock = {
      _id: 'anyId',
      name: 'anyName',
      email: 'email@email.com',
      password: 'Password1*',
      createdAt: new Date('01-01-01')
    }
    jest.spyOn(sut, 'findUserByUsernameOrId').mockResolvedValue(userMock)
    expect(await sut.login({ username: 'email@email.com', password: 'Password1*' }))
      .toStrictEqual({
        message: 'Usuário autenticado com sucesso',
        data: userMock
      })
  })

  it('Return message if Usuário não encontrado to authentication', async () => {
    const sut = new UserRepositoryInfra()
    expect(await sut.login({ username: 'emailnotcreated@email.com', password: 'Password1*' })).toStrictEqual({ message: 'Usuário não encontrado' })
  })

  it('Return message if user not found to getUser', async () => {
    const sut = new UserRepositoryInfra()
    expect(await sut.getUser('64f9304f0f87f700a28984b5')).toStrictEqual({ message: 'Usuário não encontrado' })
  })
  it('Return true with authentication with successfully', async () => {
    const sut = new UserRepositoryInfra()
    const userMock = {
      _id: '64f9304f0f87f700a28984b5',
      name: 'anyName',
      email: 'email@email.com',
      password: 'Password1*',
      createdAt: new Date('01-01-01')
    }

    jest.spyOn(sut, 'findUserByUsernameOrId').mockResolvedValue(userMock)
    const result = await sut.getUser(userMock._id)
    expect(result).toStrictEqual({
      data: userMock
    })
  })
})
