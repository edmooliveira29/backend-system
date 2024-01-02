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
    const companyCollection = MongoConnection.getCollection('companys')
    const exists = await this.exists(company)
    if ((!exists)) {
      company = {
        ...company
      }
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

  async getCompany (_id: string): Promise<any> {
    const company = await this.findCompanyById({ _id })

    if (company) {
      return { data: company }
    } else {
      return { message: 'Empresa não encontrada' }
    }
  }

  async findCompanyById (company: any): Promise<any> {
    const companyCollection = MongoConnection.getCollection('companys')
    const objectId = new ObjectId(company._id)
    const result = await companyCollection.findOne({ _id: objectId })

    return result
  }

  async findAllCompanys (): Promise<any> {
    const companyCollection = MongoConnection.getCollection('companys')
    const result = await companyCollection.find({}).toArray()
    return result
  }

  async exists (company: any): Promise<boolean> {
    const result = await this.findCompanyById(company)
    if (result != null) {
      return true
    } else {
      return false
    }
  }

  async deleteCompany (_id: string): Promise<any> {
    const companyCollection = MongoConnection.getCollection('companys')
    const objectId = new ObjectId(_id)
    const company = await companyCollection.deleteOne({ _id: objectId })
    if (company) {
      return { message: 'Usuário deletado com sucesso', data: await companyCollection.find({}).toArray() }
    } else {
      return { message: 'Usuário não encontrado' }
    }
  }
}
