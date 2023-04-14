/* eslint-disable @typescript-eslint/no-floating-promises */
import { MongoConnection } from '../../helpers/mongo-helper'
import { UserRepository } from './user-repository'

describe('Mongodb User repository', () => {
  beforeAll(async () => {
    await MongoConnection.connect('mongodb://localhost:27017')
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
      sessionId: new Date('01-01-01')
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
      sessionId: new Date('01-01-01')
    }
    await sut.create(userMock)
    expect(async () => await sut.create(userMock)).rejects.toStrictEqual(new Error('There is already a user with this email'))
  })

  test('Return true with user exist', async () => {
    const sut = new UserRepository()
    const userMock = {
      id: 'anyId',
      name: 'anyName',
      email: 'email@email.com',
      password: 'password',
      token: 'anyToken',
      sessionId: new Date('01-01-01')
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
      sessionId: new Date('01-01-01')
    }
    const userFound = await sut.create(userMock)

    expect(await sut.login({ email: 'email@email.com', password: 'Password1*' }))
      .toBe({
        message: 'User authenticated successfully',
        data: userFound
      })
  })

  test('Return message if user not found to authentication', async () => {
    const sut = new UserRepository()
    expect(await sut.login({ email: 'email@email.com', password: 'Password1*' })).toBe({ message: 'User not found' })
  })
})
