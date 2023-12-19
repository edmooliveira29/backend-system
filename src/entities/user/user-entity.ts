interface UserData {
  _id?: any
  email: string
  name: string
  password: string
  role: string
  createdAt: string
  createWithGoogle: boolean
  createdBy: any
  profilePicture: string
  sessionToken?: string
}
export class UserEntity {
  sessionToken?: string
  _id?: any
  email: string
  name: string
  password: string
  role: string
  createdAt: string
  createWithGoogle: boolean
  profilePicture: string
  createdBy: any
  constructor (user: UserData) {
    this._id = user._id
    this.email = user.email
    this.sessionToken = user.sessionToken
    this.name = user.name
    this.password = user.password
    this.role = user.role
    this.createdAt = user.createdAt
    this.createWithGoogle = user.createWithGoogle
    this.createdBy = user.createdBy
    this.profilePicture = user.profilePicture
    Object.freeze(this)
  }
}
