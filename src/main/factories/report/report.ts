import { ReportController } from '../../../interfaces/report/controllers/report-adapters'
import { ReportUseCase } from '../../../usecases/report/report-usecase'
import { ProductRepositoryInfra } from '../../../infra/product/product-repository'
import { ProductUseCase } from '../../../usecases/product/product-usecase'
import { CustomerRepositoryInfra } from '../../../infra/customer/customer-repository'
import { CustomerUseCase } from '../../../usecases/customer/customer-usecase'
import { SaleRepositoryInfra } from '../../../infra/sale/sale-repository'
import { SaleUseCase } from '../../../usecases/sale/sale-usecase'

export const ReportFactory = (): ReportController => {
  const productRepositoryInfra = new ProductRepositoryInfra()
  const productUseCase = new ProductUseCase(productRepositoryInfra)
  const customerRepositoryInfra = new CustomerRepositoryInfra()
  const customerUseCase = new CustomerUseCase(customerRepositoryInfra)
  const saleRepositoryInfra = new SaleRepositoryInfra()
  const saleUseCase = new SaleUseCase(saleRepositoryInfra)
  const reportUseCase = new ReportUseCase(saleUseCase, customerUseCase, productUseCase)
  const reportController = new ReportController(reportUseCase)
  return reportController
}
