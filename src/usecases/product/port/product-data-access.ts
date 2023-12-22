import { type ProductEntity } from '../../../entities/product/product-entity'
import { type ProductEdit } from './product-port'

export interface IProductDataAccess {
  createProduct: (product: ProductEntity) => Promise<string>
  getProduct: (objectId: string) => Promise<string>
  editProduct: (_id: string, product: ProductEdit) => Promise<object>
}
