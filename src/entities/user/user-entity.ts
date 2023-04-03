interface UserData {
  id: string
  email: string
  name: string
  password: string
  token: string
  expiration: Date
}
export class UserEntity {
  id: string
  email: string
  name: string
  password: string
  token: string
  expiration: Date

  constructor (user: UserData) {
    this.id = user.id
    this.email = user.email
    this.name = user.name
    this.password = user.password
    this.token = user.token
    this.expiration = user.expiration
    Object.freeze(this)
  }
}
