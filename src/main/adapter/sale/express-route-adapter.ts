/** Adaptar o http generico do sale para o http do express */
import { type Request, type Response } from 'express'
import { type SaleController } from '../../../interfaces/sale/controllers/sale-adapters'
import { type SaleHttpRequest } from '../../../interfaces/sale/ports/sale-http-request'
import { type SaleHttpResponse } from '../../../interfaces/sale/ports/sale-http-response'

export const createSaleAdapterRoute = (controller: SaleController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: SaleHttpRequest = {
      body: request.body
    }
    const httpResponse: SaleHttpResponse = await controller.create(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

export const editSaleAdapterRoute = (controller: SaleController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: SaleHttpRequest = {
      body: request.body
    }
    const httpResponse: SaleHttpResponse = await controller.edit(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

export const getSaleAdapterRoute = (controller: SaleController) => {
  return async (request: Request, response: Response): Promise<void> => {
    const objectId = request.query.objectId as string
    const httpResponse: SaleHttpResponse = await controller.getSale(objectId)
    console.log(httpResponse.body)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

export const deleteSaleAdapterRoute = (controller: SaleController) => {
  return async (request: Request, response: Response): Promise<void> => {
    const objectId = request.params.id
    const httpResponse: SaleHttpResponse = await controller.deleteSale(objectId)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
