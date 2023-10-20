import { type Request, type Response } from 'express'
import { type CompanyController } from '../../../adapters/company/controllers/company-adapters'
import { type CompanyHttpRequest } from '../../../adapters/company/ports/company-http-request'
import { type CompanyHttpResponse } from '../../../adapters/company/ports/company-http-response'

export const createCompanyAdapterRoute = (controller: CompanyController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: CompanyHttpRequest = {
      body: request.body
    }
    const httpResponse: CompanyHttpResponse = await controller.create(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
