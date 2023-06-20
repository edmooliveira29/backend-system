import { type UserEntity } from '../../../entities/user/user-entity'
import { type IUserCreateUseCase } from './user-port'
describe('User Port Interface', () => {
  let user: UserEntity
  let userPortMock: IUserCreateUseCase

  beforeAll(() => {
    user = {
      id: 'anyId',
      email: 'user@email.com',
      name: 'user',
      password: 'password',
      sessionToken: 'stringToken',
      createdAt: new Date('01-01-01').toLocaleString()

    }

    userPortMock = {
      create: jest.fn().mockResolvedValue('Usuário criado com sucesso'),
      login: jest.fn()

    }
  })

  test('Should return the message user created with success', async () => {
    expect(await userPortMock.create(user)).toEqual('Usuário criado com sucesso')
  })
})
