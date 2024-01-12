import { type UserData, UserEntity } from './user-entity'

describe('User Entity', () => {
  it('Should return entity of the user', () => {
    const user: UserData = {
      _id: 'anyid',
      email: 'user@email.com',
      name: 'user',
      password: 'password',
      createdAt: new Date('01-01-01').toLocaleString('pt-BR'),
      role: 'admin',
      createWithGoogle: false,
      createdByTheCompanyId: 'createdByTheCompanyId',
      profilePicture: 'profilePicture',
      sessionToken: 'sessionToken',
      username: 'username'
    }

    const userEntity = new UserEntity(user)
    expect(userEntity.email).toEqual(user.email)
  })
})
