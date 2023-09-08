import request from 'supertest'
import app from '../../config/app'
import { MongoConnection } from '../../../infra/helpers/mongo-helper'
import dotenv from 'dotenv'
dotenv.config()
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

  test('Should return 200 if user is retrieved successfully', async () => {
    const response = await request(app)
      .get(`/v1/user/${'userId'}`)
      .expect(200)

    const user = response.body
    expect(user).toHaveProperty('name', 'Name Test')
    expect(user).toHaveProperty('email', 'email-test@gmail.com')
  })

  test('Should return error 400 with email is invalid', async () => {
    const user = await request(app)
      .post('/v1/user')
      .send({
        name: 'Name Test',
        email: 'email-testgmail.com',
        password: 'anyPassword*1',
        sessionToken: new Date()
      })
    expect(user.statusCode).toBe(400)
    expect(JSON.parse(user.text)).toStrictEqual({ message: 'Invalid param: E-mail não é valido.' })
  })

  test('Should return error 400 with name is invalid', async () => {
    const user = await request(app)
      .post('/v1/user')
      .send({
        name: 'a',
        email: 'email-test@gmail.com',
        password: 'anyPassword*1',
        sessionToken: new Date()
      })
    expect(user.statusCode).toBe(400)
    expect(JSON.parse(user.text)).toStrictEqual({ message: 'Invalid param: Nome não é valido.' })
  })

  test('Should return error 400 if password is not provided', async () => {
    const user = await request(app)
      .post('/v1/user')
      .send({
        name: 'a',
        email: 'email-test@gmail.com',
        sessionToken: new Date()
      })
    expect(user.statusCode).toBe(400)
    expect(JSON.parse(user.text)).toStrictEqual({ message: 'Missing param: password.' })
  })
})
