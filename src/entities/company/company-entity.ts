interface CompanyData {
  _id?: any
  email: string
  name: string
  password: string
  role: string
  createdAt: string
  createWithGoogle: boolean
  profilePicture: string
}

export class CompanyEntity {
  email: string
  _id: any
  name: string
  password: string
  role: string
  createdAt: string
  createWithGoogle: boolean
  profilePicture: string
  constructor (user: CompanyData) {
    this._id = user._id
    this.email = user.email
    this.name = user.name
    this.password = user.password
    this.role = user.role
    this.createdAt = user.createdAt
    this.createWithGoogle = user.createWithGoogle
    this.profilePicture = user.profilePicture
    Object.freeze(this)
  }
}
