/** Adaptar o http generico do product para o http do express */
import { type Request, type Response } from 'express'
import { type ProductController } from '../../../interfaces/product/controllers/product-adapters'
import { type ProductHttpRequest } from '../../../interfaces/product/ports/product-http-request'
import { type ProductHttpResponse } from '../../../interfaces/product/ports/product-http-response'

export const createProductAdapterRoute = (controller: ProductController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: ProductHttpRequest = {
      body: request.body
    }
    const httpResponse: ProductHttpResponse = await controller.create(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

export const editProductAdapterRoute = (controller: ProductController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: ProductHttpRequest = {
      body: request.body
    }
    const httpResponse: ProductHttpResponse = await controller.edit(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

export const getProductAdapterRoute = (controller: ProductController) => {
  return async (request: Request, response: Response): Promise<void> => {
    const { companyId } = request.query

    const httpResponse: ProductHttpResponse = await controller.getProducts(companyId as string)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

export const deleteProductAdapterRoute = (controller: ProductController) => {
  return async (request: Request, response: Response): Promise<void> => {
    const objectId = request.params.id
    const httpResponse: ProductHttpResponse = await controller.deleteProduct(objectId)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
