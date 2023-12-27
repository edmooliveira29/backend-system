import { type CustomerData } from '../../../entities/customer/customer-entity'

export interface ICustomerCreateUseCase {
  createCustomer: (customer: CustomerData) => Promise<any>
  editCustomer: (_id: string, customer: CustomerData) => Promise<any>
  getCustomer: (objectId: string) => Promise<any>
  deleteCustomer: (_id: string) => Promise<any>
}
