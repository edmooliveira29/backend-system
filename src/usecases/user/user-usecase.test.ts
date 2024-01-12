import { type UserEntity } from '../../entities/user/user-entity'
import { Validation } from '../validation/validations'
import { type UserEdit } from './port/user-port'
import { UserUseCase } from './user-usecase'
describe('UserUseCase', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  let userUseCase: UserUseCase
  let mockUserEntity: UserEntity
  let mockSessionToken: any
  let mockCompanyUseCase: any
  let mockUserRepository: any
  let comparePasswordSpy: any
  let passwordIsValidSpy: any
  beforeEach(() => {
    comparePasswordSpy = jest.spyOn(Validation.prototype, 'comparePassword')
    passwordIsValidSpy = jest.spyOn(Validation.prototype, 'passwordIsValid')
    mockUserEntity = {
      _id: 'userId',
      name: 'testuser',
      password: '1234*Abcd',
      createdByTheCompanyId: 'companyId',
      role: 'admin',
      createdAt: '2020-01-01T00:00:00.000Z',
      createWithGoogle: false,
      email: 'testemail@email.com',
      profilePicture: 'testprofilepicture',
      sessionToken: 'testsessiontoken'
    }

    mockUserRepository = {
      login: jest.fn(),
      createUser: jest.fn(),
      editUser: jest.fn(),
      getUser: jest.fn(),
      getAllUser: jest.fn(),
      deleteUser: jest.fn()
    }

    mockCompanyUseCase = {
      getCompany: jest.fn()
    }
    mockSessionToken = {
      createSessionToken: jest.fn()
    }

    userUseCase = new UserUseCase(mockUserRepository, mockSessionToken, mockCompanyUseCase)
  })

  afterEach(() => {
    comparePasswordSpy.mockRestore()
  })
  test('createUser should create a user successfully', async () => {
    const mockUser: UserEntity = {
      _id: 'someId',
      name: 'Name Valid',
      email: 'someEmail@someEmail.com',
      createWithGoogle: false,
      role: 'admin',
      password: '1234*Abcd',
      profilePicture: 'someProfilePicture',
      createdAt: 'someCreatedAt',
      sessionToken: 'someSessionToken',
      createdByTheCompanyId: 'someCreatedByTheCompanyId'
    }
    const mockUserRepositoryResponse = { data: mockUserEntity }

    mockUserRepository.createUser.mockResolvedValue(mockUserRepositoryResponse)
    mockSessionToken.createSessionToken.mockResolvedValue({ data: { token: 'someSessionToken' } })
    const result = await userUseCase.createUser(mockUser)

    expect(result.message).toBe('Usuário criado com sucesso')
    expect(result.data._id).toBe('userId')
  })

  test('createUser should return error if name is not valid', async () => {
    const mockUser: UserEntity = {
      _id: 'someId',
      name: '',
      email: 'someEmail@someEmail.com',
      createWithGoogle: false,
      role: 'admin',
      password: '1234*Abcd',
      profilePicture: 'someProfilePicture',
      createdAt: 'someCreatedAt',
      sessionToken: 'someSessionToken',
      createdByTheCompanyId: 'someCreatedByTheCompanyId'
    }
    const mockUserRepositoryResponse = { data: mockUserEntity }

    mockUserRepository.createUser.mockResolvedValue(mockUserRepositoryResponse)
    mockSessionToken.createSessionToken.mockResolvedValue({ data: { token: 'someSessionToken' } })
    const result = await userUseCase.createUser(mockUser)

    expect(result.message).toBe('Nome não é valido')
  })

  test('createUser should return error if password is not valid', async () => {
    const mockUser: UserEntity = {
      _id: 'someId',
      name: '',
      email: 'someEmail@someEmail.com',
      createWithGoogle: false,
      role: 'admin',
      password: '1234*Abcd',
      profilePicture: 'someProfilePicture',
      createdAt: 'someCreatedAt',
      sessionToken: 'someSessionToken',
      createdByTheCompanyId: 'someCreatedByTheCompanyId'
    }
    const mockUserRepositoryResponse = { data: mockUserEntity }
    mockUserRepository.createUser.mockResolvedValue(mockUserRepositoryResponse)
    mockSessionToken.createSessionToken.mockResolvedValue({ data: { token: 'someSessionToken' } })
    passwordIsValidSpy.mockReturnValue({ passwordIsValid: false, message: 'A senha deve conter pelo menos um caracter especial' })
    const result = await userUseCase.createUser(mockUser)

    expect(result.message).toBe('A senha deve conter pelo menos um caracter especial')
  })

  test('createUser should return error if name is not valid', async () => {
    const mockUser: UserEntity = {
      _id: 'someId',
      name: 'Name Valid',
      email: 'someEmail',
      createWithGoogle: false,
      role: 'admin',
      password: '1234*Abcd',
      profilePicture: 'someProfilePicture',
      createdAt: 'someCreatedAt',
      sessionToken: 'someSessionToken',
      createdByTheCompanyId: 'someCreatedByTheCompanyId'
    }
    const mockUserRepositoryResponse = { data: mockUserEntity }

    mockUserRepository.createUser.mockResolvedValue(mockUserRepositoryResponse)
    passwordIsValidSpy.mockReturnValue({ passwordIsValid: true })
    mockSessionToken.createSessionToken.mockResolvedValue({ data: { token: 'someSessionToken' } })
    const result = await userUseCase.createUser(mockUser)

    expect(result.message).toBe('E-mail não é valido')
  })

  test('Should authenticate user successfully', async () => {
    const mockUser = { username: 'user1', password: 'password1', remember: true, loginWithGoogle: false }
    const mockUserRepositoryInfra = { data: mockUserEntity }
    const mockSessionTokenData = { token: 'sessionToken1' }

    comparePasswordSpy.mockResolvedValueOnce({ passwordIsValid: true })

    mockUserRepository.login.mockResolvedValue(mockUserRepositoryInfra)
    jest.spyOn(mockSessionToken, 'createSessionToken').mockResolvedValue({ data: mockSessionTokenData })

    const result = await userUseCase.login(mockUser)

    expect(result.message).toBe('Usuário autenticado com sucesso')
    expect(result.data.sessionToken).toBe('sessionToken1')
  })

  test('Should return an error message if user is not found', async () => {
    const mockUser = { username: 'nonexistentuser', password: 'password', remember: true, loginWithGoogle: false }
    const mockUserRepositoryInfra = { data: null }

    mockUserRepository.login.mockResolvedValue(mockUserRepositoryInfra)

    const result = await userUseCase.login(mockUser)

    expect(result.message).toBe('Usuário não encontrado')

    expect(mockUserRepository.login).toHaveBeenCalledWith(mockUser)
  })

  test('Should return an error message if authentication fails', async () => {
    const mockUser = { username: 'user2', password: 'incorrectpassword', remember: true, loginWithGoogle: false }
    const mockUserRepositoryInfra = { data: mockUserEntity }

    mockUserRepository.login.mockResolvedValue(mockUserRepositoryInfra)
    comparePasswordSpy.mockResolvedValueOnce({ passwordIsValid: false, message: 'Senha incorreta' })
    mockSessionToken.createSessionToken.mockResolvedValue({ data: { token: 'sessionToken2' } })
    const result = await userUseCase.login(mockUser)

    expect(result.message).toBe('Senha incorreta')
  })

  it('getUser should call portRepository.getUser and return user data', async () => {
    const userId = '123'
    const mockUserRepositoryResponse = { data: mockUserEntity }
    mockUserRepository.getUser.mockResolvedValue(mockUserRepositoryResponse)

    const result = await userUseCase.getUser(userId)

    expect(mockUserRepository.getUser).toHaveBeenCalledWith(userId)
    expect(result).toEqual(mockUserRepositoryResponse)
  })

  test('editUser should edit a user successfully', async () => {
    const mockUserEdit: UserEdit = {
      _id: 'someId',
      name: 'Name Valid',
      email: 'someEmail@someEmail.com',
      cpf: 'someCpf',
      nickname: 'someNickname',
      phoneNumber: 'somePhoneNumber',
      birthday: 'someBirthday',
      gender: 'someGender',
      zipCode: 'someZipCode',
      street: 'someStreet',
      houseNumber: 'someHouseNumber',
      complement: 'someComplement',
      neighborhood: 'someNeighborhood',
      stateOfTheCountry: 'someStateOfTheCountry',
      city: 'someCity',
      createWithGoogle: false,
      role: 'admin',
      newPassword: '1234*Abcd*',
      newPasswordConfirmation: '1234*Abcd*',
      password: 'somePassword',
      profilePicture: 'someProfilePicture',
      lastChangedPassword: 'someLastChangedPassword'
    }
    const mockUserRepositoryResponse = { data: mockUserEntity }

    mockUserRepository.getUser.mockResolvedValue(mockUserRepositoryResponse)
    mockUserRepository.editUser.mockResolvedValue(mockUserRepositoryResponse)
    jest.spyOn(Validation.prototype, 'comparePassword').mockResolvedValueOnce({ passwordIsValid: true })
    const result = await userUseCase.editUser('userId', mockUserEdit)

    expect(result.message).toBe('Senha editada com sucesso')
    expect(result.data._id).toBe('userId')
  })

  test('editUser should edit a user with error because not has password', async () => {
    const mockUserEdit: UserEdit = {
      _id: 'someId',
      name: 'Name Valid',
      email: 'someEmail@someEmail.com',
      cpf: 'someCpf',
      nickname: 'someNickname',
      phoneNumber: 'somePhoneNumber',
      birthday: 'someBirthday',
      gender: 'someGender',
      zipCode: 'someZipCode',
      street: 'someStreet',
      houseNumber: 'someHouseNumber',
      complement: 'someComplement',
      neighborhood: 'someNeighborhood',
      stateOfTheCountry: 'someStateOfTheCountry',
      city: 'someCity',
      createWithGoogle: false,
      role: 'admin',
      password: 'somePassword',
      newPassword: '1234*Abcd*',
      profilePicture: 'someProfilePicture',
      lastChangedPassword: 'someLastChangedPassword',
      newPasswordConfirmation: '1234*Abcd*'
    }
    const mockUserRepositoryResponse = { data: mockUserEntity }

    mockUserRepository.getUser.mockResolvedValue(mockUserRepositoryResponse)
    mockUserRepository.editUser.mockResolvedValue(mockUserRepositoryResponse)
    jest.spyOn(Validation.prototype, 'comparePassword').mockResolvedValueOnce({ passwordIsValid: false })
    const result = await userUseCase.editUser('userId', mockUserEdit)
    expect(result.message).toBe('Senha atual esta incorreta')
    mockUserEdit.createWithGoogle = true
    await userUseCase.editUser('userId', mockUserEdit)
    mockUserEdit.newPassword = false
    await userUseCase.editUser('userId', mockUserEdit)
  })

  it('getAllUser should call portRepository.getAllUser and return user data', async () => {
    const companyId = 'company123'
    const mockUserRepositoryResponse = { data: mockUserEntity }
    mockUserRepository.getAllUser.mockResolvedValue(mockUserRepositoryResponse)

    const result = await userUseCase.getAllUser(companyId)

    expect(mockUserRepository.getAllUser).toHaveBeenCalledWith(companyId)
    expect(result).toEqual(mockUserRepositoryResponse)
  })

  it('deleteUser should call portRepository.deleteUser and return success message', async () => {
    const userId = '123'
    const mockUserRepositoryResponse = { data: mockUserEntity }
    mockUserRepository.deleteUser.mockResolvedValue(mockUserRepositoryResponse)

    const result = await userUseCase.deleteUser(userId)

    expect(mockUserRepository.deleteUser).toHaveBeenCalledWith(userId)
    expect(result.message).toBe('Usuário deletado com sucesso')
    expect(result.data).toEqual(mockUserRepositoryResponse.data)
  })
})
