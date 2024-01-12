import app from '../app'
import supertest from 'supertest'

describe('bodyParser', () => {
  it('should parse body', async () => {
    const response = await supertest(app)
      .post('/test')
      .send({ key: 'value' })
      .expect(200)

    expect(response.body).toEqual({ key: 'value' })
  })
})
