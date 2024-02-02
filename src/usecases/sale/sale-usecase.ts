import { type SaleEntity } from '../../entities/sale/sale-entity'
import { type IProductUseCase } from '../product/port/product-port'
import { type ISaleDataAccess } from './port/sale-data-access'
import { type ISaleUseCase } from './port/sale-port'

export class SaleUseCase implements ISaleDataAccess {
  public readonly portRepositorySale: ISaleUseCase
  public readonly portUseCaseProducts: IProductUseCase
  constructor (ISaleCreateUseCase: ISaleUseCase, IProductCreateUseCase: IProductUseCase) {
    this.portRepositorySale = ISaleCreateUseCase
    this.portUseCaseProducts = IProductCreateUseCase
  }

  async createSale (sale: SaleEntity): Promise<any> {
    sale.saleNumber = await this.getLastSaleNumber(sale.createdByTheCompanyId)
    let noHasProducts: string = ''
    const productsToUpdated: any[] = []

    await Promise.all(
      sale.products.map(async (product: any, index: number) => {
        const products = await this.portUseCaseProducts.getProducts(sale.createdByTheCompanyId)
        const productUpdated = products.data.find((productFilter: any) => {
          return productFilter._id.toString() === product[`productId-${index}`]._id
        })

        // ========================== //
        if (productUpdated.quantityInStock < product[`quantity-${index}`]) {
          noHasProducts = `O produto '${productUpdated.name}' não tem estoque o suficiente!`
        } else {
          const productToUpdate = {
            ...productUpdated,
            quantityInStock: productUpdated.quantityInStock - product[`quantity-${index}`]
          }
          productsToUpdated.find((productFilter: any) => {
            return productFilter._id.toString() === (productToUpdate._id).toString()
          })
          productsToUpdated.push(productToUpdate)
        }
      })
    )
    console.log(productsToUpdated)
    if (noHasProducts !== '') {
      return {
        message: noHasProducts
      }
    } else {
      for (const product of productsToUpdated) {
        await this.portUseCaseProducts.editProduct(product._id, product)
      }
    }

    const saleResponse = await this.portRepositorySale.createSale(sale)

    return {
      message: 'Venda criada com sucesso',
      data: {
        ...saleResponse.data
      }
    }
  }

  async editSale (_id: string, sale: SaleEntity): Promise<any> {
    const saleResponse = (await this.portRepositorySale.editSale(_id, sale))
    return {
      message: 'Venda editada com sucesso',
      data: {
        ...saleResponse.data
      }
    }
  }

  async getSale (companyId: string): Promise<any> {
    const saleRepositoryInfra = await this.portRepositorySale.getSale(companyId)
    if (!saleRepositoryInfra) {
      return { message: 'Venda não encontrada' }
    }

    return {
      data: { ...saleRepositoryInfra }
    }
  }

  async deleteSale (saleId: string): Promise<any> {
    const saleRepositoryInfra = await this.portRepositorySale.deleteSale(saleId)
    if (!saleRepositoryInfra) {
      return { message: 'Venda não encontrada' }
    }
    return { message: 'Venda deletada com sucesso', data: saleRepositoryInfra.data }
  }

  async getLastSaleNumber (companyId: string): Promise<any> {
    const lastSaleNumber = await this.portRepositorySale.getLastSaleNumber(companyId)
    const newSaleNumber = lastSaleNumber + 1
    return newSaleNumber
  }

  async getQuantityOfSales (companyId: string): Promise<any> {
    const quantityOfSales = await this.portRepositorySale.getQuantityOfSales(companyId)
    return quantityOfSales
  }

  async getSalesIntheLast6Months (companyId: string): Promise<any> {
    const quantityOfSales = await this.portRepositorySale.getQuantityOfSales(companyId)
    return quantityOfSales
  }
}
