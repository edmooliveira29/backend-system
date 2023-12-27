/** Adaptar o http generico do customer para o http do express */
import { type Request, type Response } from 'express'
import { type CustomerController } from '../../../interfaces/customer/controllers/customer-adapters'
import { type CustomerHttpRequest } from '../../../interfaces/customer/ports/customer-http-request'
import { type CustomerHttpResponse } from '../../../interfaces/customer/ports/customer-http-response'

export const createCustomerAdapterRoute = (controller: CustomerController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: CustomerHttpRequest = {
      body: request.body
    }
    const httpResponse: CustomerHttpResponse = await controller.create(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

export const editCustomerAdapterRoute = (controller: CustomerController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: CustomerHttpRequest = {
      body: request.body
    }
    const httpResponse: CustomerHttpResponse = await controller.edit(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

export const getCustomerAdapterRoute = (controller: CustomerController) => {
  return async (request: Request, response: Response): Promise<void> => {
    const objectId = request.query.objectId as string
    const httpResponse: CustomerHttpResponse = await controller.getCustomer(objectId)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

export const deleteCustomerAdapterRoute = (controller: CustomerController) => {
  return async (request: Request, response: Response): Promise<void> => {
    const objectId = request.params.id
    const httpResponse: CustomerHttpResponse = await controller.deleteCustomer(objectId)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
