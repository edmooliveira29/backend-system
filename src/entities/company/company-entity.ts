interface CompanyData {
  _id?: any
  email: string
  name: string
  password: string
  createdAt: string
  createWithGoogle: boolean
}
export class CompanyEntity {
  email: string
  _id: any
  name: string
  password: string
  createdAt: string
  createWithGoogle: boolean

  constructor (user: CompanyData) {
    this._id = user._id
    this.email = user.email
    this.name = user.name
    this.password = user.password
    this.createdAt = user.createdAt
    this.createWithGoogle = user.createWithGoogle
    Object.freeze(this)
  }
}
