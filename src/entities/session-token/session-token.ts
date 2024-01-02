interface sessionTokenData {
  _id: string
  expiresIn: string
  createdByTheCompany: string
  createdAt: string
  token: string
  updatedAt: string
}
export class SessionTokenEntity {
  _id?: string
  expiresIn: string
  createdByTheCompany: string
  createdAt?: string
  token: string
  updatedAt?: string
  constructor (user: sessionTokenData) {
    this._id = user._id
    this.token = user.token
    this.expiresIn = user.expiresIn
    this.createdByTheCompany = user.createdByTheCompany
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
    Object.freeze(this)
  }
}
