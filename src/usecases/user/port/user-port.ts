
import { type UserEntity } from '../../../entities/user/user-entity'

export interface IUserPort {
  create: (user: UserEntity) => Promise<string>
}
