import { type Express } from 'express'
import { bodyParser } from './body-parser'
import { cors } from './cors'
import { contentType } from './content-type'
import { corsSite } from './corsSite'
export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(corsSite)
  app.use(contentType)
}
