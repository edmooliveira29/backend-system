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
  } else {
    res.status(403).send({ error: 'Origin not allowed' })
    console.log(`Response: ${res.statusCode}`)
    console.log(`Request: ${req.method} ${req.url} at ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })};,
    IP: ${req.socket.remoteAddress}, User Agent: ${req.headers['user-agent']}`)
    console.log('Request Body:')
    console.log(JSON.stringify(req.body, null, 4))
    console.log('Response Body:')
    console.log('{\n   error: Origin not allowed\n}')
  }

  next()
}

export const corsOptions = cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin as string)) {
      callback(null, true)
    }
  },
  allowedHeaders: ['Content-Type']
})
