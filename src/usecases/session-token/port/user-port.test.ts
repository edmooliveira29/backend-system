import { type UserEntity } from '../../../entities/user/user-entity'
import { type UserEdit, type IUserCreateUseCase } from './session-token-port'
describe('User Port Interface', () => {
  let user: UserEntity
  let userPortMock: IUserCreateUseCase

  beforeAll(() => {
    user = {
      _id: 'anyId',
      email: 'user@email.com',
      name: 'user',
      password: 'password',
      sessionToken: 'stringToken',
      createdAt: new Date('01-01-01').toLocaleString('pt-BR')
    }

    userPortMock = {
      getUser: jest.fn(),
      create: jest.fn().mockResolvedValue('Usuário criado com sucesso'),
      login: jest.fn(),
      editUser: jest.fn()

    }
  })

  test('Should return the message user created with success', async () => {
    expect(await userPortMock.create(user)).toEqual('Usuário criado com sucesso')
  })

  test('Should return the message user edited with success', async () => {
    userPortMock.editUser = jest.fn().mockResolvedValue('Usuário editado com sucesso')
    const user: UserEdit = {
      _id: '1234567890',
      address: '123 Main Street',
      birthday: '01/01/1990',
      city: 'Example City',
      complement: 'Apt 4B',
      cpf: '123.456.789-01',
      email: 'user@example.com',
      gender: 'Male',
      houseNumber: '123',
      name: 'John Doe',
      neighborhood: 'Example Neighborhood',
      nickname: 'johndoe',
      phoneNumber: '(123) 456-7890',
      stateOfTheCountry: 'Example State',
      zipCode: '12345-678'
    }
    expect(await userPortMock.editUser(user)).toEqual('Usuário editado com sucesso')
  })
})
