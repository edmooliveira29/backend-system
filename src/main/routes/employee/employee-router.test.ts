import request from 'supertest'
import app from '../../config/app'
import { MongoConnection } from '../../../infra/helpers/mongo-helper'
import dotenv from 'dotenv'
dotenv.config()
describe('Register Routes', () => {
  let employeeRequest: any
  beforeEach(async () => {
    await MongoConnection.connect(process.env.MONGO_URL_TEST as string)
    await MongoConnection.clearCollection('employees')
    employeeRequest = {
      name: 'Name Test',
      cpf: '000.000.000-00',
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
      stateRegistration: '',
      birthday: '1999-01-10T02:00:00.000Z',
      nickname: 'Nickname',
      office: 'office',
      hiringDate: '2022-01-10T02:00:00.000Z',
      department: 'department',
      wage: 10000
    }
  })

  afterEach(async () => {
    await MongoConnection.disconnect()
  })

  it('Should return 200 if employee to be created with success', async () => {
    await request(app)
      .post('/v1/employee')
      .send(employeeRequest)
      .expect(200)
  })

  it('Should return 200 if employee to be edited with success', async () => {
    const employee = await request(app)
      .post('/v1/employee')
      .send(employeeRequest)
    await request(app)
      .put(`/v1/employee/${employee.body.data._id}`)
      .send(employeeRequest)

    expect(employee.statusCode).toBe(200)
  })

  it('Should return 200 with get all employees with success', async () => {
    await request(app)
      .post('/v1/employee')
      .send(employeeRequest)
    const employee = await request(app)
      .get('/v1/employee')
      .expect(200)
    expect(employee.body.data.length).toBe(1)
  })

  it('Should return 200 with delete employee with success', async () => {
    await request(app)
      .post('/v1/employee')
      .send(employeeRequest)

    const customerAfterInsert = await request(app)
      .get('/v1/employee')
      .expect(200)

    expect(customerAfterInsert.body.data.length).toBe(1)

    await request(app)
      .delete(`/v1/employee/${customerAfterInsert.body.data[0]._id}`)
      .expect(200)
    const customerAfterDelete = await request(app)
      .get('/v1/employee')
      .expect(200)
    expect(customerAfterDelete.body.data.length).toBe(0)
  })

  it('Shoul return error 500 if employee exists', async () => {
    await request(app)
      .post('/v1/employee')
      .send(employeeRequest)

    const employee = await request(app)
      .post('/v1/employee')
      .send(employeeRequest)
      .expect(500)

    expect(employee.body.message).toBe('Erro do servidor: Já existe um colaborador com este e-mail.')
  })

  it('Should return 400 with not provided name', async () => {
    delete employeeRequest.name
    const employee = await request(app)
      .post('/v1/employee')
      .send(employeeRequest).expect(400)
    expect(employee.body.message).toBe('Parâmetro ausente: name.')
  })
})

describe('Open conection in production', () => {
  it('Should connect without authentication in test environment', async () => {
    process.env.NODE_ENV = ''
    await MongoConnection.connect(process.env.MONGO_URL as string)
    await MongoConnection.disconnect()
  })
})
