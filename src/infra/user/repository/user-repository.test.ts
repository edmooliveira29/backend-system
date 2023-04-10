import { MongoConnection } from '../../helpers/mongo-helper'
import { UserRepository } from './user-repository'

describe('Mongodb User repository', () => {
  beforeAll(async () => {
    await MongoConnection.connect('mongodb://localhost:27017')
  })

  afterAll(async () => {
    await MongoConnection.disconnect()
  })

  beforeAll(async () => {
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

    const userAdded = await sut.create({
      id: 'anyId',
      name: 'anyName',
      email: 'email@email.com',
      password: 'password',
      token: 'anyToken',
      expiration: new Date('01-01-01')
    })
    expect(userAdded).toStrictEqual(new Error('There is already a user with this email'))
  })

  // test('when user is not added, it should not exist', async () => {
  //   const sut = new UserRepository()
  //   expect(await sut.exists('any_email@mail.com')).toBeFalsy()
  // })
})
