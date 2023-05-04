import * as swaggerJson from '../../../../swagger/swagger.json'
import * as swaggerUI from 'swagger-ui-express'

export class SwaggerMiddleware {
  swaggerConfig (): any {
    return {
      server: swaggerUI.serve,
      setup: swaggerUI.setup(swaggerJson)
    }
  }
}
