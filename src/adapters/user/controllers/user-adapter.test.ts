import { type IUserCreateUseCase } from '../../../usecases/user/port/user-port'
import { type UserHttpRequest } from '../ports/user-http-request'
import { UserController } from './user-adapters'

describe('User Adapter', () => {
  let sut: UserController
  let userHttpRequestMock: UserHttpRequest
  let IUserCreateUseCaseMock: IUserCreateUseCase
  beforeAll(() => {
    IUserCreateUseCaseMock = {
      create: jest.fn(),
      login: jest.fn()

    }
    sut = new UserController(IUserCreateUseCaseMock)
    userHttpRequestMock = {
      body: {
        id: 'anyId',
        name: 'anyName',
        email: 'email@email.com',
        password: 'password',
        token: 'anyToken',
        sessionId: new Date('01-01-01')
      }
    }
  })

  test('Should return status 200 if successfuly', async () => {
    IUserCreateUseCaseMock = {
      create: jest.fn().mockResolvedValue('Successfully created user'),
      login: jest.fn()

    }
    sut = new UserController(IUserCreateUseCaseMock)

    expect(await sut.create(userHttpRequestMock)).toStrictEqual({
      statusCode: 200,
      body: {
        data: {
          id: 'anyId',
          name: 'anyName',
          email: 'email@email.com',
          token: 'anyToken',
          sessionId: new Date('01-01-01')
        },
        message: 'Successfully created user'
      }
    })
  })

  test('Should return statusCode 400 id email is invalid', async () => {
    userHttpRequestMock.body.email = 'emailexample.com'
    IUserCreateUseCaseMock = {
      create: jest.fn().mockResolvedValue('Email is not valid'),
      login: jest.fn()

    }
    sut = new UserController(IUserCreateUseCaseMock)
    const response = await sut.create(userHttpRequestMock)
    expect(response?.statusCode).toEqual(400)
  })

  test('Should return error if name not required', async () => {
    delete userHttpRequestMock.body.name
    expect(await sut.create(userHttpRequestMock)).toStrictEqual({ body: { message: 'Missing param: name.' }, statusCode: 400 })
  })

  test('Should return error if email not required', async () => {
    userHttpRequestMock.body.name = 'name'
    delete userHttpRequestMock.body.email
    expect(await sut.create(userHttpRequestMock)).toStrictEqual({ body: { message: 'Missing param: email.' }, statusCode: 400 })
  })

  test('Should return error if password not required', async () => {
    userHttpRequestMock.body.email = 'email@example.com'
    delete userHttpRequestMock.body.password
    expect(await sut.create(userHttpRequestMock)).toStrictEqual({ body: { message: 'Missing param: password.' }, statusCode: 400 })
  })

  test('Should return error if internal error without message ', async () => {
    IUserCreateUseCaseMock = {
      create: jest.fn().mockImplementationOnce(() => {
        throw new Error('Internal error')
      }),
      login: jest.fn()

    }
    userHttpRequestMock.body.password = 'Password*1'
    sut = new UserController(IUserCreateUseCaseMock)
    expect(await sut.create(userHttpRequestMock)).toStrictEqual({ body: { message: 'Server error: Internal error.' }, statusCode: 500 })
  })

  test('Should return error if internal error without message', async () => {
    IUserCreateUseCaseMock = {
      create: jest.fn().mockImplementationOnce(() => {
        throw new Error('Internal error')
      }),
      login: jest.fn()
    }
    userHttpRequestMock.body.password = 'Password*1'
    sut = new UserController(IUserCreateUseCaseMock)
    expect(await sut.create(userHttpRequestMock)).toStrictEqual({ body: { message: 'Server error: Internal error.' }, statusCode: 500 })
  })

  test('Should return error if any error happen', async () => {
    IUserCreateUseCaseMock = {
      create: jest.fn(),
      login: jest.fn().mockImplementationOnce(() => {
        throw new Error('Internal error')
      })
    }
    sut = new UserController(IUserCreateUseCaseMock)
    expect(await sut.login(userHttpRequestMock)).toStrictEqual({ body: { message: 'Server error: Internal error.' }, statusCode: 500 })
  })

  test('Should return error if not found user', async () => {
    IUserCreateUseCaseMock = {
      create: jest.fn(),
      login: jest.fn().mockResolvedValue({ message: 'User not found' })
    }
    sut = new UserController(IUserCreateUseCaseMock)
    expect(await sut.login(userHttpRequestMock)).toStrictEqual({ body: { message: 'Not Found: User not found.' }, statusCode: 404 })
  })

  test('Should return status 200 if successfully authenticated user.', async () => {
    IUserCreateUseCaseMock = {
      create: jest.fn(),
      login: jest.fn().mockResolvedValue({ message: 'Successfully authenticated user', data: 'data json' })
    }
    sut = new UserController(IUserCreateUseCaseMock)
    expect(await sut.login(userHttpRequestMock))
      .toStrictEqual({
        body: {
          message: 'Successfully authenticated user',
          data: 'data json'
        },
        statusCode: 200
      })
  })

  test('Should return status 400 if password is invalid.', async () => {
    IUserCreateUseCaseMock = {
      create: jest.fn(),
      login: jest.fn().mockResolvedValue({ data: { message: 'Password is invalid', passwordValid: false } })
    }
    sut = new UserController(IUserCreateUseCaseMock)
    expect(await sut.login(userHttpRequestMock)).toStrictEqual({ body: { message: 'Invalid param: Password is invalid.' }, statusCode: 400 })
  })
})
