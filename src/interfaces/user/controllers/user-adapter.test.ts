import { type IUserCreateUseCase } from '../../../usecases/user/port/user-port'
import { formatNowDate } from '../../../utils/data'
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
      deleteUser: jest.fn(),
      getAllUser: jest.fn()
    }
    sut = new UserController(IUserCreateUseCaseMock)
    userHttpRequestMock = {
      body: {
        _id: 'anyId',
        name: 'anyName',
        email: 'email@email.com',
        password: 'password',
        sessionToken: 'stringToken',
        createdAt: formatNowDate()
      }
    }
  })

  it('Should return status 200 if successfuly', async () => {
    IUserCreateUseCaseMock = {
      getAllUser: jest.fn(),
      getUser: jest.fn(),
      createUser: jest.fn().mockResolvedValue({
        message: 'Usuário criado com sucesso',
        data: {
          _id: 'anyId',
          name: 'anyName',
          email: 'email@email.com',
          createdAt: formatNowDate()
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
          createdAt: formatNowDate()
        },
        message: 'Usuário criado com sucesso'
      }
    })
  })

  it('Should return statusCode 400 id email is invalid', async () => {
    userHttpRequestMock.body.email = 'emailexample.com'
    IUserCreateUseCaseMock = {
      getAllUser: jest.fn(),
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

  it('Should return error if name not required', async () => {
    delete userHttpRequestMock.body.name
    expect(await sut.create(userHttpRequestMock)).toStrictEqual({ body: { message: 'Parâmetro ausente: name.' }, statusCode: 400 })
  })

  it('Should return error if email not required', async () => {
    userHttpRequestMock.body.name = 'name'
    delete userHttpRequestMock.body.email
    expect(await sut.create(userHttpRequestMock)).toStrictEqual({ body: { message: 'Parâmetro ausente: email.' }, statusCode: 400 })
  })

  it('Should return error if internal error without message ', async () => {
    IUserCreateUseCaseMock = {
      getAllUser: jest.fn(),
      getUser: jest.fn(),
      createUser: jest.fn().mockImplementationOnce(() => {
        throw new Error('Internal error')
      }),
      editUser: jest.fn(),
      login: jest.fn(),
      deleteUser: jest.fn()

    }
    userHttpRequestMock.body.email = 'email@email.com'
    userHttpRequestMock.body.password = 'Password*1'
    sut = new UserController(IUserCreateUseCaseMock)
    expect(await sut.create(userHttpRequestMock)).toStrictEqual({ body: { message: 'Erro do servidor: Internal error.' }, statusCode: 500 })
  })

  it('Should return status 500 if internal error occurrer when get user', async () => {
    IUserCreateUseCaseMock = {
      getUser: jest.fn(),
      getAllUser: jest.fn().mockImplementationOnce(() => { throw new Error('Internal error') }),
      createUser: jest.fn(),
      editUser: jest.fn(),
      login: jest.fn(),
      deleteUser: jest.fn()
    }
    sut = new UserController(IUserCreateUseCaseMock)
    expect(await sut.getAllUser('')).toStrictEqual({ body: { message: 'Erro do servidor: Internal error.' }, statusCode: 500 })
  })

  it('Should return error if internal error without message', async () => {
    IUserCreateUseCaseMock = {
      getAllUser: jest.fn(),
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

  it('Should return error if any error happen', async () => {
    IUserCreateUseCaseMock = {
      getAllUser: jest.fn(),
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

  it('Should return error if not found user', async () => {
    IUserCreateUseCaseMock = {
      getAllUser: jest.fn(),
      getUser: jest.fn(),
      createUser: jest.fn(),
      editUser: jest.fn(),
      login: jest.fn().mockResolvedValue({ message: 'Usuário não encontrado' }),
      deleteUser: jest.fn()
    }
    sut = new UserController(IUserCreateUseCaseMock)
    expect(await sut.login(userHttpRequestMock)).toStrictEqual({ body: { message: 'Erro: Usuário não encontrado.' }, statusCode: 404 })
  })

  it('Should return status 200 if Usuário autenticado com sucesso.', async () => {
    IUserCreateUseCaseMock = {
      getAllUser: jest.fn(),
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

  it('Should return status 400 if password is invalid.', async () => {
    IUserCreateUseCaseMock = {
      getAllUser: jest.fn(),
      getUser: jest.fn(),
      createUser: jest.fn(),
      editUser: jest.fn(),
      login: jest.fn().mockResolvedValue({ data: { message: 'Password is invalid', passwordValid: false } }),
      deleteUser: jest.fn()
    }
    sut = new UserController(IUserCreateUseCaseMock)
    expect(await sut.login(userHttpRequestMock)).toStrictEqual({ body: { message: 'Password is invalid.' }, statusCode: 400 })
  })
})
