import { type CustomerData } from '../../../entities/customer/customer-entity'

export interface ICustomerUseCase {
  createCustomer: (customer: CustomerData) => Promise<any>
  editCustomer: (_id: string, customer: CustomerData) => Promise<any>
  getCustomer: (companyId: string) => Promise<any>
  deleteCustomer: (_id: string) => Promise<any>
}
