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
    await MongoConnection.clearCollection('categories')
  })

  it('Should return 200 if category to be created with success', async () => {
    await request(app)
      .post('/v1/category')
      .send({
        name: 'Name Test',
        type: 'anyType',
        description: 'anyDescription'

      })
      .expect(200)
  })

  it('Should return 200 if category to be edited with success', async () => {
    const category = await request(app)
      .post('/v1/category')
      .send({
        name: 'Name Test',
        type: 'anyType',
        description: 'anyDescription'
      })
    await request(app)
      .put(`/v1/category/${category.body.data._id}`)
      .send({
        name: 'Name Test Edited',
        type: 'anyType',
        description: 'anyDescription'
      })

    expect(category.statusCode).toBe(200)
  })

  it('Should return 200 with get all categories with success', async () => {
    await request(app)
      .post('/v1/category')
      .send({
        name: 'Name Test',
        type: 'anyType',
        description: 'anyDescription'
      })
    const category = await request(app)
      .get('/v1/category')
      .expect(200)
    expect(category.body.data.length).toBe(1)
  })

  it('Should return 200 with delete category with success', async () => {
    await request(app)
      .post('/v1/category')
      .send({
        name: 'Name Test',
        type: 'anyType',
        description: 'anyDescription'
      })

    const categoryAfterInsert = await request(app)
      .get('/v1/category')
      .expect(200)

    expect(categoryAfterInsert.body.data.length).toBe(1)

    await request(app)
      .delete(`/v1/category/${categoryAfterInsert.body.data[0]._id}`).send({ a: 1 })
      .expect(200)
    const categoryAfterDelete = await request(app)
      .get('/v1/category')
      .expect(200)
    expect(categoryAfterDelete.body.data.length).toBe(0)
  })

  it('Shoul return error 500 if category exists', async () => {
    await request(app)
      .post('/v1/category')
      .send({
        name: 'Name Test',
        type: 'anyType',
        description: 'anyDescription'
      })

    const category = await request(app)
      .post('/v1/category')
      .send({
        name: 'Name Test',
        type: 'anyType',
        description: 'anyDescription'
      })
      .expect(500)

    expect(category.body.message).toBe('Erro do servidor: Já existe uma categoria com este nome.')
  })

  it('Should return 400 with not provided name', async () => {
    const category = await request(app)
      .post('/v1/category')
      .send({
        type: 'anyType',
        description: 'anyDescription'
      }).expect(400)
    expect(category.body.message).toBe('Parâmetro ausente: name.')
  })
})

describe('Open conection in production', () => {
  it('Should connect without authentication in test environment', async () => {
    process.env.NODE_ENV = ''
    await MongoConnection.connect(process.env.MONGO_URL as string)
    await MongoConnection.disconnect()
  })
})
