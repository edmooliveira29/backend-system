import { type Request, type Response, type NextFunction } from 'express'
import cors from 'cors'
export const corsGeneral = (req: Request, res: Response, next: NextFunction): void => {
  res.set('access-control-allow-headers', '*')
  res.set('access-control-allow-methods', '*')
  res.set('access-control-allow-credentials', 'true')
  next()
}

const allowedOrigins: string = 'https://api.edmopuc.online, http://localhost:3000'
export const corsOrigin = (req: Request, res: Response, next: NextFunction): void => {
  const requestOrigin = String(req.get('origin'))
  if (allowedOrigins.includes(requestOrigin)) {
    res.set('access-control-allow-origin', requestOrigin)
  }
  next()
}

export const corsOptions = cors({
  origin: ['http://localhost:3000', 'http://localhost:4000'],
  allowedHeaders: ['Content-Type']
})
