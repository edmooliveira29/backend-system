import request from 'supertest'
import app from '../../config/app'
import { MongoConnection } from '../../../infra/helpers/mongo-helper'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.development' })
describe('Register Routes', () => {
  beforeAll(async () => {
    await MongoConnection.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoConnection.disconnect()
  })

  beforeEach(async () => {
    await MongoConnection.clearCollection('users')
  })

  test('Should return 200 if user to be created with success', async () => {
    await request(app)
      .post('/v1/api/user')
      .send({
        name: 'Name Test',
        email: 'email-test@gmail.com',
        password: 'anyPassword1*',
        token: 'anyToken',
        sessionId: new Date()
      })
      .expect(200)
  }, 20000)

  test('Should return error 400 with email is invalid', async () => {
    const user = await request(app)
      .post('/v1/api/user')
      .send({
        name: 'Name Test',
        email: 'email-testgmail.com',
        password: 'anyPassword*1',
        token: 'anyToken',
        sessionId: new Date()
      })
    expect(user.statusCode).toBe(400)
    expect(JSON.parse(user.text)).toStrictEqual({ message: 'Invalid param: Email is not valid.' })
  }, 20000)

  test('Should return error 400 with name is invalid', async () => {
    const user = await request(app)
      .post('/v1/api/user')
      .send({
        name: 'a',
        email: 'email-test@gmail.com',
        password: 'anyPassword*1',
        token: 'anyToken',
        sessionId: new Date()
      })
    expect(user.statusCode).toBe(400)
    expect(JSON.parse(user.text)).toStrictEqual({ message: 'Invalid param: Name is not valid.' })
  }, 20000)

  test('Should return error 400 if password is not provided', async () => {
    const user = await request(app)
      .post('/v1/api/user')
      .send({
        name: 'a',
        email: 'email-test@gmail.com',
        token: 'anyToken',
        sessionId: new Date()
      })
    expect(user.statusCode).toBe(400)
    expect(JSON.parse(user.text)).toStrictEqual({ message: 'Missing param: password.' })
  }, 20000)
})
