import { type IUserCreateUseCase } from '../../../usecases/user/port/user-port'
import { type UserHttpRequest } from '../ports/user-http-request'
import { UserController } from './user-adapters'

describe('User Adapter', () => {
  let sut: UserController
  let userHttpRequestMock: UserHttpRequest
  let IUserCreateUseCaseMock: IUserCreateUseCase
  beforeAll(() => {
    IUserCreateUseCaseMock = {
      getUser: jest.fn(),
      createUser: jest.fn(),
      editUser: jest.fn(),
      login: jest.fn(),
      deleteUser: jest.fn()
    }
    sut = new UserController(IUserCreateUseCaseMock)
    userHttpRequestMock = {
      body: {
        _id: 'anyId',
        name: 'anyName',
        email: 'email@email.com',
        password: 'password',
        sessionToken: 'stringToken',
        createdAt: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      }
    }
  })

  test('Should return status 200 if successfuly', async () => {
    IUserCreateUseCaseMock = {
      getUser: jest.fn(),
      createUser: jest.fn().mockResolvedValue({
        message: 'Usuário criado com sucesso',
        data: {
          _id: 'anyId',
          name: 'anyName',
          email: 'email@email.com',
          createdAt: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
        }
      }),
      editUser: jest.fn(),
      login: jest.fn(),
      deleteUser: jest.fn()

    }
    sut = new UserController(IUserCreateUseCaseMock)
    const response = await sut.create(userHttpRequestMock)
    expect(response).toStrictEqual({
      statusCode: 200,
      body: {
        data: {
          _id: 'anyId',
          name: 'anyName',
          email: 'email@email.com',
          createdAt: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
        },
        message: 'Usuário criado com sucesso'
      }
    })
  })

  test('Should return statusCode 400 id email is invalid', async () => {
    userHttpRequestMock.body.email = 'emailexample.com'
    IUserCreateUseCaseMock = {
      getUser: jest.fn(),
      createUser: jest.fn().mockResolvedValue('E-mail não é valido'),
      editUser: jest.fn(),
      login: jest.fn(),
      deleteUser: jest.fn()

    }
    sut = new UserController(IUserCreateUseCaseMock)
    const response = await sut.create(userHttpRequestMock)
    expect(response?.statusCode).toEqual(400)
  })

  test('Should return error if name not required', async () => {
    delete userHttpRequestMock.body.name
    expect(await sut.create(userHttpRequestMock)).toStrictEqual({ body: { message: 'Parâmetro ausente: name.' }, statusCode: 400 })
  })

  test('Should return error if email not required', async () => {
    userHttpRequestMock.body.name = 'name'
    delete userHttpRequestMock.body.email
    expect(await sut.create(userHttpRequestMock)).toStrictEqual({ body: { message: 'Parâmetro ausente: email.' }, statusCode: 400 })
  })

  test('Should return error if password not required', async () => {
    userHttpRequestMock.body.email = 'email@example.com'
    delete userHttpRequestMock.body.password
    expect(await sut.create(userHttpRequestMock)).toStrictEqual({ body: { message: 'Parâmetro ausente: password.' }, statusCode: 400 })
  })

  test('Should return error if internal error without message ', async () => {
    IUserCreateUseCaseMock = {
      getUser: jest.fn(),
      createUser: jest.fn().mockImplementationOnce(() => {
        throw new Error('Internal error')
      }),
      editUser: jest.fn(),
      login: jest.fn(),
      deleteUser: jest.fn()

    }
    userHttpRequestMock.body.password = 'Password*1'
    sut = new UserController(IUserCreateUseCaseMock)
    expect(await sut.create(userHttpRequestMock)).toStrictEqual({ body: { message: 'Erro do servidor: Internal error.' }, statusCode: 500 })
  })

  test('Should return status 500 if internal error occurrer when get user', async () => {
    IUserCreateUseCaseMock = {
      getUser: jest.fn().mockImplementationOnce(() => { throw new Error('Internal error') }),
      createUser: jest.fn(),
      editUser: jest.fn(),
      login: jest.fn(),
      deleteUser: jest.fn()
    }
    sut = new UserController(IUserCreateUseCaseMock)
    expect(await sut.getUser('')).toStrictEqual({ body: { message: 'Erro do servidor: Internal error.' }, statusCode: 500 })
  })

  test('Should return error if internal error without message', async () => {
    IUserCreateUseCaseMock = {
      getUser: jest.fn(),
      createUser: jest.fn().mockImplementationOnce(() => {
        throw new Error('Internal error')
      }),
      editUser: jest.fn(),
      login: jest.fn(),
      deleteUser: jest.fn()
    }
    userHttpRequestMock.body.password = 'Password*1'
    sut = new UserController(IUserCreateUseCaseMock)
    expect(await sut.create(userHttpRequestMock)).toStrictEqual({ body: { message: 'Erro do servidor: Internal error.' }, statusCode: 500 })
  })

  test('Should return error if any error happen', async () => {
    IUserCreateUseCaseMock = {
      getUser: jest.fn(),
      createUser: jest.fn(),
      login: jest.fn().mockImplementationOnce(() => {
        throw new Error('Internal error')
      }),
      editUser: jest.fn(),
      deleteUser: jest.fn()
    }
    sut = new UserController(IUserCreateUseCaseMock)
    expect(await sut.login(userHttpRequestMock)).toStrictEqual({ body: { message: 'Erro do servidor: Internal error.' }, statusCode: 500 })
  })

  test('Should return error if not found user', async () => {
    IUserCreateUseCaseMock = {
      getUser: jest.fn(),
      createUser: jest.fn(),
      editUser: jest.fn(),
      login: jest.fn().mockResolvedValue({ message: 'Usuário não encontrado' }),
      deleteUser: jest.fn()
    }
    sut = new UserController(IUserCreateUseCaseMock)
    expect(await sut.login(userHttpRequestMock)).toStrictEqual({ body: { message: 'Erro: Usuário não encontrado.' }, statusCode: 404 })
  })

  test('Should return status 200 if Usuário autenticado com sucesso.', async () => {
    IUserCreateUseCaseMock = {
      getUser: jest.fn(),
      createUser: jest.fn(),
      editUser: jest.fn(),
      login: jest.fn().mockResolvedValue({ message: 'Usuário autenticado com sucesso', data: 'data json' }),
      deleteUser: jest.fn()
    }
    sut = new UserController(IUserCreateUseCaseMock)
    expect(await sut.login(userHttpRequestMock))
      .toStrictEqual({
        body: {
          message: 'Usuário autenticado com sucesso',
          data: 'data json'
        },
        statusCode: 200
      })
  })

  test('Should return status 400 if password is invalid.', async () => {
    IUserCreateUseCaseMock = {
      getUser: jest.fn(),
      createUser: jest.fn(),
      editUser: jest.fn(),
      login: jest.fn().mockResolvedValue({ data: { message: 'Password is invalid', passwordValid: false } }),
      deleteUser: jest.fn()
    }
    sut = new UserController(IUserCreateUseCaseMock)
    expect(await sut.login(userHttpRequestMock)).toStrictEqual({ body: { message: 'Parâmetro inválido: Password is invalid.' }, statusCode: 400 })
  })
})
