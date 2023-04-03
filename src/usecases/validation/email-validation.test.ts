import { type UserEntity } from '../../entities/user/user-entity'
import { EmailValidation } from './email-validation'

describe('Email Validation', () => {
  test('should return true if email is valid', () => {
    const user: UserEntity = {
      id: 'anyid',
      email: 'validEmail@email.com',
      name: 'user',
      password: 'password',
      token: 'anyToken',
      expiration: new Date('01-01-01')
    }

    const validateEmailMock = new EmailValidation(user.email)
    expect(validateEmailMock.isValid()).toBe(true)
  })

  test('should return false if email is invalid', () => {
    const user: UserEntity = {
      id: 'anyid',
      email: 'invalidEmail@emailcom',
      name: 'user',
      password: 'password',
      token: 'anyToken',
      expiration: new Date('01-01-01')
    }

    const validateEmailMock = new EmailValidation(user.email)
    expect(validateEmailMock.isValid()).toBe(false)
  })
})
