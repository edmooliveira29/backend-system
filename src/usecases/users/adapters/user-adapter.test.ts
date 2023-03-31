import { type UserData } from '../../../entities/user/data/user-data'
import { type UserAdapter } from './user-adapter'

test('Should return user data', () => {
  const user: UserData = { name: 'user', email: 'email@email.com', password: 'password' }
  const userInterfaceMock: UserAdapter = {
    create: jest.fn().mockReturnValue('User created with success')
  }

  expect(userInterfaceMock.create(user)).toEqual('User created with success')
})
