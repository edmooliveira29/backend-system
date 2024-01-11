import { type ProductEntity } from '../../entities/product/product-entity'
import { type IProductDataAccess } from './port/product-data-access'
import { type ProductEdit, type IProductUseCase } from './port/product-port'

export class ProductUseCase implements IProductDataAccess {
  public readonly portRepository: IProductUseCase

  constructor (IProductCreateUseCase: IProductUseCase) {
    this.portRepository = IProductCreateUseCase
  }

  async createProduct (product: ProductEntity): Promise<any> {
    const productResponse = await this.portRepository.createProduct(product)
    return {
      message: 'Produto criado com sucesso',
      data: {
        ...productResponse.data
      }
    }
  }

  async editProduct (_id: string, product: ProductEdit): Promise<any> {
    const productResponse = (await this.portRepository.editProduct(_id, product))
    return {
      message: 'Produto editado com sucesso',
      data: {
        ...productResponse.data
      }
    }
  }

  async getProducts (companyId: string): Promise<any> {
    const productRepositoryInfra = await this.portRepository.getProducts(companyId)
    if (!productRepositoryInfra) {
      return { message: 'Produto não encontrada' }
    }
    return { message: 'Produto encontrado com sucesso', ...productRepositoryInfra }
  }

  async deleteProduct (productId: string): Promise<any> {
    const productRepositoryInfra = await this.portRepository.deleteProduct(productId)
    if (!productRepositoryInfra) {
      return { message: 'Produto não encontrado' }
    }
    return { message: 'Produto deletado com sucesso', data: productRepositoryInfra.data }
  }
}
