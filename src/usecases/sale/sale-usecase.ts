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
    let productInRepository: any
    await Promise.all(
      sale.products.map(async (productOfSale: any, index: number) => {
        const products = await this.portUseCaseProducts.getProducts(sale.createdByTheCompanyId)
        productInRepository = products.data.find((productFilter: any) => {
          return productFilter._id.toString() === productOfSale[`productId-${index}`]._id
        })

        // ========================== //
        if (productInRepository.quantityInStock < productOfSale[`quantity-${index}`]) {
          noHasProducts = `O produto '${productInRepository.name}' não tem estoque o suficiente!`
        } else {
          const productToUpdate = {
            ...productInRepository,
            quantityInStock: productInRepository.quantityInStock - productOfSale[`quantity-${index}`]
          }
          const isProductInListToUpdate = productsToUpdated.find((productToUpdate: any) => {
            return productToUpdate._id.toString() === (productToUpdate._id).toString()
          })
          if (isProductInListToUpdate) {
            if (productToUpdate.quantityInStock - productOfSale[`quantity-${index}`] < 0) {
              noHasProducts = `O produto '${productInRepository.name}' não tem estoque o suficiente!`
            }
            isProductInListToUpdate.quantityInStock = productToUpdate.quantityInStock - productOfSale[`quantity-${index}`]
          } else {
            productsToUpdated.push(productToUpdate)
          }
        }
      })
    )

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
