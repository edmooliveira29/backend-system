import { type UserEntity } from '../../../entities/user/user-entity'
import { type IUserCreatePort } from './user-port'
describe('User Port Interface', () => {
  let user: UserEntity
  let userPortMock: IUserCreatePort

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
      create: jest.fn().mockResolvedValue('Successfully created user')
    }
  })

  test('Should return the message user created with success', async () => {
    expect(await userPortMock.create(user)).toEqual('Successfully created user')
  })
})
