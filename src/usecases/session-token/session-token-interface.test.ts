import { type SessionTokenCreate } from './port/session-token-data-access'
import { type ISessionTokenUseCase } from './session-token-interface'
describe('User Port Interface', () => {
  let sessionData: SessionTokenCreate
  let sessionTokenPortMock: ISessionTokenUseCase

  beforeAll(() => {
    sessionData = {
      expiresIn: new Date(1).toLocaleString('pt-BR'),
      createdByTheCompany: 'user',
      createdAt: new Date(-1).toLocaleString('pt-BR'),
      token: 'stringToken',
      updatedAt: 'null'
    }

    sessionTokenPortMock = {
      createSessionToken: jest.fn().mockResolvedValue('Sessão criada com sucesso'),
      editSessionToken: jest.fn().mockResolvedValue('Sessão editada com sucesso')

    }
  })

  test('Should return the message session created with success', async () => {
    expect(await sessionTokenPortMock.createSessionToken({
      email: 'email@email.com',
      password: 'password',
      _id: undefined,
      name: '',
      createdAt: ''
    }, false)).toEqual('Sessão criada com sucesso')
  })

  test('Should return the message session edited with success', async () => {
    sessionData.token = 'stringTokenUpdated'
    sessionData.updatedAt = new Date(1).toLocaleString('pt-BR')
    expect(await sessionTokenPortMock.editSessionToken('sessionData._id', sessionData)).toEqual('Sessão editada com sucesso')
  })
})
