import { type UserEntity } from '../../../entities/user/user-entity'
import { type IUserPort } from './user-port'
describe('User Port Interface', () => {
  let user: UserEntity
  let userPortMock: IUserPort

  beforeAll(() => {
    user = {
      id: 'anyId',
      email: 'user@email.com',
      name: 'user',
      password: 'password',
      token: 'anyToken',
      expiration: new Date('01-01-01')

    }

    userPortMock = {
      authenticate: jest.fn().mockResolvedValue('Successfully authenticated user'),
      create: jest.fn().mockResolvedValue('Successfully registered user'),
      update: jest.fn().mockResolvedValue('User updated successfully')
    }
  })
  test('Should return the message authenticated user with sucess', async () => {
    expect(await userPortMock.authenticate(user)).toEqual('Successfully authenticated user')
  })

  test('Should return the message user created with success', async () => {
    expect(await userPortMock.create(user)).toEqual('Successfully registered user')
  })

  test('Should return the message user created with success', async () => {
    expect(await userPortMock.update(user)).toEqual('User updated successfully')
  })
})
