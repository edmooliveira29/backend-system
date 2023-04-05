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
      expiration: new Date('01-01-01')
    }

    validateMock = new ValidationUser(user)
  })

  test('should return true if email is valid', () => {
    expect(validateMock.emailIsValid()).toStrictEqual(true)
  })

  test('should return false if email is invalid', () => {
    user.email = 'invalidEmailemail.com'
    expect(validateMock.emailIsValid()).toStrictEqual(false)
  })

  test('should return true if name is valid', () => {
    expect(validateMock.nameIsValid()).toStrictEqual(true)
  })

  test('should return false if name is invalid', () => {
    user.name = 'a'
    const validateMock = new ValidationUser(user)
    expect(validateMock.nameIsValid()).toStrictEqual(false)
  })
})
