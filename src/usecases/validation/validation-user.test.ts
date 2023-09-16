import { type UserEntity } from '../../entities/user/user-entity'
import { ValidationUser } from './validation-user'

describe('Email Validation', () => {
  let user: UserEntity
  let validateMock: ValidationUser

  beforeAll(() => {
    user = {
      _id: 'anyid',
      email: 'validEmail@email.com',
      name: 'user',
      password: 'password',
      sessionToken: 'stringToken',
      createdAt: new Date('01-01-01').toLocaleString('pt-BR')
    }

    validateMock = new ValidationUser()
  })

  test('Should return true if email is valid', () => {
    expect(validateMock.emailIsValid(user.email)).toStrictEqual(true)
  })

  test('Should return false if email is invalid', () => {
    user.email = 'invalidEmailemail.com'
    expect(validateMock.emailIsValid(user.email)).toStrictEqual(false)
  })

  test('Should return true if name is valid', () => {
    expect(validateMock.nameIsValid(user.name)).toStrictEqual(true)
  })

  test('Should return false if name is invalid', () => {
    user.name = 'a'
    expect(validateMock.nameIsValid(user.name)).toStrictEqual(false)
  })

  test('Should return false if password more then 8 caractheres', () => {
    user.password = 'passwor'
    expect(validateMock.passwordIsValid(user.password)).toStrictEqual({ isValid: false, message: 'A senha deve conter pelo menos 8 caracteres' })
  })

  test('Should return false if password is not includes numerics digits', () => {
    user.password = 'Password'
    expect(validateMock.passwordIsValid(user.password)).toStrictEqual({ isValid: false, message: 'A senha deve conter pelo menos 1 dígito' })
  })

  test('Should return false if password is not includes uppercase letter', () => {
    user.password = 'password1'
    expect(validateMock.passwordIsValid(user.password)).toStrictEqual({
      isValid: false,
      message: 'A senha deve conter pelo menos uma letra maiúscula'
    })
  })

  test('Should return false if password is not includes lowercase letter', () => {
    user.password = 'PASSWORD1*'
    expect(validateMock.passwordIsValid(user.password)).toStrictEqual({
      isValid: false,
      message: 'A senha deve conter pelo menos uma letra minúscula'
    })
  })

  test('Should return false if password is not includes special characters', () => {
    user.password = 'Password1'
    expect(validateMock.passwordIsValid(user.password))
      .toStrictEqual({ isValid: false, message: 'A senha deve conter pelo menos um caracter especial' })
  })

  test('Should return true if password is invalid', () => {
    expect(validateMock.comparePassword('PASSWORD', 'Password'))
      .toStrictEqual({ data: { message: 'Senha inválida. Tente novamente', passwordValid: false } })
  })

  test('Should return true if password is valid', () => {
    expect(validateMock.comparePassword('password', 'password'))
      .toStrictEqual({ passwordValid: true })
  })
})
