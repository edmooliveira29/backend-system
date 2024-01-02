import { type CustomerData } from '../../../entities/customer/customer-entity'

export interface ICustomerDataAccess {
  createCustomer: (customer: CustomerData) => Promise<string>
  getCustomer: (companyId: string) => Promise<string>
  editCustomer: (_id: string, customer: CustomerData) => Promise<object>
  deleteCustomer: (_id: string) => Promise<object>
}
