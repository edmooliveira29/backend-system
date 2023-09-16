import { UserEntity } from './user-entity'

describe('User Entity', () => {
  test('Should return entity of the user', () => {
    const user = {
      _id: 'anyid',
      email: 'user@email.com',
      name: 'user',
      password: 'password',
      createdAt: new Date('01-01-01').toLocaleString('pt-BR')
    }

    const userEntity = new UserEntity(user)
    expect(userEntity.email).toEqual(user.email)
  })
})
