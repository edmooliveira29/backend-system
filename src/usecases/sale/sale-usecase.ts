import { type SaleEntity } from '../../entities/sale/sale-entity'
import { type ICustomerUseCase } from '../customer/port/customer-port'
import { type IProductUseCase } from '../product/port/product-port'
import { type ISaleDataAccess } from './port/sale-data-access'
import { type ISaleCreateUseCase } from './port/sale-port'

export class SaleUseCase implements ISaleDataAccess {
  public readonly portRepository: ISaleCreateUseCase
  public readonly customerUseCase: ICustomerUseCase
  public readonly productUseCase: IProductUseCase
  constructor (ISaleCreateUseCase: ISaleCreateUseCase, ICustomerUseCase: ICustomerUseCase, IProductUseCase: IProductUseCase) {
    this.portRepository = ISaleCreateUseCase
    this.customerUseCase = ICustomerUseCase
    this.productUseCase = IProductUseCase
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
    const customers = await this.customerUseCase.getCustomer()
    const productsDB = await this.productUseCase.getProduct()
    for (const sale of saleRepositoryInfra.data) {
      sale.customerId = customers.data.find((customer: { _id: string }) => {
        return (customer._id).toString() === sale.customerId
      })
    }

    for (const sale of saleRepositoryInfra.data) {
      for (const index in sale.products) {
        sale.products[index][`productId-${index}`] = productsDB.data.find((productDB: { _id: string }) => {
          return (productDB._id).toString() === sale.products[index][`productId-${index}`]
        })
      }
    }
    console.log(saleRepositoryInfra)
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
