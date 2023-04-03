
import { type UserEntity } from '../../../entities/user/user-entity'

export interface IUserPort {
  authenticate: (user: UserEntity) => Promise<string>
  create: (user: UserEntity) => Promise<string>
  update: (user: UserEntity) => Promise<string>
}
