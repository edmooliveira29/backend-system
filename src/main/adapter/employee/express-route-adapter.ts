/** Adaptar o http generico do employee para o http do express */
import { type Request, type Response } from 'express'
import { type EmployeeController } from '../../../interfaces/employee/controllers/employee-adapters'
import { type EmployeeHttpRequest } from '../../../interfaces/employee/ports/employee-http-request'
import { type EmployeeHttpResponse } from '../../../interfaces/employee/ports/employee-http-response'

export const createEmployeeAdapterRoute = (controller: EmployeeController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: EmployeeHttpRequest = {
      body: request.body
    }
    const httpResponse: EmployeeHttpResponse = await controller.create(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

export const editEmployeeAdapterRoute = (controller: EmployeeController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: EmployeeHttpRequest = {
      body: request.body
    }
    const httpResponse: EmployeeHttpResponse = await controller.edit(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

export const getEmployeeAdapterRoute = (controller: EmployeeController) => {
  return async (request: Request, response: Response): Promise<void> => {
    const { companyId } = request.query
    const httpResponse: EmployeeHttpResponse = await controller.getEmployee(companyId as string)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

export const deleteEmployeeAdapterRoute = (controller: EmployeeController) => {
  return async (request: Request, response: Response): Promise<void> => {
    const objectId = request.params.id
    const httpResponse: EmployeeHttpResponse = await controller.deleteEmployee(objectId)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
