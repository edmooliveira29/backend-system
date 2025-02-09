import { type Express } from 'express'
import { bodyParser } from './body-parser'
import { contentType } from './content-type'
import { corsGeneral, corsOptions, corsOrigin } from './cors'
import morganBody from 'morgan-body'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(contentType)
  app.use(corsGeneral)
  app.use(corsOrigin)
  app.use(corsOptions)
  if (process.env.NODE_ENV === 'development') {
    morganBody(app, { timezone: 'America/Sao_Paulo', includeFinalNewLine: true, includeNewLine: true, stream: process.stdout })
  }
}
