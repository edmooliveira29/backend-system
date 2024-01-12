import request from 'supertest'
import app from '../../config/app'
import { MongoConnection } from '../../../infra/helpers/mongo-helper'
import dotenv from 'dotenv'
dotenv.config()
describe('Register Routes', () => {
  let category: any
  beforeEach(async () => {
    await MongoConnection.connect(process.env.MONGO_URL_TEST as string)
    await MongoConnection.clearCollection('sales')
    await MongoConnection.clearCollection('categories')
    await MongoConnection.clearCollection('customers')
    await MongoConnection.clearCollection('products')

    await request(app)
      .post('/v1/customer')
      .send({
        typeCustomer: 'natural',
        name: 'Name Test',
        cpf: '000.000.000-00',
        cnpj: '',
        legalResponsible: '',
        gender: 'male',
        phoneNumber: ' (99) 99999-9999',
        email: 'test@email.com',
        additionalInformation: 'Informations',
        zipCode: '35183-420',
        street: 'Rua a',
        houseNumber: '159',
        complement: 'House',
        neighborhood: 'Center',
        stateOfTheCountry: 'AL',
        city: 'Anadia',
        fantasyName: ''
      })
    category = await request(app)
      .post('/v1/category')
      .send({
        name: 'Name Test',
        type: 'anyType',
        description: 'anyDescription'
      })
    await request(app)
      .post('/v1/product')
      .send({
        type: 'anyType',
        name: 'Name Test',
        description: 'anyDescription',
        category: category.body.data._id,
        quantityInStock: 10,
        price: 10
      })
  })

  afterEach(async () => {
    await MongoConnection.disconnect()
  })

  it('Should return 200 if sale to be created with success', async () => {
    await request(app)
      .get('/v1/report')
  })
})

describe('Open conection in production', () => {
  it('Should connect without authentication in test environment', async () => {
    process.env.NODE_ENV = ''
    await MongoConnection.connect(process.env.MONGO_URL as string)
    await MongoConnection.disconnect()
  })
})
