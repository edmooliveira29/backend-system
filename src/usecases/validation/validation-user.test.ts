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
})
