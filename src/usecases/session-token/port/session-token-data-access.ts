import { type SessionTokenEntity } from '../../../entities/session-token/session-token'

export interface SessionTokenCreate {
  expiresIn: string
  createdByTheCompany: string
  createdAt: string
  token: string
  updatedAt?: string
}
export interface ISessionTokenDataAccess {
  createSessionToken: (sessionData: SessionTokenEntity, user: any) => Promise<string>
  editSessionToken: (existingSessionId: string, updatedSession: SessionTokenCreate) => Promise<any>
}
