import { type ProductEntity } from '../../entities/product/product-entity'
import { formatNowDate } from '../../utils/data'
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
        _id: productResponse.data._id,
        name: productResponse.data.name,
        description: productResponse.data.description,
        category: productResponse.data.category,
        price: productResponse.data.price,
        quantityInStock: productResponse.data.quantityInStock,
        createdAt: formatNowDate(),
        createdByTheCompany: productResponse.data.createdByTheCompany
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

  async getProducts (): Promise<any> {
    const productRepositoryInfra = await this.portRepository.getProducts()
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
