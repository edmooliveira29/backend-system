import { type ICompanyDataAccess } from '../../usecases/company/port/company-data-access'
import { MongoConnection } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class CompanyRepositoryInfra implements ICompanyDataAccess {
  async createCompany (company: {
    _id?: any
    email: string
    name: string
    createWithGoogle: boolean
  }): Promise<any> {
    const companyCollection = MongoConnection.getCollection('companies')
    const exists = await this.exists(company)
    if ((!exists)) {
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

  async getCompany (companyId: string): Promise<any> {
    const company = await this.findCompanyById(companyId)

    if (company) {
      return { data: company }
    }
  }

  async findCompanyById (companyId: any): Promise<any> {
    const companyCollection = MongoConnection.getCollection('companies')
    const result = await companyCollection.findOne({ _id: new ObjectId(companyId) })
    return result
  }

  async findCompanyByEmail (company: any): Promise<any> {
    const companyCollection = MongoConnection.getCollection('companies')
    const result = await companyCollection.findOne({ email: company.email })
    return result
  }

  async exists (company: any): Promise<boolean> {
    const result = await this.findCompanyByEmail(company)
    if (result != null) {
      return true
    } else {
      return false
    }
  }

  async editCompany (_id: string, updatedCompany: any): Promise<any> {
    const companyCollection = MongoConnection.getCollection('companies')
    const objectId = new ObjectId(_id)
    delete updatedCompany._id
    const companyUpdated = await companyCollection.updateOne({ _id: objectId }, { $set: updatedCompany })
    if (companyUpdated) {
      updatedCompany._id = _id
      return { message: 'Empresa editada com sucesso', data: updatedCompany }
    }
  }
}
