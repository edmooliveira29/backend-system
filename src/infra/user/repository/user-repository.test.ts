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
      expiration: new Date('01-01-01')
    })
    expect(userAdded).toEqual('User created successfully')
  })

  test('Should return error if exist user with same email', async () => {
    const sut = new UserRepository()
    const userMock = {
      id: 'anyId',
      name: 'anyName',
      email: 'email@email.com',
      password: 'password',
      token: 'anyToken',
      expiration: new Date('01-01-01')
    }
    await sut.create(userMock)
    const userAdded = await sut.create(userMock)
    expect(userAdded).toStrictEqual(new Error('There is already a user with this email'))
  })

  test('Return true with user exist', async () => {
    const sut = new UserRepository()
    const userMock = {
      id: 'anyId',
      name: 'anyName',
      email: 'email@email.com',
      password: 'password',
      token: 'anyToken',
      expiration: new Date('01-01-01')
    }
    await sut.create(userMock)

    expect(await sut.exists('email@email.com')).toBeTruthy()
  })

  test('Return false with user exist', async () => {
    const sut = new UserRepository()
    const userMock = {
      id: 'anyId',
      name: 'anyName',
      email: 'email@email.com',
      password: 'password',
      token: 'anyToken',
      expiration: new Date('01-01-01')
    }
    await sut.create(userMock)
    expect(await sut.exists('email_whong@email.com')).toBeFalsy()
  })
})
