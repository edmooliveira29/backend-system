import { type CompanyEntity } from '../../entities/company/company-entity'
import { type ICompanyDataAccess } from './port/company-data-access'
import { type ICompanyCreateUseCase } from './port/company-port'

export class CompanyUseCase implements ICompanyDataAccess {
  public readonly portRepository: ICompanyCreateUseCase

  constructor (ICompanyCreateUseCase: ICompanyCreateUseCase) {
    this.portRepository = ICompanyCreateUseCase
  }

  async createCompany (company: CompanyEntity): Promise<any> {
    const companyResponse = await this.portRepository.createCompany(company)
    return {
      message: 'Empresa criada com sucesso',
      data: {
        ...companyResponse.data
      }
    }
  }

  async deleteCompany (companyId: string): Promise<any> {
    const companyRepositoryInfra = await this.portRepository.deleteCompany(companyId)
    if (!companyRepositoryInfra) {
      return { message: 'Empresa não encontrado' }
    }
    return { message: 'Empresa deletada com sucesso', data: companyRepositoryInfra.data }
  }
}
