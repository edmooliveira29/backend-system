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

  test.only('Should return 200 if user was authenticated with succesfuly ', async () => {
    await request(app)
      .post('/v1/user')
      .send({
        name: 'Name Test',
        email: 'email@gmail.com',
        password: 'Password1*',
        token: 'anyToken',
        sessionId: new Date()
      })
    await request(app)
      .post('/v1/login')
      .send({
        email: 'email@gmail.com',
        password: 'Password1*'
      }).expect(200)
  }, 20000)

  // test('Should return error 204 with user not found', async () => {
  //   const user = await request(app)
  //     .post('/v1/login')
  //     .send({
  //       email: 'emailinvalid@gmail.com',
  //       password: 'anyPassword*1'
  //     })
  //   expect(user.statusCode).toBe(204)
  //   expect(JSON.parse(user.text)).toStrictEqual('Not Found: User not found.')
  // }, 20000)

  // test('Should return error 400 with name is invalid', async () => {
  //   const user = await request(app)
  //     .post('/v1/user')
  //     .send({
  //       name: 'a',
  //       email: 'email-test@gmail.com',
  //       password: 'anyPassword*1',
  //       token: 'anyToken',
  //       sessionId: new Date()
  //     })
  //   expect(user.statusCode).toBe(400)
  //   expect(JSON.parse(user.text)).toStrictEqual('Invalid param: Name is not valid.')
  // }, 20000)

  // test('Should return error 400 if password is not provided', async () => {
  //   const user = await request(app)
  //     .post('/v1/user')
  //     .send({
  //       name: 'a',
  //       email: 'email-test@gmail.com',
  //       token: 'anyToken',
  //       sessionId: new Date()
  //     })
  //   expect(user.statusCode).toBe(400)
  //   expect(JSON.parse(user.text)).toStrictEqual('Missing param: password.')
  // }, 20000)
})
