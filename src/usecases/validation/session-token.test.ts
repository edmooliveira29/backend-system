import jwt from 'jsonwebtoken'
import { SessionToken } from './session-token'

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mocked-token')
}))

describe('createSessionToken', () => {
  let sessionToken = new SessionToken()

  beforeEach(() => {
    sessionToken = new SessionToken()
  })
  it('should create a session token with remember option', () => {
    const user = {
      _id: 'anyId',
      name: 'John Doe',
      email: 'john@example.com'
    }

    const token = sessionToken.create(user, true)

    expect(jwt.sign).toHaveBeenCalledWith(
      {
        name: user.name,
        email: user.email,
        id: user._id,
        exp: expect.any(Number)
      },
      expect.any(String)
    )
    expect(token).toBe('mocked-token')
  })

  it('should create a session token without remember option', () => {
    const user = {
      _id: 'anyId',
      name: 'John Doe',
      email: 'john@example.com'
    }

    const token = sessionToken.create(user, false)

    expect(jwt.sign).toHaveBeenCalledWith(
      {
        name: user.name,
        email: user.email,
        id: user._id,
        exp: expect.any(Number)
      },
      expect.any(String)
    )
    expect(token).toBe('mocked-token')
  })
})
