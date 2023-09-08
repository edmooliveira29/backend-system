interface UserData {
  _id?: any
  email: string
  name: string
  password: string
  sessionToken: string
  createdAt: string
}
export class UserEntity {
  email: string
  sessionToken: string
  _id: any
  name: string
  password: string
  createdAt: string
  constructor (user: UserData) {
    this._id = user._id
    this.email = user.email
    this.name = user.name
    this.password = user.password
    this.sessionToken = user.sessionToken
    this.createdAt = user.createdAt
    Object.freeze(this)
  }
}
