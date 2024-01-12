import request from 'supertest'
import app from '../../config/app'
import { MongoConnection } from '../../../infra/helpers/mongo-helper'
import dotenv from 'dotenv'
dotenv.config()
describe('Register Routes', () => {
  beforeEach(async () => {
    await MongoConnection.connect(process.env.MONGO_URL_TEST as string)
  })

  afterEach(async () => {
    await MongoConnection.disconnect()
  })

  beforeEach(async () => {
    await MongoConnection.clearCollection('users')
  })

  it('Should return 200 if user to be created with success', async () => {
    await request(app)
      .post('/v1/user')
      .send({
        name: 'Name Test',
        email: 'email-test@gmail.com',
        password: 'anyPassword1*'
      })
      .expect(200)
  })

  it('Should return error 400 with email is invalid', async () => {
    const user = await request(app)
      .post('/v1/user')
      .send({
        name: 'Name Test',
        email: 'email-testgmail.com',
        password: 'anyPassword*1'
      })
    expect(user.statusCode).toBe(400)
    expect(JSON.parse(user.text)).toStrictEqual({ message: 'E-mail não é valido.' })
  })

  it('Should return error 400 with name is invalid', async () => {
    const user = await request(app)
      .post('/v1/user')
      .send({
        name: 'a',
        email: 'email-test@gmail.com',
        password: 'anyPassword*1'
      })
    expect(user.statusCode).toBe(400)
    expect(JSON.parse(user.text)).toStrictEqual({ message: 'Nome não é valido.' })
  })

  it('Should return error 400 if email is not provided', async () => {
    const user = await request(app)
      .post('/v1/user')
      .send({
        username: 'email-test@gmail.com',
        name: 'Name Test'
      })
    expect(user.statusCode).toBe(400)
    expect(JSON.parse(user.text)).toStrictEqual({ message: 'Parâmetro ausente: email.' })
  })
})

describe('Open conection in production', () => {
  it('Should connect without authentication in test environment', async () => {
    process.env.NODE_ENV = ''
    await MongoConnection.connect(process.env.MONGO_URL as string)
    await MongoConnection.disconnect()
  })
})
