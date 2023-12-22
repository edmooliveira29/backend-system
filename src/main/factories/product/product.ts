import { ProductController } from '../../../interfaces/product/controllers/product-adapters'
import { ProductRepositoryInfra } from '../../../infra/product/product-repository'
import { ProductUseCase } from '../../../usecases/product/product-usecase'

export const ProductFactory = (): ProductController => {
  const productRepositoryInfra = new ProductRepositoryInfra()
  const productUseCase = new ProductUseCase(productRepositoryInfra)
  const productController = new ProductController(productUseCase)
  return productController
}
