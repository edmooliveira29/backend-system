import { SaleController } from '../../../interfaces/sale/controllers/sale-adapters'
import { SaleRepositoryInfra } from '../../../infra/sale/sale-repository'
import { SaleUseCase } from '../../../usecases/sale/sale-usecase'

export const SaleFactory = (): SaleController => {
  const saleRepositoryInfra = new SaleRepositoryInfra()
  const saleUseCase = new SaleUseCase(saleRepositoryInfra)
  const saleController = new SaleController(saleUseCase)
  return saleController
}
