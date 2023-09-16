import { SessionToken } from '../validation/session-token'
import { type ISessionTokenUseCase } from './port/session-token-port'
import { type SessionTokenCreate, type ISessionTokenDataAccess } from './port/session-token-data-access'
import { type SessionTokenEntity } from '../../entities/session-token/session-token'

export class SessionTokenUseCase implements ISessionTokenDataAccess {
  public readonly portRepository: ISessionTokenUseCase
  public readonly sessionToken = new SessionToken()
  constructor (iSessionTokenUseCase: ISessionTokenUseCase) {
    this.portRepository = iSessionTokenUseCase
  }

  async createSessionToken (user: any, remember: boolean): Promise<any> {
    const sessionToken = this.sessionToken.create(user, remember)
    console.log(user)
    const session: SessionTokenEntity = {
      createdAt: new Date().toLocaleString('pt-BR'),
      expiresIn: new Date(sessionToken.expirationTime * 1000).toLocaleString('pt-BR'),
      token: sessionToken.token,
      userId: user.data._id
    }
    const userResponse = await this.portRepository.createSessionToken(session)
    if (!userResponse.data) {
      return { message: 'Usuário não encontrado' }
    }

    return {
      message: 'Sessão criada com sucesso',
      data: {
        token: session.token
      }
    }
  }

  async editSessionToken (existingSessionId: string, updatedSession: SessionTokenCreate): Promise<any> {
    const userResponse = (await this.portRepository.editSessionToken(existingSessionId, updatedSession))
    return {
      message: 'Sessão editada com sucesso',
      data: {
        token: userResponse.data.token
      }
    }
  }
}
