import { type CompanyHttpRequest, type CompanyHttpResponse } from '../ports'
import { type ICompanyUseCase } from '../../../usecases/company/port/company-port'
import { badRequest, internalError, ok } from '../../helpers/http-helper'
import { InvalidParamError, MissingParamError, ServerError } from '../errors'
import { formatNowDate } from '../../../utils/data'

export class CompanyController {
  public readonly companyUseCase: ICompanyUseCase

  constructor (companyUseCase: ICompanyUseCase) {
    this.companyUseCase = companyUseCase
  }

  async create (companyHttpRequest: CompanyHttpRequest): Promise<CompanyHttpResponse> {
    try {
      const companyData: any = {
        ...companyHttpRequest.body,
        createdAt: formatNowDate()
      }

      const fieldsRequired = ['name']
      for (const field of fieldsRequired) {
        const fieldExists = Object.prototype.hasOwnProperty.call(companyData, field)
        const value = companyData[`${field}`]
        if (!fieldExists || value === undefined || value == null) {
          return badRequest(new MissingParamError(field))
        }
      }
      const createCompanyResponse = await this.companyUseCase.createCompany(companyData)
      if (createCompanyResponse.message !== 'Empresa criada com sucesso') {
        return badRequest(new InvalidParamError(createCompanyResponse.message))
      }
      return ok(createCompanyResponse)
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }

  async getCompany (companyId: string): Promise<CompanyHttpResponse> {
    try {
      const companyReponseUseCase = await this.companyUseCase.getCompany(companyId)
      return ok({ message: companyReponseUseCase.message, data: companyReponseUseCase.data })
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }

  async deleteCompany (objectId: string): Promise<CompanyHttpResponse> {
    try {
      const companyReponseUseCase = await this.companyUseCase.deleteCompany(objectId)
      return ok({ message: companyReponseUseCase.message, data: companyReponseUseCase.data })
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }
}
