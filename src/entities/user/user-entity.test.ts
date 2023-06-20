import { UserEntity } from './user-entity'

describe('User Entity', () => {
  test('Should return entity of the user', () => {
    const user = {
      id: 'anyid',
      email: 'user@email.com',
      name: 'user',
      password: 'password',
      token: 'anyToken',
      sessionToken: 'stringToken',
      createdAt: new Date('01-01-01').toLocaleString()
    }

    const userEntity = new UserEntity(user)
    expect(userEntity.email).toEqual(user.email)
  })
})
