import { type IEmployeeCreateUseCase } from '../../../usecases/employee/port/employee-port'
import { formatNowDate } from '../../../utils/data'
import { badRequest, internalError, noContent, ok } from '../../helpers/http-helper'
import { InvalidParamError, MissingParamError, NotFound, ServerError } from '../errors'
import { type EmployeeHttpRequest, type EmployeeHttpResponse } from '../ports'

export class EmployeeController {
  public readonly employeeUseCase: IEmployeeCreateUseCase

  constructor (employeeUseCase: IEmployeeCreateUseCase) {
    this.employeeUseCase = employeeUseCase
  }

  async create (employeeHttpRequest: EmployeeHttpRequest): Promise<EmployeeHttpResponse> {
    try {
      const employeeData: any = {
        ...employeeHttpRequest.body,
        createdAt: formatNowDate()
      }
      const fieldsRequired = ['name', 'cpf', 'birthday', 'gender', 'phoneNumber', 'email',
        'office', 'hiringDate', 'wage', 'zipCode', 'street', 'houseNumber', 'neighborhood', 'stateOfTheCountry']
      for (const field of fieldsRequired) {
        const fieldExists = Object.prototype.hasOwnProperty.call(employeeData, field)
        const value = employeeData[`${field}`]
        if (!fieldExists || value === undefined || value == null) {
          return badRequest(new MissingParamError(field))
        }
      }
      const createEmployeeResponse = await this.employeeUseCase.createEmployee(employeeData)
      if (createEmployeeResponse.message !== 'Colaborador criado com sucesso') {
        return badRequest(new InvalidParamError(createEmployeeResponse.message))
      }
      return ok(createEmployeeResponse)
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }

  async edit (employeeHttpRequest: EmployeeHttpRequest): Promise<EmployeeHttpResponse> {
    try {
      const employeeData: any = {
        ...employeeHttpRequest.body,
        editAt: formatNowDate()
      }

      const fieldsRequired = ['name', 'gender', 'phoneNumber', 'email', 'city',
        'office', 'hiringDate', 'wage', 'zipCode', 'street', 'houseNumber', 'neighborhood', 'stateOfTheCountry']
      for (const field of fieldsRequired) {
        if (!Object.prototype.hasOwnProperty.call(employeeHttpRequest.body, field)) {
          return badRequest(new MissingParamError(field))
        }
      }
      const createEmployeeResponse = await this.employeeUseCase.editEmployee(employeeHttpRequest.body._id, employeeData)

      if (!createEmployeeResponse.data) {
        return badRequest(new InvalidParamError(createEmployeeResponse.message))
      }
      return ok(createEmployeeResponse)
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }

  async getEmployee (companyId: string): Promise<EmployeeHttpResponse> {
    try {
      const employeeReponseUseCase = await this.employeeUseCase.getEmployee(companyId)

      if (!employeeReponseUseCase.data) {
        return noContent(new NotFound(employeeReponseUseCase.message))
      }
      return ok({ message: employeeReponseUseCase.message, ...employeeReponseUseCase.data })
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }

  async deleteEmployee (objectId: string): Promise<EmployeeHttpResponse> {
    try {
      const employeeReponseUseCase = await this.employeeUseCase.deleteEmployee(objectId)
      return ok({ message: employeeReponseUseCase.message, data: employeeReponseUseCase.data })
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }
}
