import { type IUserCreateUseCase } from '../../../usecases/user/port/user-port'
import { type UserHttpRequest } from '../ports/user-http-request'
import { UserController } from './user-adapters'

describe('User Adapter', () => {
  let sut: UserController
  let userHttpRequestMock: UserHttpRequest
  let IUserCreateUseCaseMock: IUserCreateUseCase
  beforeAll(() => {
    IUserCreateUseCaseMock = {
      create: jest.fn()
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

  test('Should return status 200 if successful', async () => {
    IUserCreateUseCaseMock = {
      create: jest.fn().mockResolvedValue('Successfully created user')
    }
    sut = new UserController(IUserCreateUseCaseMock)

    expect(await sut.create(userHttpRequestMock)).toStrictEqual({
      statusCode: 200,
      body: {
        id: 'anyId',
        name: 'anyName',
        email: 'email@email.com',
        password: 'password',
        token: 'anyToken',
        sessionId: new Date('01-01-01')
      }
    })
  })

  test('Should return statusCode 400 id email is invalid', async () => {
    userHttpRequestMock.body.email = 'emailexample.com'
    IUserCreateUseCaseMock = {
      create: jest.fn().mockResolvedValue('Email is not valid')
    }
    sut = new UserController(IUserCreateUseCaseMock)
    const response = await sut.create(userHttpRequestMock)
    expect(response?.statusCode).toEqual(400)
  })

  test('Should return error if name not required', async () => {
    delete userHttpRequestMock.body.name
    expect(await sut.create(userHttpRequestMock)).toStrictEqual({ body: 'Missing param: name.', statusCode: 400 })
  })

  test('Should return error if email not required', async () => {
    userHttpRequestMock.body.name = 'name'
    delete userHttpRequestMock.body.email
    expect(await sut.create(userHttpRequestMock)).toStrictEqual({ body: 'Missing param: email.', statusCode: 400 })
  })

  test('Should return error if password not required', async () => {
    userHttpRequestMock.body.email = 'email@example.com'
    delete userHttpRequestMock.body.password
    expect(await sut.create(userHttpRequestMock)).toStrictEqual({ body: 'Missing param: password.', statusCode: 400 })
  })

  test('Should return error if internal error without message ', async () => {
    IUserCreateUseCaseMock = {
      create: jest.fn().mockImplementationOnce(() => {
        throw new Error('Internal error')
      })
    }
    userHttpRequestMock.body.password = 'Password*1'
    sut = new UserController(IUserCreateUseCaseMock)
    expect(await sut.create(userHttpRequestMock)).toStrictEqual({ body: { message: 'Server error: Internal error.' }, statusCode: 500 })
  })

  test('Should return error if internal error without message', async () => {
    IUserCreateUseCaseMock = {
      create: jest.fn().mockImplementationOnce(() => {
        throw new Error('Internal error')
      })
    }
    userHttpRequestMock.body.password = 'Password*1'
    sut = new UserController(IUserCreateUseCaseMock)
    expect(await sut.create(userHttpRequestMock)).toStrictEqual({ body: { message: 'Server error: Internal error.' }, statusCode: 500 })
  })
})
