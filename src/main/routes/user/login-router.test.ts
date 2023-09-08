import request from 'supertest'
import app from '../../config/app'
import { MongoConnection } from '../../../infra/helpers/mongo-helper'
import dotenv from 'dotenv'
dotenv.config()

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoConnection.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoConnection.disconnect()
  })

  beforeEach(async () => {
    await MongoConnection.clearCollection('users')
  })

  test('Should return 200 if user was authenticated with succesfuly ', async () => {
    await request(app)
      .post('/v1/user')
      .send({
        name: 'Name Test',
        email: 'email@gmail.com',
        password: 'Password1*'
      })
    await request(app)
      .post('/v1/login')
      .send({
        email: 'email@gmail.com',
        password: 'Password1*'
      }).expect(200).timeout(1000)
  })

  test('Should return error 404 with Usuário não encontrado', async () => {
    const user = await request(app)
      .post('/v1/login')
      .send({
        email: 'email@gmail.com',
        password: 'Password1*'
      })
    expect(user.statusCode).toBe(404)
    expect(JSON.parse(user.text)).toStrictEqual({ message: 'Erro: Usuário não encontrado.' })
  })

  test('Should return error 400 with name is invalid', async () => {
    const user = await request(app)
      .post('/v1/user')
      .send({
        name: 'a',
        email: 'email-test@gmail.com',
        password: 'anyPassword*1'
      })
    expect(user.statusCode).toBe(400)
    expect(JSON.parse(user.text)).toStrictEqual({ message: 'Parâmetro inválido: Nome não é valido.' })
  })

  test('Should return error 400 if password is not provided', async () => {
    const user = await request(app)
      .post('/v1/user')
      .send({
        name: 'a',
        email: 'email-test@gmail.com'
      })
    expect(user.statusCode).toBe(400)
    expect(JSON.parse(user.text)).toStrictEqual({ message: 'Parâmetro ausente: password.' })
  })
})
