import { type UserEntity } from '../../../entities/user/user-entity'

export interface IUserCreateData {
  create: (user: UserEntity) => Promise<string>
}
