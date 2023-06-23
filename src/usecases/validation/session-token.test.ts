import jwt from 'jsonwebtoken'
import { createSessionToken } from './session-token'

// Mock do valor de process.env.KEY_SECRET_TOKEN
process.env.KEY_SECRET_TOKEN = 'your-secret-key'

// Exemplo de caso de teste
describe('createSessionToken', () => {
  it('should create a session token with the correct payload and expiration time', () => {
    const user = {
      id: 1,
      name: 'Test User',
      email: 'email@example.com'
    }

    const expectedToken = jwt.sign(
      {
        name: user.name,
        email: user.email,
        id: user.id,
        exp: Math.floor(Date.now() / 1000) + 604800
      },
      String(process.env.KEY_SECRET_TOKEN)
    )

    const token = createSessionToken(user)
    expect(token).toBe(expectedToken)
  })
})
