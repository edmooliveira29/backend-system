import { type Request, type Response, type NextFunction } from 'express'
import { corsGeneral, corsOrigin } from './cors'

describe('CORS Middleware', () => {
  let req: Request
  let res: Response
  let next: NextFunction

  beforeEach(() => {
    req = {} as any
    res = {} as any
    next = jest.fn() as NextFunction
    res.set = jest.fn()
  })

  describe('corsGeneral', () => {
    test('Should set the appropriate headers', () => {
      corsGeneral(req, res, next)

      expect(res.set).toHaveBeenCalledWith('access-control-allow-headers', '*')
      expect(res.set).toHaveBeenCalledWith('access-control-allow-methods', '*')
      expect(res.set).toHaveBeenCalledWith('access-control-allow-credentials', 'true')
      expect(next).toHaveBeenCalled()
    })
  })

  test('Should set access-control-allow-origin header if request origin is allowed', () => {
    const requestOrigin = 'http://localhost:3000'
    req.get = jest.fn().mockReturnValue(requestOrigin)

    corsOrigin(req, res, next)

    expect(res.set).toHaveBeenCalledWith('access-control-allow-origin', requestOrigin)
    expect(next).toHaveBeenCalled()
  })
})
