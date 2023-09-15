interface sessionTokenData {
  _id: string
  expiresIn: string
  user_id: string
  createdAt: string
}
export class SessionTokenEntity {
  _id: string
  expiresIn: string
  user_id: string
  createdAt: string
  constructor (user: sessionTokenData) {
    this._id = user._id
    this.expiresIn = user.expiresIn
    this.user_id = user.user_id
    this.createdAt = user.createdAt
    Object.freeze(this)
  }
}
