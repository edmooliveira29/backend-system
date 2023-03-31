import { type UserData } from '../../../entities/user/data/user-data'

export interface UserAdapter {

  create: (user: UserData) => Promise<string>
}
