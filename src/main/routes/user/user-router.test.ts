import request from 'supertest'
import app from '../../config/app'
import { MongoConnection } from '../../../infra/helpers/mongo-helper'

describe('Register Routes', () => {
  beforeAll(async () => {
    await MongoConnection.connect('mongodb://localhost:27017')
  })

  afterAll(async () => {
    await MongoConnection.disconnect()
  })

  beforeEach(async () => {
    await MongoConnection.clearCollection('users')
  })

  test('should return an account on success', async () => {
    await request(app)
      .post('/v1/api/user')
      .send({
        name: 'Name Test',
        email: 'email-test@gmail.com',
        password: 'anyPassword',
        token: 'anyToken',
        expiration: new Date()
      })
      .expect(200)
  }, 20000)

  test('Should return error 500 with email is invalid', async () => {
    const user = await request(app)
      .post('/v1/api/user')
      .send({
        name: 'Name Test',
        email: 'email-testgmail.com',
        password: 'anyPassword',
        token: 'anyToken',
        expiration: new Date()
      })
    expect(user.statusCode).toBe(500)
    expect(JSON.parse(user.text)).toStrictEqual('Server error: Email is not valid.')
  }, 20000)

  test('Should return error 500 with name is invalid', async () => {
    const user = await request(app)
      .post('/v1/api/user')
      .send({
        name: 'a',
        email: 'email-test@gmail.com',
        password: 'anyPassword',
        token: 'anyToken',
        expiration: new Date()
      })
    expect(user.statusCode).toBe(500)
    expect(JSON.parse(user.text)).toStrictEqual('Server error: Name is not valid.')
  }, 20000)

  test('Should return error 400 if password is not provided', async () => {
    const user = await request(app)
      .post('/v1/api/user')
      .send({
        name: 'a',
        email: 'email-test@gmail.com',
        token: 'anyToken',
        expiration: new Date()
      })
    expect(user.statusCode).toBe(400)
    expect(JSON.parse(user.text)).toStrictEqual('Missing param: password')
  }, 20000)
})
