import request from 'supertest'
import app from '../../config/app'
import { MongoConnection } from '../../../infra/helpers/mongo-helper'
import dotenv from 'dotenv'
dotenv.config()
describe('Register Routes', () => {
  beforeAll(async () => {
    await MongoConnection.connect(process.env.MONGO_URL_TEST as string)
  })

  afterAll(async () => {
    await MongoConnection.disconnect()
  })

  beforeEach(async () => {
    await MongoConnection.clearCollection('users')
  })

  test('Should return 200 if user is retrieved successfully', async () => {
    const user = await request(app)
      .post('/v1/user')
      .send({
        name: 'Name Test',
        email: 'emailtoget@gmail.com',
        password: 'anyPassword*1',
        sessionToken: new Date()
      })

    const idUser: string = user.body?.data._id
    const response = await request(app)
      .get(`/v1/user?objectId=${idUser}`)
      .expect(200)
    const userResponse = response.body
    expect(userResponse).toHaveProperty('message', 'Usuário encontrado com sucesso')
  })

  test('Should return 404 if user is not retrieved successfully', async () => {
    const response = await request(app)
      .get('/v1/user?objectId=64f9304f0f87f700a99994b5')
      .expect(404)
    const userResponse = response.body
    expect(userResponse).toHaveProperty('message', 'Erro: Usuário não encontrado.')
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
    expect(JSON.parse(user.text)).toStrictEqual({ message: 'Parâmetro inválido: E-mail não é valido.' })
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
    expect(JSON.parse(user.text)).toStrictEqual({ message: 'Parâmetro inválido: Nome não é valido.' })
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
    expect(JSON.parse(user.text)).toStrictEqual({ message: 'Parâmetro ausente: password.' })
  })
})
