import { type UserEntity } from '../../../entities/user/user-entity'
import { type UserEdit } from './user-port'

export interface IUserDataAccess {
  createUser: (user: UserEntity) => Promise<string>
  getUser: (objectId: string) => Promise<string>
  login: (user: { email: string, password: string, remember: boolean, loginWithGoogle?: boolean }, sessionToken: string) => Promise<string>
  editUser: (_id: string, user: UserEdit) => Promise<object>
}
