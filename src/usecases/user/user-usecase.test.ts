import { type UserEntity } from '../../entities/user/user-entity'
import { type IUserCreateUseCase } from './port/user-port'
import { UserUseCase } from './user-usecase'

describe('User Use Case', () => {
  let iPortMock: IUserCreateUseCase
  let userEntityMock: UserEntity
  let userUseCaseMock: UserUseCase
  beforeAll(() => {
    userEntityMock = {
      id: 'anyid',
      name: 'username',
      password: 'password',
      email: 'invalidemail@exemplo.com',
      sessionToken: new Date('01-01-01'),
      token: 'token'
    }

    iPortMock = {
      create: jest.fn()
    }

    userUseCaseMock = new UserUseCase(iPortMock)
  })
  test('Should return message if name was created with success', async () => {
    expect(await userUseCaseMock.create(userEntityMock)).toEqual('Successfully created user')
  })

  test('Should return message if email is invalid', async () => {
    userEntityMock.email = 'invalidemail@exemplocom'
    expect(await userUseCaseMock.create(userEntityMock)).toEqual('Email is not valid')
  })

  test('Should return message if name is invalid', async () => {
    userEntityMock.email = 'invalidemail@exemplo.com'
    userEntityMock.name = 'a'

    expect(await userUseCaseMock.create(userEntityMock)).toEqual('Name is not valid')
  })
})
