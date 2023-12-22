import { type ProductEntity } from '../../entities/product/product-entity'
import { type IProductDataAccess } from './port/product-data-access'
import { type ProductEdit, type IProductCreateUseCase } from './port/product-port'

export class ProductUseCase implements IProductDataAccess {
  public readonly portRepository: IProductCreateUseCase

  constructor (IProductCreateUseCase: IProductCreateUseCase) {
    this.portRepository = IProductCreateUseCase
  }

  async createProduct (product: ProductEntity): Promise<any> {
    const productResponse = await this.portRepository.createProduct(product)
    return {
      message: 'Produto criado com sucesso',
      data: {
        _id: productResponse.data._id,
        name: productResponse.data.name,
        description: productResponse.data.description,
        categoryId: productResponse.data.categoryId,
        price: productResponse.data.price,
        quantityInStock: productResponse.data.quantityInStock,
        createdAt: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
        createdBy: productResponse.data.createdBy
      }
    }
  }

  async editProduct (_id: string, product: ProductEdit): Promise<any> {
    const productResponse = (await this.portRepository.editProduct(_id, product))
    return {
      message: 'Produto editado com sucesso',
      data: {
        _id: productResponse.data._id,
        type: productResponse.data.type,
        name: productResponse.data.name,
        description: productResponse.data.description
      }
    }
  }

  async getProduct (productId: string): Promise<any> {
    const productRepositoryInfra = await this.portRepository.getProduct(productId)
    if (!productRepositoryInfra) {
      return { message: 'Produto não encontrada' }
    }
    return { message: 'Produto encontrada com sucesso', ...productRepositoryInfra }
  }

  async deleteProduct (productId: string): Promise<any> {
    const productRepositoryInfra = await this.portRepository.deleteProduct(productId)
    if (!productRepositoryInfra) {
      return { message: 'Produto não encontrado' }
    }
    return { message: 'Produto deletada com sucesso', data: productRepositoryInfra.data }
  }
}
