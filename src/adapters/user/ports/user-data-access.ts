import { UserEntity } from "../../../entities/user/user-entity";

export interface IUserDataAccess {
  create: (user: UserEntity) => Promise<string>
}
