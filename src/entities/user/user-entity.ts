interface UserData {
  id?: any
  email: string
  name: string
  password: string
  sessionToken: string
  createdAt: string
}
export class UserEntity {
  email: string
  sessionToken: string
  id: any
  name: string
  password: string
  createdAt: string
  constructor (user: UserData) {
    this.id = user.id
    this.email = user.email
    this.name = user.name
    this.password = user.password
    this.sessionToken = user.sessionToken
    this.createdAt = user.createdAt
    Object.freeze(this)
  }
}
