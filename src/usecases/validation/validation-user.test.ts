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
      sessionId: new Date('01-01-01'),
      createdAt: new Date('01-01-01').toLocaleString()
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
    expect(validateMock.passwordIsValid(user.password)).toStrictEqual({ isValid: false, message: 'Password must be at least 8 characters long' })
  })

  test('Should return false if password is not includes numerics digits', () => {
    user.password = 'Password'
    expect(validateMock.passwordIsValid(user.password)).toStrictEqual({ isValid: false, message: 'Password must be at least 1 digit' })
  })

  test('Should return false if password is not includes uppercase letter', () => {
    user.password = 'password1'
    expect(validateMock.passwordIsValid(user.password)).toStrictEqual({ isValid: false, message: 'Password must be at least 1 uppercase letter' })
  })

  test('Should return false if password is not includes lowercase letter', () => {
    user.password = 'PASSWORD1*'
    expect(validateMock.passwordIsValid(user.password)).toStrictEqual({ isValid: false, message: 'Password must be at least 1 lowercase letter' })
  })

  test('Should return false if password is not includes special characters', () => {
    user.password = 'Password1'
    expect(validateMock.passwordIsValid(user.password))
      .toStrictEqual({ isValid: false, message: 'Password must be at least 1 special characters' })
  })

  test('Should return true if password is invalid', () => {
    expect(validateMock.comparePassword('PASSWORD', 'Password'))
      .toStrictEqual({ data: { message: 'Password is invalid. Please try again', passwordValid: false } })
  })

  test('Should return true if password is valid', () => {
    expect(validateMock.comparePassword('password', 'password'))
      .toStrictEqual({ passwordValid: true })
  })
})
