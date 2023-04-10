import { MongoHelper } from '../helpers/mongo-helper'
import { UserRepository } from './user-repository'

describe('Mongodb User repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect('mongodb://localhost:27017')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await MongoHelper.clearCollection('users')
  })

  test('should add user', async () => {
    const sut = new UserRepository()
    await sut.create({
      id: 'anyId',
      name: 'anyName',
      email: 'email@email.com',
      password: 'password',
      token: 'anyToken',
      expiration: new Date('01-01-01')
    })
    const user = await sut.findUserByEmail('any_email@mail.com')
    expect(user.name).toEqual('any_name')
  })

  test('when user is added, it should exist', async () => {
    const sut = new UserRepository()
    await sut.create({
      id: 'anyId',
      name: 'anyName',
      email: 'email@email.com',
      password: 'password',
      token: 'anyToken',
      expiration: new Date('01-01-01')
    })
    expect(await sut.exists('any_email@mail.com')).toBeTruthy()
  })

  test('when user is not added, it should not exist', async () => {
    const sut = new UserRepository()
    expect(await sut.exists('any_email@mail.com')).toBeFalsy()
  })
})
