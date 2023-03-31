import { type UserData } from './data/user-data'

export class UserEntity {
  public readonly users: UserData
  constructor (users: UserData) {
    this.users = users
    Object.freeze(this)
  }
}
