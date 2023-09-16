import { type SessionTokenEntity } from '../../entities/session-token/session-token'
import { type ISessionTokenUseCase } from './session-token-interface'
describe('User Port Interface', () => {
  let sessionData: SessionTokenEntity
  let sessionTokenPortMock: ISessionTokenUseCase

  beforeAll(() => {
    sessionData = {
      _id: 'anyid',
      expiresIn: new Date(1).toLocaleString('pt-BR'),
      userId: 'user',
      createdAt: new Date(-1).toLocaleString('pt-BR'),
      token: 'stringToken',
      updatedAt: 'null'
    }

    sessionTokenPortMock = {
      createSession: jest.fn().mockResolvedValue('Sessão criado com sucesso'),
      editSessionToken: jest.fn().mockResolvedValue('Sessão editado com sucesso')

    }
  })

  test('Should return the message session created with success', async () => {
    expect(await sessionTokenPortMock.createSession(sessionData)).toEqual('Sessão criada com sucesso')
  })

  test('Should return the message session edited with success', async () => {
    sessionData.token = 'stringTokenUpdated'
    sessionData.updatedAt = new Date(1).toLocaleString('pt-BR')
    expect(await sessionTokenPortMock.editSessionToken(sessionData._id, sessionData)).toEqual('Sessão editada com sucesso')
  })
})
