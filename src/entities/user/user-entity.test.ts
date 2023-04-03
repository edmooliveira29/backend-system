import { type UserData } from './data/user-data'
import { UserEntity } from './user-entity'
test('Should return entity of the user', () => {
  const user: UserData = {
    email: 'user@email.com',
    name: 'user',
    password: 'password',
    token: 'anyToken',
    expiration: new Date('01-01-01')
  }
  const userEntity = new UserEntity(user)
  expect(userEntity.user).toEqual(user)
})
