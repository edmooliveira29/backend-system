
import { type UserEntity } from '../../../entities/user/user-entity'

export interface IUserCreatePort {
  create: (user: UserEntity) => Promise<string>
}
