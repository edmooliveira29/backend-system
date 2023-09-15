import { SessionTokenEntity } from './session-token'

describe('Session Token Entity', () => {
  test('Should return entity with session token', () => {
    const sessionToken = {
      _id: 'anyid',
      expiresIn: new Date(1).toLocaleString(),
      user_id: 'user',
      createdAt: new Date(-1).toLocaleString()
    }

    const sessionTokenEntity = new SessionTokenEntity(sessionToken)
    expect(sessionTokenEntity).toEqual(sessionToken)
  })
})
