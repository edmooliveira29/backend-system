interface sessionTokenData {
  _id: string
  expiresIn: string
  createdByTheCompanyId: string
  createdAt: string
  token: string
  updatedAt: string
}
export class SessionTokenEntity {
  _id?: string
  expiresIn: string
  createdByTheCompanyId: string
  createdAt?: string
  token: string
  updatedAt?: string
  constructor (user: sessionTokenData) {
    this._id = user._id
    this.token = user.token
    this.expiresIn = user.expiresIn
    this.createdByTheCompanyId = user.createdByTheCompanyId
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
    Object.freeze(this)
  }
}
