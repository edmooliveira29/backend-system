import { type SessionTokenCreate } from './port/session-token-data-access'

export interface ISessionTokenUseCase {
  createSessionToken: (user: any, remember: boolean) => Promise<any>
  editSessionToken: (existingSessionId: string, updatedSession: SessionTokenCreate) => Promise<any>
}
