import jwt from 'jsonwebtoken'

interface User {
  _id: number
  name: string
  email: string
}

export const createSessionToken = (user: User): string => {
  const expirationTime = Math.floor(Date.now() / 1000) + 604800 // 7 dias em segundos
  const token = jwt.sign(
    {
      name: user.name,
      email: user.email,
      id: user._id,
      exp: expirationTime
    },
    String(process.env.KEY_SECRET_TOKEN)
  )

  return token
}
