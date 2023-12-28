import { type CustomerData } from '../../entities/customer/customer-entity'
import { type ICustomerDataAccess } from './port/customer-data-access'
import { type ICustomerUseCase } from './port/customer-port'
import { Validation } from '../validation/validations'

export class CustomerUseCase implements ICustomerDataAccess {
  public readonly portRepository: ICustomerUseCase
  public readonly validation: Validation

  constructor (ICustomerCreateUseCase: ICustomerUseCase) {
    this.portRepository = ICustomerCreateUseCase
    this.validation = new Validation()
  }

  async createCustomer (customer: CustomerData): Promise<any> {
    if (!this.validation.emailIsValid(customer.email)) {
      return { message: 'E-mail não é valido' }
    } else if (!this.validation.nameIsValid(customer.name)) {
      return { message: 'Nome não é valido' }
    } else {
      const customerResponse = await this.portRepository.createCustomer(customer)

      return {
        message: 'Cliente criado com sucesso',
        data: {
          ...customerResponse.data
        }
      }
    }
  }

  async editCustomer (_id: string, customer: CustomerData): Promise<any> {
    if (!this.validation.emailIsValid(customer.email)) {
      return { message: 'E-mail não é valido' }
    } else if (!this.validation.nameIsValid(customer.name)) {
      return { message: 'Nome não é valido' }
    } else {
      const customerResponse = (await this.portRepository.editCustomer(_id, customer))
      return {
        message: 'Cliente editado com sucesso',
        data: {
          ...customerResponse.data
        }
      }
    }
  }

  async getCustomer (): Promise<any> {
    const customerRepositoryInfra = await this.portRepository.getCustomer()
    if (!customerRepositoryInfra) {
      return { message: 'Cliente não encontrado' }
    }

    return { ...customerRepositoryInfra }
  }

  async deleteCustomer (customerId: string): Promise<any> {
    const customerRepositoryInfra = await this.portRepository.deleteCustomer(customerId)
    if (!customerRepositoryInfra) {
      return { message: 'Cliente não encontrado' }
    }
    return { message: 'Cliente deletado com sucesso', data: customerRepositoryInfra.data }
  }
}
