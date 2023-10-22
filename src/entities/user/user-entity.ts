interface UserData {
  _id?: any
  email: string
  name: string
  password: string
  createdAt: string
  createWithGoogle: boolean
  companyId: any
  createdBy: any
  profilePicture: string
}
export class UserEntity {
  _id?: any
  email: string
  name: string
  password: string
  createdAt: string
  createWithGoogle: boolean
  profilePicture: string
  companyId: any
  createdBy: any
  constructor (user: UserData) {
    this._id = user._id
    this.email = user.email
    this.name = user.name
    this.password = user.password
    this.createdAt = user.createdAt
    this.createWithGoogle = user.createWithGoogle
    this.companyId = user.companyId
    this.createdBy = user.createdBy
    this.profilePicture = user.profilePicture
    Object.freeze(this)
  }
}
