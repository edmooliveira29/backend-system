import { type UserEntity } from '../../entities/user/user-entity'
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

  beforeEach(() => {
    mockUserEntity = {
      _id: '123',
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

    userUseCase = new UserUseCase(mockUserRepository, mockSessionToken, mockCompanyUseCase)
  })

  it('getUser should call portRepository.getUser and return user data', async () => {
    const userId = '123'
    const mockUserRepositoryResponse = { data: mockUserEntity }
    mockUserRepository.getUser.mockResolvedValue(mockUserRepositoryResponse)

    const result = await userUseCase.getUser(userId)

    expect(mockUserRepository.getUser).toHaveBeenCalledWith(userId)
    expect(result).toEqual(mockUserRepositoryResponse)
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
