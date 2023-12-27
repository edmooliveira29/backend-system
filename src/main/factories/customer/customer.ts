import { CustomerController } from '../../../interfaces/customer/controllers/customer-adapters'
import { CustomerRepositoryInfra } from '../../../infra/customer/customer-repository'
import { CustomerUseCase } from '../../../usecases/customer/customer-usecase'

export const CustomerFactory = (): CustomerController => {
  const customerRepositoryInfra = new CustomerRepositoryInfra()
  const customerUseCase = new CustomerUseCase(customerRepositoryInfra)
  const customerController = new CustomerController(customerUseCase)
  return customerController
}
