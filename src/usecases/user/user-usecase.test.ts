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
      password: 'Password*1',
      email: 'invalidemail@exemplo.com',
      sessionToken: new Date('01-01-01'),
      token: 'token',
      createdAt: new Date('01-01-01').toISOString()
    }

    iPortMock = {
      create: jest.fn(),
      login: jest.fn()
    }

    userUseCaseMock = new UserUseCase(iPortMock)
  })
  test('Should return message if name was created with success', async () => {
    expect(await userUseCaseMock.create(userEntityMock)).toEqual('Usuário criado com sucesso')
  })

  test('Should return message if email is invalid', async () => {
    userEntityMock.email = 'invalidemail@exemplocom'
    expect(await userUseCaseMock.create(userEntityMock)).toEqual('E-mail não é valido')
  })

  test('Should return message if name is invalid', async () => {
    userEntityMock.name = 'na'
    userEntityMock.email = 'valid@exemplo.com'

    expect(await userUseCaseMock.create(userEntityMock)).toEqual('Nome não é valido')
  })

  test('Should return message if name is invalid', async () => {
    userEntityMock.password = 'Password*'

    expect(await userUseCaseMock.create(userEntityMock)).toEqual('A senha deve conter pelo menos 1 dígito')
  })

  test('Should return message if user is valid to authentication', async () => {
    iPortMock = {
      create: jest.fn(),
      login: jest.fn().mockReturnValue({ data: userEntityMock })
    }
    userUseCaseMock = new UserUseCase(iPortMock)
    expect(await userUseCaseMock.login(userEntityMock))
      .toEqual({ data: userEntityMock, message: 'Usuário autenticado com sucesso' })
  })

  test('Should return message if user is not valid to authentication', async () => {
    iPortMock = {
      create: jest.fn(),
      login: jest.fn().mockReturnValue({ message: 'Usuário não encontrado' })
    }
    userUseCaseMock = new UserUseCase(iPortMock)

    expect(await userUseCaseMock.login(userEntityMock)).toEqual({ message: 'Usuário não encontrado' })
  })

  test('Should return error message if password is invalid on authentication', async () => {
    userEntityMock.password = 'Password*'
    iPortMock = {
      create: jest.fn(),
      login: jest.fn().mockReturnValue({ data: userEntityMock })
    }
    userUseCaseMock = new UserUseCase(iPortMock)
    expect(await userUseCaseMock.login({ password: 'Password*1', email: userEntityMock.email }))
      .toEqual({ data: { passwordValid: false, message: 'Senha inválida. Tente novamente' } })
  })
})
