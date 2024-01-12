import { type SaleEntity } from '../../entities/sale/sale-entity'
import { type ISaleDataAccess } from '../../usecases/sale/port/sale-data-access'
import { MongoConnection } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class SaleRepositoryInfra implements ISaleDataAccess {
  async createSale (sale: SaleEntity): Promise<any> {
    const saleCollection = MongoConnection.getCollection('sales')
    const saleInserted = await saleCollection.insertOne(sale)
    return {
      data: {
        ...sale,
        _id: saleInserted.insertedId
      }
    }
  }

  async findAllSales (companyId: string): Promise<any> {
    const saleCollection = MongoConnection.getCollection('sales')
    const result = await saleCollection.find({ createdByTheCompanyId: companyId }).toArray()
    return result
  }

  async getSale (companyId: string): Promise<any> {
    const sale = await this.findAllSales(companyId)

    if (sale) {
      return { data: sale }
    }
  }

  async editSale (_id: string, updatedSaleData: any): Promise<any> {
    const saleCollection = MongoConnection.getCollection('sales')
    const objectId = new ObjectId(_id)
    delete updatedSaleData._id
    const sale = await saleCollection.updateOne(
      { _id: objectId },
      { $set: updatedSaleData }
    )

    if (sale) {
      updatedSaleData._id = _id
      return { data: updatedSaleData }
    }
  }

  async deleteSale (_id: string): Promise<any> {
    const saleCollection = MongoConnection.getCollection('sales')
    const objectId = new ObjectId(_id)
    const sale = await saleCollection.deleteOne({ _id: objectId })
    if (sale) {
      return { message: 'Venda deletada com sucesso', data: await saleCollection.find({}).toArray() }
    }
  }

  async getLastSaleNumber (companyId: string): Promise<number> {
    const saleCollection = MongoConnection.getCollection('sales')

    const result = await saleCollection
      .find({ createdByTheCompanyId: companyId })
      .sort({ saleNumber: -1 })
      .limit(1)
      .toArray()

    if (result.length > 0) {
      return result[0].saleNumber
    } else {
      return 0
    }
  }

  async getQuantityOfSales (): Promise<any> {
    const saleCollection = MongoConnection.getCollection('sales')
    const result = saleCollection
      .find({})
      .bufferedCount()
    return result
  }
}
