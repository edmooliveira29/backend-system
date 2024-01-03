import { type CompanyEntity } from '../../entities/company/company-entity'
import { type ICompanyDataAccess } from './port/company-data-access'
import { type ICompanyUseCase } from './port/company-port'

export class CompanyUseCase implements ICompanyDataAccess {
  public readonly portRepository: ICompanyUseCase

  constructor (ICompanyCreateUseCase: ICompanyUseCase) {
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

  async getCompany (companyId: string): Promise<any> {
    const companyRepositoryInfra = await this.portRepository.getCompany(companyId)
    if (!companyRepositoryInfra) {
      return { message: 'Empresa não encontrada' }
    }

    return {
      message: 'Empresa encontrada com sucesso',
      data: {
        ...companyRepositoryInfra.data
      }
    }
  }

  async editCompany (_id: string, company: CompanyEntity): Promise<any> {
    const companyRepositoryInfra = await this.portRepository.editCompany(_id, company)
    if (!companyRepositoryInfra) {
      return { message: 'Empresa não encontrada' }
    }
    return { message: 'Empresa editada com sucesso', data: companyRepositoryInfra.data }
  }

  async deleteCompany (companyId: string): Promise<any> {
    const companyRepositoryInfra = await this.portRepository.deleteCompany(companyId)
    if (!companyRepositoryInfra) {
      return { message: 'Empresa não encontrado' }
    }
    return { message: 'Empresa deletada com sucesso', data: companyRepositoryInfra.data }
  }
}
