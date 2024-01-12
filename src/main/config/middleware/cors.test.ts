import { type Request, type Response, type NextFunction } from 'express'
import { corsGeneral, corsOrigin } from './cors'

describe('CORS Middleware', () => {
  let req: Request
  let res: Response
  let next: NextFunction

  beforeEach(() => {
    req = {} as any
    res = { header: jest.fn(), status: { send: jest.fn() } } as any
    next = jest.fn() as NextFunction
    res.set = jest.fn()
  })

  describe('corsGeneral', () => {
    it('Should set the appropriate headers', () => {
      corsGeneral(req, res, next)
      expect(next).toHaveBeenCalled()
    })
  })

  it('Should set access-control-allow-origin header if request origin is allowed', () => {
    const requestOrigin = 'http://localhost:3000'
    req.get = jest.fn().mockReturnValue(requestOrigin)
    corsOrigin(req, res, next)

    expect(next).toHaveBeenCalled()
  })
  it('Should not set access-control-allow-origin header if request origin is not allowed', () => {
    const mockRes: Response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      header: jest.fn()
    } as any

    const requestOrigin = 'url_not_allowed'
    process.env.NODE_ENV = 'url_not_allowed'
    req.get = jest.fn().mockReturnValue(requestOrigin)
    req.socket = jest.fn().mockReturnValue({ remoteAddress: 'url_not_allowed' }) as any
    req.headers = jest.fn().mockReturnValue({ 'user-agent': 'url_not_allowed' }) as any
    corsOrigin(req, mockRes, next)
    expect(mockRes.status).toHaveBeenCalledWith(403)
    expect(mockRes.send).toHaveBeenCalledWith({ error: 'Origin not allowed' })
  })
})
