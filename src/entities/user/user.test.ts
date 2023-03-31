import { type UserData } from './data/use-data'
import { UserEntity } from './user'
test('Should return entity of the user', () => {
  const users: UserData = { email: 'user@email.com', name: 'user', password: 'password' }
  const userEntity = new UserEntity(users)
  expect(userEntity.users).toEqual(users)
})
