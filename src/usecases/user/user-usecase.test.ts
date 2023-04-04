import { type UserEntity } from '../../entities/user/user-entity'
import { type IUserPort } from './port/user-port'
import { UserUseCase } from './user-usecase'

describe('User Use Case', () => {
  test('Should return message if user was authenticated with success', async () => {
    const iPortMock: IUserPort = {
      authenticate: jest.fn(async () => await Promise.resolve('token')),
      create: jest.fn(async () => await Promise.resolve('token')),
      update: jest.fn(async () => await Promise.resolve('token'))
    }
    const userEntityMock: UserEntity = {
      id: 'anyid',
      name: 'username',
      password: 'password',
      email: 'email@exemplo.com',
      expiration: new Date('01-01-01'),
      token: 'token'

    }
    const userUseCaseMock = new UserUseCase(iPortMock)
    expect(await userUseCaseMock.authenticate(userEntityMock)).toEqual('Successfully authenticated user')
  })

  test('Should return error if  email is invalid', async () => {
    const iPortMock: IUserPort = {
      authenticate: jest.fn(async () => await Promise.resolve('token')),
      create: jest.fn(async () => await Promise.resolve('token')),
      update: jest.fn(async () => await Promise.resolve('token'))
    }
    const userEntityMock: UserEntity = {
      id: 'anyid',
      name: 'username',
      password: 'password',
      email: 'invalidemail@exemplocom',
      expiration: new Date('01-01-01'),
      token: 'token'

    }
    const userUseCaseMock = new UserUseCase(iPortMock)
    expect(await userUseCaseMock.authenticate(userEntityMock)).toEqual('Email is invalid')
  })
})
