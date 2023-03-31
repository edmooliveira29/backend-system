import { type UserData } from './use-data'

test('Should return user data', () => {
  const state: UserData = { name: 'user', email: 'email@email.com', password: 'password' }
  expect(state).toEqual({ email: 'email@email.com', name: 'user', password: 'password' })
})
