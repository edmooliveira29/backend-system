import { SessionTokenEntity } from './session-token'

describe('Session Token Entity', () => {
  test('Should return entity with session token', () => {
    const sessionToken = {
      _id: 'anyid',
      expiresIn: new Date(1).toLocaleString('pt-BR'),
      createdByTheCompany: 'user',
      createdAt: new Date(-1).toLocaleString('pt-BR'),
      token: 'stringToken',
      updatedAt: 'null'
    }

    const sessionTokenEntity = new SessionTokenEntity(sessionToken)
    expect(sessionTokenEntity).toEqual(sessionToken)
  })
})
