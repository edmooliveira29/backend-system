import { type SaleEntity } from '../../entities/sale/sale-entity'
import { type ISaleDataAccess } from './port/sale-data-access'
import { type ISaleUseCase } from './port/sale-port'

export class SaleUseCase implements ISaleDataAccess {
  public readonly portRepository: ISaleUseCase
  constructor (ISaleCreateUseCase: ISaleUseCase) {
    this.portRepository = ISaleCreateUseCase
  }

  async createSale (sale: SaleEntity): Promise<any> {
    sale.saleNumber = await this.getLastSaleNumber()
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

  async getSale (): Promise<any> {
    const saleRepositoryInfra = await this.portRepository.getSale()
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

  async getLastSaleNumber (): Promise<any> {
    const lastSaleNumber = await this.portRepository.getLastSaleNumber()
    const newSaleNumber = lastSaleNumber + 1
    return newSaleNumber
  }

  async getQuantityOfSales (): Promise<any> {
    const quantityOfSales = await this.portRepository.getQuantityOfSales()
    return quantityOfSales
  }

  async getSalesIntheLast6Months (): Promise<any> {
    const quantityOfSales = await this.portRepository.getQuantityOfSales()
    return quantityOfSales
  }
}
