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
    await MongoConnection.clearCollection('customers')
  })

  it('Should return 200 if customer to be created with success', async () => {
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
        fantasyName: '',
        stateRegistration: '',
        birthday: '1999-01-10T02:00:00.000Z',
        nickname: 'Nickname'

      })
      .expect(200)
  })

  it('Should return 200 if customer to be edited with success', async () => {
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
        fantasyName: '',
        stateRegistration: '',
        birthday: '1999-01-10T02:00:00.000Z',
        nickname: 'Nickname'
      })
    await request(app)
      .put(`/v1/customer/${customer.body.data._id}`)
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
        fantasyName: '',
        stateRegistration: '',
        birthday: '1999-01-10T02:00:00.000Z',
        nickname: 'Nickname'
      })

    expect(customer.statusCode).toBe(200)
  })

  it('Should return 200 with get all customers with success', async () => {
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
        fantasyName: '',
        stateRegistration: '',
        birthday: '1999-01-10T02:00:00.000Z',
        nickname: 'Nickname'
      })
    const customer = await request(app)
      .get('/v1/customer')
      .expect(200)
    expect(customer.body.data.length).toBe(1)
  })

  it('Should return 200 with delete customer with success', async () => {
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
        fantasyName: '',
        stateRegistration: '',
        birthday: '1999-01-10T02:00:00.000Z',
        nickname: 'Nickname'
      })

    const customerAfterInsert = await request(app)
      .get('/v1/customer')
      .expect(200)

    expect(customerAfterInsert.body.data.length).toBe(1)

    await request(app)
      .delete(`/v1/customer/${customerAfterInsert.body.data[0]._id}`)
      .expect(200)
    const customerAfterDelete = await request(app)
      .get('/v1/customer')
      .expect(200)
    expect(customerAfterDelete.body.data.length).toBe(0)
  })

  it('Shoul return error 500 if customer exists', async () => {
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
        fantasyName: '',
        stateRegistration: '',
        birthday: '1999-01-10T02:00:00.000Z',
        nickname: 'Nickname'
      })

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
        fantasyName: '',
        stateRegistration: '',
        birthday: '1999-01-10T02:00:00.000Z',
        nickname: 'Nickname'
      })
      .expect(500)

    expect(customer.body.message).toBe('Erro do servidor: Já existe um cliente com este cpf/cnpj.')
  })

  it('Should return 400 with not provided name', async () => {
    const customer = await request(app)
      .post('/v1/customer')
      .send({
        typeCustomer: 'natural',
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
        fantasyName: '',
        stateRegistration: '',
        birthday: '1999-01-10T02:00:00.000Z',
        nickname: 'Nickname'
      }).expect(400)
    expect(customer.body.message).toBe('Parâmetro ausente: name.')
  })
})

describe('Open conection in production', () => {
  it('Should connect without authentication in test environment', async () => {
    process.env.NODE_ENV = ''
    await MongoConnection.connect(process.env.MONGO_URL as string)
    await MongoConnection.disconnect()
  })
})
