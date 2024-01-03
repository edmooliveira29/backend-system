import { type SaleEntity } from '../../entities/sale/sale-entity'
import { type ISaleDataAccess } from './port/sale-data-access'
import { type ISaleUseCase } from './port/sale-port'

export class SaleUseCase implements ISaleDataAccess {
  public readonly portRepository: ISaleUseCase
  constructor (ISaleCreateUseCase: ISaleUseCase) {
    this.portRepository = ISaleCreateUseCase
  }

  async createSale (sale: SaleEntity): Promise<any> {
    sale.saleNumber = await this.getLastSaleNumber(sale.createdByTheCompanyId)
    const saleResponse = await this.portRepository.createSale(sale)

    return {
      message: 'Venda criada com sucesso',
      data: {
        ...saleResponse.data
      }
    }
  }

  async editSale (_id: string, sale: SaleEntity): Promise<any> {
    const saleResponse = (await this.portRepository.editSale(_id, sale))
    return {
      message: 'Venda editada com sucesso',
      data: {
        ...saleResponse.data
      }
    }
  }

  async getSale (companyId: string): Promise<any> {
    const saleRepositoryInfra = await this.portRepository.getSale(companyId)
    if (!saleRepositoryInfra) {
      return { message: 'Venda não encontrada' }
    }

    return {
      data: { ...saleRepositoryInfra }
    }
  }

  async deleteSale (saleId: string): Promise<any> {
    const saleRepositoryInfra = await this.portRepository.deleteSale(saleId)
    if (!saleRepositoryInfra) {
      return { message: 'Venda não encontrada' }
    }
    return { message: 'Venda deletada com sucesso', data: saleRepositoryInfra.data }
  }

  async getLastSaleNumber (companyId: string): Promise<any> {
    const lastSaleNumber = await this.portRepository.getLastSaleNumber(companyId)
    const newSaleNumber = lastSaleNumber + 1
    return newSaleNumber
  }

  async getQuantityOfSales (companyId: string): Promise<any> {
    const quantityOfSales = await this.portRepository.getQuantityOfSales(companyId)
    return quantityOfSales
  }

  async getSalesIntheLast6Months (companyId: string): Promise<any> {
    const quantityOfSales = await this.portRepository.getQuantityOfSales(companyId)
    return quantityOfSales
  }
}
