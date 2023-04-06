import { type IUserCreatePort } from '../../../usecases/user/port/user-port'
import { type UserHttpRequest } from '../ports/http-user-adapter'
import { UserAdapter } from './user-adapters'

describe('User Adapter', () => {
  let sut: UserAdapter
  let userHttpRequestMock: UserHttpRequest
  let iUserCreatePortMock: IUserCreatePort
  beforeAll(() => {
    iUserCreatePortMock = {
      create: jest.fn()
    }
    sut = new UserAdapter(iUserCreatePortMock)
    userHttpRequestMock = {
      body: {
        id: 'anyId',
        name: 'anyName',
        email: 'email@email.com',
        password: 'password',
        token: 'anyToken',
        expiration: new Date('01-01-01')
      }
    }
  })

  test('Should return status 200 if successful', async () => {
    iUserCreatePortMock = {
      create: jest.fn().mockResolvedValue('Successfully created user')
    }
    sut = new UserAdapter(iUserCreatePortMock)

    expect(await sut.create(userHttpRequestMock)).toStrictEqual({
      statusCode: 200,
      body: {
        id: 'anyId',
        name: 'anyName',
        email: 'email@email.com',
        password: 'password',
        token: 'anyToken',
        expiration: new Date('01-01-01')
      }
    })
  })

  test('Should return statusCode 500 id email is invalid', async () => {
    userHttpRequestMock.body.email = 'emailexample.com'
    iUserCreatePortMock = {
      create: jest.fn().mockResolvedValue('Email is not valid ')
    }
    sut = new UserAdapter(iUserCreatePortMock)
    const response = await sut.create(userHttpRequestMock)
    expect(response?.statusCode).toEqual(500)
  })

  test('Should return error if name not required', async () => {
    delete userHttpRequestMock.body.name
    expect(await sut.create(userHttpRequestMock)).toStrictEqual({ body: 'Missing param: name', statusCode: 400 })
  })

  test('Should return error if email not required', async () => {
    userHttpRequestMock.body.name = 'name'
    delete userHttpRequestMock.body.email
    expect(await sut.create(userHttpRequestMock)).toStrictEqual({ body: 'Missing param: email', statusCode: 400 })
  })

  test('Should return error if password not required', async () => {
    userHttpRequestMock.body.email = 'email@example.com'
    delete userHttpRequestMock.body.password
    expect(await sut.create(userHttpRequestMock)).toStrictEqual({ body: 'Missing param: password', statusCode: 400 })
  })
})
