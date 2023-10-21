import { UserUseCase } from './company-usecase'

describe('UserUseCase', () => {
  let userUseCase: any
  let mockValidationUser: any
  beforeEach(() => {
    const mockUserCreateUseCase = {
      login: jest.fn(),
      getUser: jest.fn(),
      createUser: jest.fn(),
      editUser: jest.fn()
    }

    const mockSessionTokenUseCase = {
      createSessionToken: jest.fn(),
      editSessionToken: jest.fn()
    }

    mockValidationUser = {
      passwordIsValid: jest.fn(),
      emailIsValid: jest.fn(),
      nameIsValid: jest.fn()
    }

    userUseCase = new UserUseCase(mockUserCreateUseCase, mockSessionTokenUseCase)
  })

  describe('login', () => {
    it('should return user not found message when login fails', async () => {
      const mockLoginResponse = { data: null }
      userUseCase.portRepository.login.mockResolvedValue(mockLoginResponse)

      const result = await userUseCase.login({
        email: 'user@example.com',
        password: 'password',
        remember: false
      })

      expect(result).toEqual({ message: 'Usuário não encontrado' })
    })

    it('should successfully authenticate the user', async () => {
      const mockUserData = {
        _id: '123',
        name: 'Example User',
        email: 'user@example.com',
        password: 'password'
      }
      const mockLoginResponse = { data: mockUserData }
      userUseCase.portRepository.login.mockResolvedValue(mockLoginResponse)
      const mockSessionTokenResponse = { data: { token: 'session-token' } }
      userUseCase.sessionToken.createSessionToken.mockResolvedValue(mockSessionTokenResponse)
      const result = await userUseCase.login({
        email: 'user@example.com',
        password: 'password',
        remember: true
      })

      expect(result).toEqual({
        message: 'Usuário autenticado com sucesso',
        data: {
          _id: mockUserData._id,
          name: mockUserData.name,
          email: mockUserData.email,
          sessionToken: mockSessionTokenResponse.data.token,
          createdAt: expect.any(String)
        }
      })
    })

    it('should return an error message when password validation fails', async () => {
      const mockUserData = {
        _id: '123',
        name: 'Example User',
        email: 'user@example.com',
        password: 'password'
      }
      const mockLoginResponse = { data: mockUserData }
      userUseCase.portRepository.login.mockResolvedValue(mockLoginResponse)
      const result = await userUseCase.login({
        email: 'user@example.com',
        password: 'incorrect-password',
        remember: false
      })
      expect(result).toEqual({
        data: {
          message: 'Senha inválida. Tente novamente',
          passwordValid: false
        }
      })
    })
    it('should return an error message when password is invalid', async () => {
      mockValidationUser.passwordIsValid.mockReturnValue({ isValid: false, message: 'Invalid password' })
      const result = await userUseCase.createUser({
        name: 'John Doe',
        email: 'john@example.com',
        password: '123'
      })
      expect(result).toEqual({ message: 'A senha deve conter pelo menos 8 caracteres' })
    })

    it('should return an error message when email is invalid', async () => {
      mockValidationUser.emailIsValid.mockReturnValue(false)

      const result = await userUseCase.createUser({
        name: 'John Doe',
        email: 'invalid-email',
        password: 'Password*123'
      })

      expect(result).toEqual({ message: 'E-mail não é valido' })
    })

    it('should return an error message when name is invalid', async () => {
      mockValidationUser.nameIsValid.mockReturnValue(false)
      const result = await userUseCase.createUser({
        name: '',
        email: 'john@example.com',
        password: 'Password123*'
      })
      expect(result).toEqual({ message: 'Nome não é valido' })
    })

    it('should create a user and return success message', async () => {
      mockValidationUser.passwordIsValid.mockReturnValue({ isValid: true })
      mockValidationUser.emailIsValid.mockReturnValue(true)
      mockValidationUser.nameIsValid.mockReturnValue(true)
      const mockUser = {
        _id: '123',
        name: 'John Doe',
        email: 'john@example.com'
      }
      const mockCreateUserResponse = { data: mockUser }
      userUseCase.portRepository.createUser.mockResolvedValue(mockCreateUserResponse)
      const mockSessionTokenResponse = { data: { token: 'session-token' } }
      userUseCase.sessionToken.createSessionToken.mockResolvedValue(mockSessionTokenResponse)
      const result = await userUseCase.createUser({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password*123'
      })
      expect(result).toEqual({
        message: 'Usuário criado com sucesso',
        data: {
          _id: mockUser._id,
          name: mockUser.name,
          email: mockUser.email,
          sessionToken: mockSessionTokenResponse.data.token,
          createdAt: expect.any(String)
        }
      })
    })
    it('should return an error message when email is invalid', async () => {
      mockValidationUser.emailIsValid.mockReturnValue(false)
      const result = await userUseCase.editUser('123', {
        name: 'John Doe',
        email: 'invalid-email'
      })
      expect(result).toEqual({ message: 'E-mail não é valido' })
    })

    it('should return an error message when name is invalid', async () => {
      mockValidationUser.nameIsValid.mockReturnValue(false)
      const result = await userUseCase.editUser('123', {
        name: '',
        email: 'john@example.com'
      })

      expect(result).toEqual({ message: 'Nome não é valido' })
    })

    it('should edit a user and return success message', async () => {
      mockValidationUser.emailIsValid.mockReturnValue(true)
      mockValidationUser.nameIsValid.mockReturnValue(true)
      const mockEditedUser = {
        _id: '123',
        name: 'Edited User',
        email: 'edited@example.com',
        address: '123',
        birthday: '01/01/2000',
        city: 'City',
        complement: 'Complement',
        cpf: '12345678901',
        gender: 'Male',
        houseNumber: '123',
        neighborhood: 'Neighborhood',
        nickname: 'Nickname',
        phoneNumber: '123456789',
        stateOfTheCountry: 'State',
        zipCode: '12345'
      }
      const mockEditUserResponse = { data: mockEditedUser }
      userUseCase.portRepository.editUser.mockResolvedValue(mockEditUserResponse)
      const result = await userUseCase.editUser('123', {
        name: 'Edited User',
        email: 'edited@example.com'
      })
      expect(result).toEqual({
        message: 'Usuário editado com sucesso',
        data: {
          _id: mockEditedUser._id,
          address: mockEditedUser.address,
          birthday: mockEditedUser.birthday,
          city: mockEditedUser.city,
          complement: mockEditedUser.complement,
          cpf: mockEditedUser.cpf,
          email: mockEditedUser.email,
          gender: mockEditedUser.gender,
          houseNumber: mockEditedUser.houseNumber,
          name: mockEditedUser.name,
          neighborhood: mockEditedUser.neighborhood,
          nickname: mockEditedUser.nickname,
          phoneNumber: mockEditedUser.phoneNumber,
          stateOfTheCountry: mockEditedUser.stateOfTheCountry,
          zipCode: mockEditedUser.zipCode
        }
      })
    })
    it('should return an error message when user is not found', async () => {
      userUseCase.portRepository.getUser.mockResolvedValue(null)
      const result = await userUseCase.getUser('123')
      expect(result).toEqual({ message: 'Usuário não encontrado' })
    })

    it('should return user data when user is found', async () => {
      const mockUser = {
        _id: '123',
        name: 'John Doe',
        email: 'john@example.com'
      }
      userUseCase.portRepository.getUser.mockResolvedValue(mockUser)

      const result = await userUseCase.getUser('123')

      expect(result).toEqual({
        message: 'Usuário encontrado com sucesso',
        ...mockUser
      })
    })
  })
})
