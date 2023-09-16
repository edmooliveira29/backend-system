import { type SessionTokenEntity } from '../../../entities/session-token/session-token'
import { type SessionTokenCreate } from './session-token-data-access'

export interface ISessionTokenUseCase {
  createSessionToken: (session: SessionTokenEntity) => Promise<any>
  editSessionToken: (existingSessionId: string, updatedSession: SessionTokenCreate) => Promise<any>
}
