import { formatNowDate } from '../../../utils/data'
import { type SessionTokenCreate } from './session-token-data-access'
import { type ISessionTokenUseCase } from './session-token-port'
describe('Session Token Port Interface', () => {
  let session: SessionTokenCreate
  let sessionPortMock: ISessionTokenUseCase

  beforeAll(() => {
    session = {
      expiresIn: formatNowDate(),
      createdAt: formatNowDate(),
      updatedAt: formatNowDate(),
      createdByTheCompanyId: 'anyId',
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
      updateAt: formatNowDate(),
      history: [{ login: 'stringHistory' }],
      token: 'stringToken',
      createdByTheCompanyId: 'anyId',
      createdAt: formatNowDate(),
      expiresIn: formatNowDate()
    }
    expect(await sessionPortMock.editSessionToken('anyId', session)).toEqual('Sessão editada com sucesso')
  })
})
