import { type UserEntity } from '../../entities/user/user-entity'

export interface ISessionTokenUseCase {
  createSessionToken: (user: UserEntity, remember: boolean) => Promise<string>
  editSessionToken: (existingSessionId: string, updatedSession: SessionTokenCreate) => Promise<any>
}
