import { type UserEntity } from '../../entities/user/user-entity'
import { ValidationUser } from './validation-user'

describe('Email Validation', () => {
  let user: UserEntity
  let validateMock: ValidationUser

  beforeAll(() => {
    user = {
      id: 'anyid',
      email: 'validEmail@email.com',
      name: 'user',
      password: 'password',
      token: 'anyToken',
      sessionId: new Date('01-01-01')
    }

    validateMock = new ValidationUser(user)
  })

  test('Should return true if email is valid', () => {
    expect(validateMock.emailIsValid()).toStrictEqual(true)
  })

  test('Should return false if email is invalid', () => {
    user.email = 'invalidEmailemail.com'
    validateMock = new ValidationUser(user)
    expect(validateMock.emailIsValid()).toStrictEqual(false)
  })

  test('Should return true if name is valid', () => {
    expect(validateMock.nameIsValid()).toStrictEqual(true)
  })

  test('Should return false if name is invalid', () => {
    user.name = 'a'
    validateMock = new ValidationUser(user)
    expect(validateMock.nameIsValid()).toStrictEqual(false)
  })

  test('Should return false if password more then 8 caractheres', () => {
    user.password = 'passwor'
    validateMock = new ValidationUser(user)
    expect(validateMock.passwordIsValid()).toStrictEqual({ isValid: false, message: 'Password must be at least 8 characters long' })
  })

  test('Should return false if password is not includes numerics digits', () => {
    user.password = 'Password'
    validateMock = new ValidationUser(user)
    expect(validateMock.passwordIsValid()).toStrictEqual({ isValid: false, message: 'Password must be at least 1 digit' })
  })

  test('Should return false if password is not includes uppercase letter', () => {
    user.password = 'password1'
    validateMock = new ValidationUser(user)
    expect(validateMock.passwordIsValid()).toStrictEqual({ isValid: false, message: 'Password must be at least 1 uppercase letter' })
  })

  test('Should return false if password is not includes lowercase letter', () => {
    user.password = 'PASSWORD1*'
    validateMock = new ValidationUser(user)
    expect(validateMock.passwordIsValid()).toStrictEqual({ isValid: false, message: 'Password must be at least 1 lowercase letter' })
  })

  test('Should return false if password is not includes special characters', () => {
    user.password = 'Password1'
    validateMock = new ValidationUser(user)
    expect(validateMock.passwordIsValid()).toStrictEqual({ isValid: false, message: 'Password must be at least 1 special characters' })
  })

  test('Should return true if password isvalid', () => {
    user.password = 'Password1*'
    validateMock = new ValidationUser(user)
    expect(validateMock.passwordIsValid()).toStrictEqual({ isValid: true })
  })
})
