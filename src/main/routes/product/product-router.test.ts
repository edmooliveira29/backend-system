import request from 'supertest'
import app from '../../config/app'
import { MongoConnection } from '../../../infra/helpers/mongo-helper'
import dotenv from 'dotenv'
dotenv.config()
describe('Register Routes', () => {
  let category: any
  beforeEach(async () => {
    await MongoConnection.connect(process.env.MONGO_URL_TEST as string)
    await MongoConnection.clearCollection('products')
    await MongoConnection.clearCollection('categories')
    category = await request(app)
      .post('/v1/category')
      .send({
        name: 'Name Test',
        type: 'anyType',
        description: 'anyDescription'
      })
  })

  afterEach(async () => {
    await MongoConnection.disconnect()
  })

  it('Should return 200 if product to be created with success', async () => {
    await request(app)
      .post('/v1/product')
      .send({
        name: 'Name Test',
        description: 'anyDescription',
        category: category.body.data._id,
        quantityInStock: 10,
        price: 10
      })
      .expect(200)
  })

  it('Should return 200 if product to be edited with success', async () => {
    const product = await request(app)
      .post('/v1/product')
      .send({
        type: 'anyType',
        name: 'Name Test',
        description: 'anyDescription',
        category: category.body.data._id,
        quantityInStock: 10,
        price: 10
      })
    const productAfterUpdate = await request(app)
      .put(`/v1/product/${product.body.data._id}`)
      .send({
        name: 'Name Test Updated',
        description: 'anyDescription',
        category: category.body.data._id,
        quantityInStock: 10,
        price: 10
      })
    expect(productAfterUpdate.statusCode).toBe(200)
  })

  it('Should return 200 with get all products with success', async () => {
    await request(app)
      .post('/v1/product')
      .send({
        name: 'Name Test Updated',
        description: 'anyDescription',
        category: category.body.data._id,
        quantityInStock: 10,
        price: 10
      })
    const product = await request(app)
      .get('/v1/product')

    expect(product.body.data.length).toBe(1)
  })

  it('Should return 200 with delete product with success', async () => {
    await request(app)
      .post('/v1/product')
      .send({
        name: 'Name Test',
        description: 'anyDescription',
        category: category.body.data._id,
        quantityInStock: 10,
        price: 10
      })

    const productAfterInsert = await request(app)
      .get('/v1/product')
      .expect(200)

    expect(productAfterInsert.body.data.length).toBe(1)

    await request(app)
      .delete(`/v1/product/${productAfterInsert.body.data[0]._id}`).send({ a: 1 })
      .expect(200)
    const productAfterDelete = await request(app)
      .get('/v1/product')
      .expect(200)
    expect(productAfterDelete.body.data.length).toBe(0)
  })

  it('Shoul return error 500 if product exists', async () => {
    await request(app)
      .post('/v1/product')
      .send({
        name: 'Name Test',
        description: 'anyDescription',
        category: category.body.data._id,
        quantityInStock: 10,
        price: 10
      })

    const product = await request(app)
      .post('/v1/product')
      .send({
        name: 'Name Test',
        description: 'anyDescription',
        category: category.body.data._id,
        quantityInStock: 10,
        price: 10
      })
      .expect(500)

    expect(product.body.message).toBe('Erro do servidor: Já existe um produto com este nome.')
  })

  it('Should return 400 with not provided name', async () => {
    const product = await request(app)
      .post('/v1/product')
      .send({
        type: 'anyType',
        description: 'anyDescription',
        category: category.body.data._id,
        quantityInStock: 10,
        price: 10
      }).expect(400)
    expect(product.body.message).toBe('Parâmetro ausente: name.')
  })
})

describe('Open conection in production', () => {
  it('Should connect without authentication in test environment', async () => {
    process.env.NODE_ENV = ''
    await MongoConnection.connect(process.env.MONGO_URL as string)
    await MongoConnection.disconnect()
  })
})
