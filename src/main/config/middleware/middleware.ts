import { type Express } from 'express'
import { bodyParser } from './body-parser'
import { cors } from './cors'
import { contentType } from './content-type'
import { SwaggerMiddleware } from './swagger'
export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
  const swagger = new SwaggerMiddleware()
  app.use('/v1/docs', swagger.swaggerConfig().server, swagger.swaggerConfig().setup)
}
