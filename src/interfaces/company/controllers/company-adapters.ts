import { type HttpRequest, type HttpResponse } from '../ports'
import { type ICompanyCreateUseCase } from '../../../usecases/company/port/company-port'
import { badRequest, internalError, ok } from '../../helpers/http-helper'
import { InvalidParamError, MissingParamError, ServerError } from '../errors'

export class CompanyControllerInterface {
  public readonly companyUseCase: ICompanyCreateUseCase

  constructor (companyUseCase: ICompanyCreateUseCase) {
    this.companyUseCase = companyUseCase
  }

  async createCompany (companyHttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const companyData = {
        _id: companyHttpRequest.body._id,
        name: companyHttpRequest.body.name,
        email: companyHttpRequest.body.email,
        password: companyHttpRequest.body.password || `${Math.random().toFixed()}(.Ah*)`,
        createdAt: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
        profilePicture: companyHttpRequest.body.profilePicture || null,
        createWithGoogle: companyHttpRequest.body.createWithGoogle
      }

      const fildsRequired = ['name', 'password', 'email']
      for (const field of fildsRequired) {
        if (!Object.prototype.hasOwnProperty.call(companyData, field)) {
          return badRequest(new MissingParamError(field))
        }
      }
      const createCompanyResponse = await this.companyUseCase.createCompany(companyData)
      if (createCompanyResponse.message !== 'Empresa e usuário inicial criado com sucesso') {
        return badRequest(new InvalidParamError(createCompanyResponse.message))
      }
      return ok(createCompanyResponse)
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }
}
