import { type SessionTokenCreate } from './session-token-data-access'
import { type ISessionTokenUseCase } from './session-token-port'
describe('Session Token Port Interface', () => {
  let session: SessionTokenCreate
  let sessionPortMock: ISessionTokenUseCase

  beforeAll(() => {
    session = {
      expiresIn: new Date().toLocaleString('pt-BR'),
      createdAt: new Date().toLocaleString('pt-BR'),
      updatedAt: new Date().toLocaleString('pt-BR'),
      userId: 'anyId',
      token: 'stringToken'
    }

    sessionPortMock = {
      createSessionToken: jest.fn().mockResolvedValue('Sessão criada com sucesso'),
      editSessionToken: jest.fn()

    }
  })

  test('Should return the message session created with success', async () => {
    expect(await sessionPortMock.createSessionToken(session)).toEqual('Sessão criada com sucesso')
  })

  test('Should return the message session edited with success', async () => {
    sessionPortMock.editSessionToken = jest.fn().mockResolvedValue('Sessão editada com sucesso')
    const session = {
      updateAt: new Date().toLocaleString('pt-BR'),
      history: [{ login: 'stringHistory' }],
      token: 'stringToken',
      userId: 'anyId',
      createdAt: new Date().toLocaleString('pt-BR'),
      expiresIn: new Date().toLocaleString('pt-BR')
    }
    expect(await sessionPortMock.editSessionToken('anyId', session)).toEqual('Sessão editada com sucesso')
  })
})
