interface UserData {
  id?: any
  email: string
  name: string
  password: string
  token: string
  sessionId: Date
}

export class UserEntity {
  email: string
  sessionId: Date
  id: any
  name: string
  password: string
  token: string
  constructor (user: UserData) {
    this.id = user.id
    this.email = user.email
    this.name = user.name
    this.password = user.password
    this.token = user.token
    this.sessionId = user.sessionId
    Object.freeze(this)
  }
}
