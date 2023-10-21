import { type Request, type Response } from 'express'
import { type CompanyControllerInterface } from '../../../interfaces/company/controllers/company-adapters'
import { type HttpRequest, type HttpResponse } from '../../../interfaces/company/ports'

export const createCompanyAdapterRoute = (controller: CompanyControllerInterface) => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      body: request.body
    }
    const httpResponse: HttpResponse = await controller.createCompany(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
