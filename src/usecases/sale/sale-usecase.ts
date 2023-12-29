import { type SaleEntity } from '../../entities/sale/sale-entity'
import { type ISaleDataAccess } from './port/sale-data-access'
import { type ISaleCreateUseCase } from './port/sale-port'

export class SaleUseCase implements ISaleDataAccess {
  public readonly portRepository: ISaleCreateUseCase
  constructor (ISaleCreateUseCase: ISaleCreateUseCase) {
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

  async getSale (saleId: string): Promise<any> {
    const saleRepositoryInfra = await this.portRepository.getSale(saleId)
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
    console.log(lastSaleNumber)
    const newSaleNumber = lastSaleNumber + 1
    return newSaleNumber
  }
}
