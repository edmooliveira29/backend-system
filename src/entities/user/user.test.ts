import { UserEntity } from './user'
test('Should return entity of the user', () => {
    const userEntity = new UserEntity('user','password')
    expect(userEntity.name).toStrictEqual('user')
    expect(userEntity.password).toStrictEqual('password')
})
