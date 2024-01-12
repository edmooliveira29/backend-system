import { type CustomerData } from '../../entities/customer/customer-entity'
import { type ICustomerDataAccess } from '../../usecases/customer/port/customer-data-access'
import { MongoConnection } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class CustomerRepositoryInfra implements ICustomerDataAccess {
  async createCustomer (customer: CustomerData): Promise<any> {
    const customerCollection = MongoConnection.getCollection('customers')
    const exists = await this.exists(customer)
    if ((!exists)) {
      const customerInserted = await customerCollection.insertOne(customer)
      return {
        data: {
          ...customer,
          _id: customerInserted.insertedId
        }
      }
    } else {
      throw new Error('Já existe um cliente com este cpf/cnpj')
    }
  }

  async findCustomerByCpfCnpjOrId (customer: any): Promise<any> {
    const customerCollection = MongoConnection.getCollection('customers')
    let result: any | null
    if (customer.cpf) {
      result = await customerCollection.findOne({ cpf: customer.cpf, createdByTheCompanyId: customer.createdByTheCompanyId })
    } else if (customer.cnpj) {
      result = await customerCollection.findOne({ cnpj: customer.cnpj, createdByTheCompanyId: customer.createdByTheCompanyId })
    }
    return result
  }

  async findAllCustomers (companyId: string): Promise<any> {
    const customerCollection = MongoConnection.getCollection('customers')
    const result = await customerCollection.find({ createdByTheCompanyId: companyId }).toArray()
    return result
  }

  async exists (customer: any): Promise<boolean> {
    const result = await this.findCustomerByCpfCnpjOrId(customer)
    if (result != null) {
      return true
    } else {
      return false
    }
  }

  async getCustomer (companyId: string): Promise<any> {
    const customer = await this.findAllCustomers(companyId)

    if (customer) {
      return { data: customer }
    }
  }

  async editCustomer (_id: string, updatedCustomerData: any): Promise<any> {
    const customerCollection = MongoConnection.getCollection('customers')
    const objectId = new ObjectId(_id)
    delete updatedCustomerData._id
    const customer = await customerCollection.updateOne(
      { _id: objectId },
      { $set: updatedCustomerData }
    )

    if (customer) {
      updatedCustomerData._id = _id
      return { data: updatedCustomerData }
    }
  }

  async deleteCustomer (_id: string): Promise<any> {
    const customerCollection = MongoConnection.getCollection('customers')
    const objectId = new ObjectId(_id)
    const customerResponse = await customerCollection.deleteOne({ _id: objectId })
    if (customerResponse) {
      return { message: 'Cliente deletado com sucesso' }
    }
  }
}
