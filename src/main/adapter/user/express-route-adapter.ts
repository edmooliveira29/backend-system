/** Adaptar o http generico do user para o http do express */
import { type Request, type Response } from 'express'
import { type UserController } from '../../../interfaces/user/controllers/user-adapters'
import { type UserHttpRequest } from '../../../interfaces/user/ports/user-http-request'
import { type UserHttpResponse } from '../../../interfaces/user/ports/user-http-response'

export const createUserAdapterRoute = (controller: UserController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: UserHttpRequest = {
      body: request.body
    }
    const httpResponse: UserHttpResponse = await controller.create(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

export const editUserAdapterRoute = (controller: UserController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: UserHttpRequest = {
      body: request.body
    }
    const httpResponse: UserHttpResponse = await controller.edit(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

export const loginUserAdapterRoute = (controller: UserController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: UserHttpRequest = {
      body: request.body
    }
    const httpResponse: UserHttpResponse = await controller.login(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

export const getUserAdapterRoute = (controller: UserController) => {
  return async (request: Request, response: Response): Promise<void> => {
    const objectId = request.query.objectId as string
    const httpResponse: UserHttpResponse = await controller.getUser(objectId)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

export const deleteUserAdapterRoute = (controller: UserController) => {
  return async (request: Request, response: Response): Promise<void> => {
    const objectId = request.params.id
    const httpResponse: UserHttpResponse = await controller.deleteUser(objectId)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
