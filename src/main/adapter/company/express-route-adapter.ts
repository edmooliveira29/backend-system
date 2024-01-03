/** Adaptar o http generico do company para o http do express */
import { type Request, type Response } from 'express'
import { type CompanyController } from '../../../interfaces/company/controllers/company-adapters'
import { type CompanyHttpRequest } from '../../../interfaces/company/ports/company-http-request'
import { type CompanyHttpResponse } from '../../../interfaces/company/ports/company-http-response'

export const createCompanyAdapterRoute = (controller: CompanyController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: CompanyHttpRequest = {
      body: request.body
    }
    const httpResponse: CompanyHttpResponse = await controller.create(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

export const getCompanyAdapterRoute = (controller: CompanyController) => {
  return async (request: Request, response: Response): Promise<void> => {
    const objectId = request.query.objectId as string
    const httpResponse: CompanyHttpResponse = await controller.getCompany(objectId)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

export const editCompanyAdapterRoute = (controller: CompanyController) => {
  return async (request: Request, response: Response): Promise<void> => {
    const httpRequest: CompanyHttpRequest = {
      body: request.body
    }
    const httpResponse: CompanyHttpResponse = await controller.editCompany(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
