import { type CompanyHttpRequest, type CompanyHttpResponse } from '../ports'
import { type ICompanyCreateUseCase } from '../../../usecases/company/port/company-port'
import { badRequest, internalError, ok } from '../../helpers/http-helper'
import { InvalidParamError, MissingParamError, ServerError } from '../errors'
import { formatNowDate } from '../../../utils/data'

export class CompanyController {
  public readonly companyUseCase: ICompanyCreateUseCase

  constructor (companyUseCase: ICompanyCreateUseCase) {
    this.companyUseCase = companyUseCase
  }

  async create (companyHttpRequest: CompanyHttpRequest): Promise<CompanyHttpResponse> {
    try {
      const companyData: any = {
        _id: companyHttpRequest.body._id,
        email: companyHttpRequest.body.email,
        name: companyHttpRequest.body.name,
        createdAt: formatNowDate(),
        createWithGoogle: companyHttpRequest.body.createWithGoogle
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
