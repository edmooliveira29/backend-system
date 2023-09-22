import { type Request, type Response, type NextFunction } from 'express'
import cors from 'cors'

const allowedOrigins = ['https://edmopuc.online', 'http://localhost:3000']

export const corsGeneral = (req: Request, res: Response, next: NextFunction): void => {
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
}

export const corsOrigin = (req: Request, res: Response, next: NextFunction): void => {
  const requestOrigin = req.get('origin') as string
  if (allowedOrigins.includes(requestOrigin)) {
    res.header('Access-Control-Allow-Origin', requestOrigin)
  }
  next()
}

export const corsOptions = cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin as string)) {
      callback(null, true)
    } else {
      const error = new Error('Origin not allowed')
      error.stack = ''
      callback(error)
    }
  },
  allowedHeaders: ['Content-Type']
})
