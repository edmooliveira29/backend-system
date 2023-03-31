import { type UserData } from './data/user-data'
import { UserEntity } from './user-entity'
test('Should return entity of the user', () => {
  const users: UserData = { email: 'user@email.com', name: 'user', password: 'password' }
  const userEntity = new UserEntity(users)
  expect(userEntity.users).toEqual(users)
})
