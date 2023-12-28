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
      result = await customerCollection.findOne({ cpf: customer.cpf })
    } else if (customer.cnpj) {
      result = await customerCollection.findOne({ cnpj: customer.cnpj })
    } else {
      const objectId = new ObjectId(customer._id)
      result = await customerCollection.findOne({ _id: objectId })
    }

    if (result != null) {
      const objectId = new ObjectId(result._id)
      await customerCollection.updateOne(
        { _id: objectId },
        { $set: result }
      )
    }
    return result
  }

  async findAllCustomers (): Promise<any> {
    const customerCollection = MongoConnection.getCollection('customers')
    const result = await customerCollection.find({}).toArray()
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

  async getCustomer (): Promise<any> {
    const customer = await this.findAllCustomers()

    if (customer) {
      return { data: customer }
    } else {
      return { message: 'Cliente não encontrado' }
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
    } else {
      return { message: 'Cliente não encontrado' }
    }
  }

  async deleteCustomer (_id: string): Promise<any> {
    const customerCollection = MongoConnection.getCollection('customers')
    const objectId = new ObjectId(_id)
    const customer = await customerCollection.deleteOne({ _id: objectId })
    if (customer) {
      return { message: 'Cliente deletado com sucesso', data: await customerCollection.find({}).toArray() }
    } else {
      return { message: 'Cliente não encontrado' }
    }
  }
}
