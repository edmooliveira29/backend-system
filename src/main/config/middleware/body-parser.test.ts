import request from 'supertest'
import app from '../app'

describe('Body parser Middleware', () => {
  test('Should parse body as json', async () => {
    app.post('/test_body_parser', (req: any, res: any) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Otavio' })
      .expect({ name: 'Otavio' })
  })
})
