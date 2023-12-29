import { type ISaleCreateUseCase } from '../../../usecases/sale/port/sale-port'
import { badRequest, internalError, noContent, ok } from '../../helpers/http-helper'
import { InvalidParamError, MissingParamError, NotFound, ServerError } from '../errors'
import { type SaleHttpRequest, type SaleHttpResponse } from '../ports'

export class SaleController {
  public readonly saleUseCase: ISaleCreateUseCase

  constructor (saleUseCase: ISaleCreateUseCase) {
    this.saleUseCase = saleUseCase
  }

  async create (saleHttpRequest: SaleHttpRequest): Promise<SaleHttpResponse> {
    try {
      const saleData: any = {
        ...saleHttpRequest.body,
        createdAt: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      }
      const fieldsRequired = ['dateOfSale', 'customer', 'formOfPayment']
      for (const field of fieldsRequired) {
        const fieldExists = Object.prototype.hasOwnProperty.call(saleData, field)
        const value = saleData[`${field}`]
        if (!fieldExists || value === undefined || value == null) {
          return badRequest(new MissingParamError(field))
        }
      }
      const createSaleResponse = await this.saleUseCase.createSale(saleData)
      if (createSaleResponse.message !== 'Venda criada com sucesso') {
        return badRequest(new InvalidParamError(createSaleResponse.message))
      }
      return ok(createSaleResponse)
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }

  async edit (saleHttpRequest: SaleHttpRequest): Promise<SaleHttpResponse> {
    try {
      const saleData = {
        ...saleHttpRequest.body,
        editAt: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      }

      const fieldsRequired = ['dateOfSale', 'customer', 'formOfPayment']
      for (const field of fieldsRequired) {
        if (!Object.prototype.hasOwnProperty.call(saleHttpRequest.body, field)) {
          return badRequest(new MissingParamError(field))
        }
      }
      const createSaleResponse = await this.saleUseCase.editSale(saleHttpRequest.body._id, saleData)

      if (!createSaleResponse.data) {
        return badRequest(new InvalidParamError(createSaleResponse.message))
      }
      return ok(createSaleResponse)
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }

  async getSale (objectId: string): Promise<SaleHttpResponse> {
    try {
      const saleReponseUseCase = await this.saleUseCase.getSale(objectId)

      if (!saleReponseUseCase.data) {
        return noContent(new NotFound(saleReponseUseCase.message))
      }
      return ok({ message: saleReponseUseCase.message, ...saleReponseUseCase.data })
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }

  async deleteSale (objectId: string): Promise<SaleHttpResponse> {
    try {
      const saleReponseUseCase = await this.saleUseCase.deleteSale(objectId)
      return ok({ message: saleReponseUseCase.message, data: saleReponseUseCase.data })
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }
}
