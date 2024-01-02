/** Adaptar o http generico do category para o http do express */
import { type Request, type Response } from 'express'
import { type CategoryController } from '../../../interfaces/category/controllers/category-adapters'
import { type CategoryHttpRequest } from '../../../interfaces/category/ports/category-http-request'
import { type CategoryHttpResponse } from '../../../interfaces/category/ports/category-http-response'

export const createCategoryAdapterRoute = (controller: CategoryController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: CategoryHttpRequest = {
      body: request.body
    }
    const httpResponse: CategoryHttpResponse = await controller.create(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

export const editCategoryAdapterRoute = (controller: CategoryController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: CategoryHttpRequest = {
      body: request.body
    }
    const httpResponse: CategoryHttpResponse = await controller.edit(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

export const getCategoryAdapterRoute = (controller: CategoryController) => {
  return async (request: Request, response: Response): Promise<void> => {
    const createdByTheCompany = request.query
    console.log(createdByTheCompany)
    const httpResponse: CategoryHttpResponse = await controller.getCategory('')
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

export const deleteCategoryAdapterRoute = (controller: CategoryController) => {
  return async (request: Request, response: Response): Promise<void> => {
    const objectId = request.params.id
    const httpResponse: CategoryHttpResponse = await controller.deleteCategory(objectId)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
