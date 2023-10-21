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
    await MongoConnection.clearCollection('companies')
  })

  test('Should return 200 if company to be created with success', async () => {
    await request(app)
      .post('/v1/company')
      .send({
        name: 'Name Company Test',
        email: 'email-test@gmail.com',
        password: 'anyPassword1*'
      })
      .expect(200)
  })

  test('Should return error 400 with email is invalid', async () => {
    const company = await request(app)
      .post('/v1/company')
      .send({
        name: 'Name Test',
        email: 'email-testgmail.com',
        password: 'anyPassword*1'
      })
    expect(company.statusCode).toBe(400)
    expect(JSON.parse(company.text)).toStrictEqual({ message: 'Parâmetro inválido: E-mail não é valido.' })
  })

  test('Should return error 400 with name is invalid', async () => {
    const company = await request(app)
      .post('/v1/company')
      .send({
        name: 'a',
        email: 'email-test@gmail.com',
        password: 'anyPassword*1'
      })
    expect(company.statusCode).toBe(400)
    expect(JSON.parse(company.text)).toStrictEqual({ message: 'Parâmetro inválido: Nome não é valido.' })
  })

  test('Should return error 400 if password is not provided', async () => {
    const company = await request(app)
      .post('/v1/company')
      .send({
        name: 'a',
        email: 'email-test@gmail.com'
      })
    expect(company.statusCode).toBe(400)
    expect(JSON.parse(company.text)).toStrictEqual({ message: 'Parâmetro ausente: password.' })
  })
})

describe('Open conection in production', () => {
  it('Should connect without authentication in test environment', async () => {
    process.env.NODE_ENV = ''
    await MongoConnection.connect(process.env.MONGO_URL as string)
    await MongoConnection.disconnect()
  })
})
