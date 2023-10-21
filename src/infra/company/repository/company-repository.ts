import { type ICompanyDataAccess } from '../../../usecases/company/port/company-data-access'
import { MongoConnection } from '../../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class CompanyRepositoryInfra implements ICompanyDataAccess {
  login (arg0: { email: string; password: string }): any {
    throw new Error('Method not implemented.')
  }
  getUser (arg0: string): any {
    throw new Error('Method not implemented.')
  }
  async createCompany (company: { _id?: any, name: string, email: string, password: string, createdAt: string, createWithGoogle: boolean }): Promise<any> {
    const companyCollection = MongoConnection.getCollection('companies')

    const exists = await this.exists(company)
    if (!exists) {
      const companyInserted = await companyCollection.insertOne(company)
      return {
        data: {
          ...company,
          _id: companyInserted.insertedId
        }
      }
    } else {
      throw new Error('Já existe uma empresa com este e-mail')
    }
  }

  async findCompanyByEmailOrId (company: any): Promise<any> {
    const companyCollection = MongoConnection.getCollection('companies')
    let result: any | null
    if (company.email.includes('@')) {
      result = await companyCollection.findOne({ email: company.email })
    } else {
      const objectId = new ObjectId(company._id)
      result = await companyCollection.findOne({ _id: objectId })
    }
    if (result != null) {
      const objectId = new ObjectId(result._id)
      await companyCollection.updateOne(
        { _id: objectId },
        { $set: result }
      )
    }
    return result
  }

  async exists (company: any): Promise<boolean> {
    const result = await this.findCompanyByEmailOrId(company)
    if (result != null) {
      return true
    } else {
      return false
    }
  }
}
