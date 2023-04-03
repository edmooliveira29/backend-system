import { type UserData } from './data/user-data'

export class UserEntity {
  constructor (public readonly user: UserData) { Object.freeze(this) }
}
