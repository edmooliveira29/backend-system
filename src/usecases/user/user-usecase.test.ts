import { type UserEntity } from '../../entities/user/user-entity'
import { type IUserPort } from './port/user-port'
import { UserUseCase } from './user-usecase'

describe('User Use Case', () => {
  let iPortMock: IUserPort
  beforeAll(() => {
    iPortMock = {
      authenticate: jest.fn(),
      create: jest.fn(),
      update: jest.fn()
    }
  })
  test('Should return message if name was created with success', async () => {
    const userEntityMock: UserEntity = {
      id: 'anyid',
      name: 'username',
      password: 'password',
      email: 'email@exemplo.com',
      expiration: new Date('01-01-01'),
      token: 'token'

    }
    const userUseCaseMock = new UserUseCase(iPortMock)
    expect(await userUseCaseMock.create(userEntityMock)).toEqual('Successfully created user')
  })

  test('Should return message if email is invalid', async () => {
    const userEntityMock: UserEntity = {
      id: 'anyid',
      name: 'username',
      password: 'password',
      email: 'invalidemail@exemplocom',
      expiration: new Date('01-01-01'),
      token: 'token'

    }
    const userUseCaseMock = new UserUseCase(iPortMock)
    expect(await userUseCaseMock.create(userEntityMock)).toEqual('Email is not valid')
  })

})
