import { type UserData } from '../../../entities/user/data/user-data'
import { type UserAdapter } from './user-adapter'

describe('Test user uses Cases', () => {
  test('Should return user Adapter', () => {
    const user: UserData = { name: 'user', email: 'email@email.com', password: 'password' }
    const userInterfaceMock: UserAdapter = {
      create: jest.fn().mockReturnValue('User created with success')
    }

    expect(userInterfaceMock.create(user)).toEqual('User created with success')
  })
})
