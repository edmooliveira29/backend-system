import { type CustomerData } from '../../../entities/customer/customer-entity'
import { type ICustomerUseCase } from '../../../usecases/customer/port/customer-port'
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
        _id: customerHttpRequest.body._id,
        name: customerHttpRequest.body.name,
        cpf: customerHttpRequest.body.cpf,
        cnpj: customerHttpRequest.body.cnpj,
        legalResponsible: customerHttpRequest.body.legalResponsible,
        fantasyName: customerHttpRequest.body.fantasyName,
        stateRegistration: customerHttpRequest.body.stateRegistration,
        birthday: customerHttpRequest.body.birthday,
        gender: customerHttpRequest.body.gender,
        nickname: customerHttpRequest.body.nickname,
        phoneNumber: customerHttpRequest.body.phoneNumber,
        email: customerHttpRequest.body.email,
        additionalInformation: customerHttpRequest.body.additionalInformation,
        zipCode: customerHttpRequest.body.zipCode,
        street: customerHttpRequest.body.street,
        houseNumber: customerHttpRequest.body.houseNumber,
        complement: customerHttpRequest.body.complement,
        neighborhood: customerHttpRequest.body.neighborhood,
        stateOfTheCountry: customerHttpRequest.body.stateOfTheCountry,
        city: customerHttpRequest.body.city,
        typeCustomer: customerHttpRequest.body.typeCustomer,
        createdAt: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
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
        _id: customerHttpRequest.body._id,
        name: customerHttpRequest.body.name,
        cpf: customerHttpRequest.body.cpf,
        cnpj: customerHttpRequest.body.cnpj,
        legalResponsible: customerHttpRequest.body.legalResponsible,
        fantasyName: customerHttpRequest.body.fantasyName,
        stateRegistration: customerHttpRequest.body.stateRegistration,
        birthday: customerHttpRequest.body.birthday,
        gender: customerHttpRequest.body.gender,
        nickname: customerHttpRequest.body.nickname,
        phoneNumber: customerHttpRequest.body.phoneNumber,
        email: customerHttpRequest.body.email,
        additionalInformation: customerHttpRequest.body.additionalInformation,
        zipCode: customerHttpRequest.body.zipCode,
        street: customerHttpRequest.body.street,
        houseNumber: customerHttpRequest.body.houseNumber,
        complement: customerHttpRequest.body.complement,
        neighborhood: customerHttpRequest.body.neighborhood,
        city: customerHttpRequest.body.city,
        stateOfTheCountry: customerHttpRequest.body.stateOfTheCountry,
        typeCustomer: customerHttpRequest.body.typeCustomer,
        editAt: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
        createdAt: customerHttpRequest.body.createdAt,
        createdBy: customerHttpRequest.body.createdBy
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

  async getCustomer (): Promise<CustomerHttpResponse> {
    try {
      const customerReponseUseCase = await this.customerUseCase.getCustomer()

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
