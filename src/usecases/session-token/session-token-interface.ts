import { type UserEntity } from '../../entities/user/user-entity'
import { type SessionTokenCreate } from './port/session-token-data-access'

export interface ISessionTokenUseCase {
  createSessionToken: (user: UserEntity, remember: boolean) => Promise<string>
  editSessionToken: (existingSessionId: string, updatedSession: SessionTokenCreate) => Promise<any>
}
