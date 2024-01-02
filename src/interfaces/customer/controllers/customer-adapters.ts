import { type CustomerData } from '../../../entities/customer/customer-entity'
import { type ICustomerUseCase } from '../../../usecases/customer/port/customer-port'
import { formatNowDate } from '../../../utils/data'
import { badRequest, internalError, noContent, ok } from '../../helpers/http-helper'
import { InvalidParamError, MissingParamError, NotFound, ServerError } from '../errors'
import { type CustomerHttpRequest, type CustomerHttpResponse } from '../ports'

export class CustomerController {
  public readonly customerUseCase: ICustomerUseCase

  constructor (customerUseCase: ICustomerUseCase) {
    this.customerUseCase = customerUseCase
  }

  async create (customerHttpRequest: CustomerHttpRequest): Promise<CustomerHttpResponse> {
    try {
      const customerData: any = {
        ...customerHttpRequest.body,
        createdAt: formatNowDate()
      }
      const fieldsRequired = ['name', 'phoneNumber', 'email', 'city',
        'zipCode', 'street', 'houseNumber', 'neighborhood', 'stateOfTheCountry']
      for (const field of fieldsRequired) {
        const fieldExists = Object.prototype.hasOwnProperty.call(customerData, field)
        const value = customerData[`${field}`]
        if (!fieldExists || value === undefined || value == null) {
          return badRequest(new MissingParamError(field))
        }
      }
      const createCustomerResponse = await this.customerUseCase.createCustomer(customerData)
      if (createCustomerResponse.message !== 'Cliente criado com sucesso') {
        return badRequest(new InvalidParamError(createCustomerResponse.message))
      }
      return ok(createCustomerResponse)
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }

  async edit (customerHttpRequest: CustomerHttpRequest): Promise<CustomerHttpResponse> {
    try {
      const customerData: CustomerData = {
        ...customerHttpRequest.body,
        editAt: formatNowDate()
      }

      const fieldsRequired = ['name', 'phoneNumber', 'email', 'city',
        'zipCode', 'street', 'houseNumber', 'neighborhood', 'stateOfTheCountry']
      for (const field of fieldsRequired) {
        if (!Object.prototype.hasOwnProperty.call(customerHttpRequest.body, field)) {
          return badRequest(new MissingParamError(field))
        }
      }
      const createCustomerResponse = await this.customerUseCase.editCustomer(customerHttpRequest.body._id, customerData)

      if (!createCustomerResponse.data) {
        return badRequest(new InvalidParamError(createCustomerResponse.message))
      }
      return ok(createCustomerResponse)
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }

  async getCustomer (companyId: string): Promise<CustomerHttpResponse> {
    try {
      const customerReponseUseCase = await this.customerUseCase.getCustomer(companyId)

      if (!customerReponseUseCase.data) {
        return noContent(new NotFound(customerReponseUseCase.message))
      }
      return ok({ message: customerReponseUseCase.message, ...customerReponseUseCase })
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }

  async deleteCustomer (_id: string): Promise<CustomerHttpResponse> {
    try {
      const customerReponseUseCase = await this.customerUseCase.deleteCustomer(_id)
      return ok({ message: customerReponseUseCase.message, data: customerReponseUseCase.data })
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }
}
