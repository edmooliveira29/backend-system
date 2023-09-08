import { type UserEntity } from '../../entities/user/user-entity'
import { SessionToken } from '../validation/session-token'
import { type IUserCreateUseCase } from './port/user-port'
import { UserUseCase } from './user-usecase'

describe('User Use Case', () => {
  let iPortMock: IUserCreateUseCase
  let userEntityCreateMock: UserEntity
  let userEntityLoginMock: any
  let userUseCaseMock: UserUseCase
  beforeAll(() => {
    userEntityCreateMock = {
      id: 'anyid',
      name: 'username',
      password: 'Password*1',
      email: 'invalidemail@exemplo.com',
      sessionToken: 'stringToken',
      createdAt: new Date('01-01-01').toISOString()
    }

    userEntityLoginMock = {
      password: 'Password*1',
      email: 'invalidemail@exemplo.com',
      remember: false
    }

    iPortMock = {
      getUser: jest.fn(),
      create: jest.fn().mockReturnValue({ data: { ...userEntityCreateMock }, message: 'Usuário criado com sucesso' }),
      login: jest.fn()
    }
    userUseCaseMock = new UserUseCase(iPortMock)
  })

  test('Should return message if name was created with success', async () => {
    const response = await userUseCaseMock.create(userEntityCreateMock)
    expect(response.message).toEqual('Usuário criado com sucesso')
  })

  test('Should return message if email is invalid', async () => {
    userEntityCreateMock.email = 'invalidemail@exemplocom'
    const response = await userUseCaseMock.create(userEntityCreateMock)
    expect(response.message).toEqual('E-mail não é valido')
  })

  test('Should return message if name is invalid', async () => {
    userEntityCreateMock.name = 'na'
    userEntityCreateMock.email = 'valid@exemplo.com'
    const response = await userUseCaseMock.create(userEntityCreateMock)
    expect(response.message).toEqual('Nome não é valido')
  })

  test('Should return message if name is invalid', async () => {
    userEntityCreateMock.password = 'Password*'
    const response = await userUseCaseMock.create(userEntityCreateMock)
    expect(response).toEqual('A senha deve conter pelo menos 1 dígito')
  })

  test('Should return message if user is valid to authentication', async () => {
    const user = {
      createdAt: new Date('01-01-01').toISOString(),
      email: 'valid@exemplo.com',
      _id: 'userId',
      name: 'anyname',
      password: 'Password*1'
    }
    iPortMock = {
      getUser: jest.fn(),
      create: jest.fn(),
      login: jest.fn().mockReturnValue({
        data: user,
        message: 'Usuário autenticado com sucesso'
      })
    }

    userUseCaseMock = new UserUseCase(iPortMock)
    jest.spyOn(SessionToken.prototype, 'create').mockReturnValue('sessionToken')
    expect(await userUseCaseMock.login({
      password: 'Password*1',
      email: 'valid@exemplo.com',
      remember: false
    }))
      .toEqual({
        data: {
          createdAt: new Date().toLocaleString(),
          email: 'valid@exemplo.com',
          id: 'userId',
          name: 'anyname',
          sessionToken: 'sessionToken'
        },
        message: 'Usuário autenticado com sucesso'
      })
  })

  test('Should return message if user is not valid to authentication', async () => {
    iPortMock = {
      getUser: jest.fn(),
      create: jest.fn(),
      login: jest.fn().mockReturnValue({ message: 'Usuário não encontrado' })
    }
    userUseCaseMock = new UserUseCase(iPortMock)

    expect(await userUseCaseMock.login(userEntityLoginMock)).toEqual({ message: 'Usuário não encontrado' })
  })

  test('Should return error message if password is invalid on authentication', async () => {
    userEntityLoginMock.password = 'Password*'
    iPortMock = {
      getUser: jest.fn(),
      create: jest.fn(),
      login: jest.fn().mockReturnValue({ data: userEntityLoginMock })
    }
    userUseCaseMock = new UserUseCase(iPortMock)
    expect(await userUseCaseMock.login({ password: 'Password*1', email: userEntityLoginMock.email, remember: false }))
      .toEqual({ data: { passwordValid: false, message: 'Senha inválida. Tente novamente' } })
  })

  test('Should return message if user is not valid to authentication', async () => {
    iPortMock = {
      create: jest.fn(),
      getUser: jest.fn(),
      login: jest.fn()
    }
    userUseCaseMock = new UserUseCase(iPortMock)

    expect(await userUseCaseMock.getUser('64f9304f0f87f700a28984b5')).toEqual({ message: 'Usuário não encontrado' })
  })
})
