import { type UserData } from './user-data'

test('Should return user data', () => {
  const user: UserData = {
    email: 'user@email.com',
    name: 'user',
    password: 'password',
    token: 'anyToken',
    expiration: new Date('01-01-01')
  }
  expect(user).toEqual({
    email: 'user@email.com',
    name: 'user',
    password: 'password',
    token: 'anyToken',
    expiration: new Date('01-01-01')
  })
})
