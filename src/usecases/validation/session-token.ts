import jwt from 'jsonwebtoken'

interface User {
  _id?: string
  name?: string
  email?: string
}

export class SessionToken {
  create (user: User, remember: boolean): any {
    const now = new Date()
    let expirationTime
    const daysExpiration = 7
    if (remember) {
      expirationTime = Math.floor(Date.now() / 1000) + daysExpiration * 24 * 60 * 60
    } else {
      expirationTime = Math.floor(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 0, 0).getTime() / 1000)
    }
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        _id: user._id,
        exp: expirationTime
      },
      String(process.env.KEY_SECRET_TOKEN)
    )
    return { token, expirationTime }
  }
}
