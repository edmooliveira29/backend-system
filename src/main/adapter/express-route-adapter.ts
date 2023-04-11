/** Adaptar o http generico do user para o http do express */
import { type Request, type Response } from 'express'
import { type UserController } from '../../adapters/user/controllers/user-adapters'
import { type UserHttpRequest } from '../../adapters/user/ports/user-http-request'
import { type UserHttpResponse } from '../../adapters/user/ports/user-http-response'

export const adapterRoute = (controller: UserController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: UserHttpRequest = {
      body: request.body
    }
    const httpResponse: UserHttpResponse = await controller.create(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
