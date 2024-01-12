import request from 'supertest'
import app from '../../config/app'
import { MongoConnection } from '../../../infra/helpers/mongo-helper'
import dotenv from 'dotenv'
dotenv.config()
describe('Register Routes', () => {
  let category: any
  let product: any
  let saleRequest: any
  beforeEach(async () => {
    await MongoConnection.connect(process.env.MONGO_URL_TEST as string)
    await MongoConnection.clearCollection('sales')
    await MongoConnection.clearCollection('categories')
    await MongoConnection.clearCollection('customers')
    await MongoConnection.clearCollection('products')

    const customer = await request(app)
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
    product = await request(app)
      .post('/v1/product')
      .send({
        type: 'anyType',
        name: 'Name Test',
        description: 'anyDescription',
        category: category.body.data._id,
        quantityInStock: 10,
        price: 10
      })

    saleRequest = {
      customer: customer.body.data,
      dateOfSale: '2024-01-12T10:34:52',
      formOfPayment: [
        'Boleto'
      ],
      products: [
        {
          'productId-0': {
            ...product.body.data,
            name: 'PRODUCT 1',
            description: '',
            category: category.body.data,
            price: '0,50',
            quantityInStock: '200'
          },
          'quantity-0': '1',
          'unitValue-0': '0,50',
          'subTotal-0': '0,50'
        }
      ],
      description: '',
      discount: '',
      typeOfDiscount: false,
      informationAboutTheSale: '',
      resumeOfSale: {
        totalAmount: '0,50',
        valueDiscount: '',
        totalOfSale: '0,50'
      }
    }
  })

  afterEach(async () => {
    await MongoConnection.disconnect()
  })

  it('Should return 200 if sale to be created with success', async () => {
    await request(app)
      .post('/v1/sale')
      .send(saleRequest)
      .expect(200)
  })

  it('Should return 200 if category to be edited with success', async () => {
    const sale = await request(app)
      .post('/v1/sale')
      .send(saleRequest)
      .expect(200)
    saleRequest.description = 'anyDescription Edited'
    const saleEdit = await request(app)
      .put(`/v1/sale/${sale.body.data._id}`)
      .send(saleRequest)
    expect(saleEdit.statusCode).toBe(200)
  })

  it('Should return 200 with get all sales with success', async () => {
    await request(app)
      .post('/v1/sale')
      .send(saleRequest)
    const sale = await request(app)
      .get('/v1/sale')

    expect(sale.body.data.length).toBe(1)
  })

  it('Should return 200 with delete sale with success', async () => {
    await request(app)
      .post('/v1/sale')
      .send(saleRequest)

    const productAfterInsert = await request(app)
      .get('/v1/sale')
      .expect(200)

    expect(productAfterInsert.body.data.length).toBe(1)

    await request(app)
      .delete(`/v1/sale/${productAfterInsert.body.data[0]._id}`).send({ a: 1 })
      .expect(200)
    const productAfterDelete = await request(app)
      .get('/v1/sale')
      .expect(200)
    expect(productAfterDelete.body.data.length).toBe(0)
  })
  it('Should return 400 with not provided name', async () => {
    delete saleRequest.customer
    const category = await request(app)
      .post('/v1/sale')
      .send(saleRequest).expect(400)
    expect(category.body.message).toBe('Parâmetro ausente: customer.')
  })
})

describe('Open conection in production', () => {
  it('Should connect without authentication in test environment', async () => {
    process.env.NODE_ENV = ''
    await MongoConnection.connect(process.env.MONGO_URL as string)
    await MongoConnection.disconnect()
  })
})
