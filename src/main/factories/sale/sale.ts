import { SaleController } from '../../../interfaces/sale/controllers/sale-adapters'
import { SaleRepositoryInfra } from '../../../infra/sale/sale-repository'
import { SaleUseCase } from '../../../usecases/sale/sale-usecase'
import { ProductRepositoryInfra } from '../../../infra/product/product-repository'
import { ProductUseCase } from '../../../usecases/product/product-usecase'

export const SaleFactory = (): SaleController => {
  const saleRepositoryInfra = new SaleRepositoryInfra()
  const productRepositoryInfra = new ProductRepositoryInfra()
  const productUseCase = new ProductUseCase(productRepositoryInfra)
  const saleUseCase = new SaleUseCase(saleRepositoryInfra, productUseCase)
  const saleController = new SaleController(saleUseCase)
  return saleController
}
