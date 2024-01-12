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

  it('Should return 200 if company to be created with success', async () => {
    await request(app)
      .post('/v1/company')
      .send({
        email: 'email-test@gmail.com',
        name: 'Name Test',
        createWithGoogle: false
      })
      .expect(200)
  })

  it('Should return 200 if company to be edited with success', async () => {
    const company = await request(app)
      .post('/v1/company')
      .send({
        email: 'email-test@gmail.com',
        name: 'Name Test',
        createWithGoogle: false
      })
    await request(app)
      .put(`/v1/company/${company.body.data._id}`)
      .send({
        email: 'email-test@gmail.com',
        name: 'Name Test',
        cnpj: 'cnpj-test',
        legalResponsible: 'legalResponsible-test',
        phoneNumber: 'phoneNumber-test',
        city: 'city-test',
        zipCode: 'zipCode-test',
        street: 'street-test',
        houseNumber: 'houseNumber-test',
        neighborhood: 'neighborhood-test',
        stateOfTheCountry: 'stateOfTheCountry-test'
      })

    expect(company.statusCode).toBe(200)
  })

  it('Should return 200 with get all companies with success', async () => {
    const company = await request(app)
      .post('/v1/company')
      .send({
        email: 'email-test@gmail.com',
        name: 'Name Test',
        createWithGoogle: false
      })
    await request(app)
      .get('/v1/company?objectId=' + company.body.data._id)
      .expect(200)
    expect(company.body.data).toBeDefined()
  })

  it('Shoul return error 500 if company exists', async () => {
    await request(app)
      .post('/v1/company')
      .send({
        email: 'email-test@gmail.com',
        name: 'Name Test',
        createWithGoogle: false
      })

    const company = await request(app)
      .post('/v1/company')
      .send({
        email: 'email-test@gmail.com',
        name: 'Name Test',
        createWithGoogle: false
      })
      .expect(500)

    expect(company.body.message).toBe('Erro do servidor: Já existe uma empresa com este e-mail.')
  })

  it('Should return 400 with not provided name', async () => {
    const company = await request(app)
      .post('/v1/company')
      .send({
        email: 'email-test@gmail.com',
        createWithGoogle: false
      }).expect(400)
    expect(company.body.message).toBe('Parâmetro ausente: name.')
  })
})

describe('Open conection in production', () => {
  it('Should connect without authentication in test environment', async () => {
    process.env.NODE_ENV = ''
    await MongoConnection.connect(process.env.MONGO_URL as string)
    await MongoConnection.disconnect()
  })
})
