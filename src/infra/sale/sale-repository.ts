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

  async findSaleById (sale: any): Promise<any> {
    const saleCollection = MongoConnection.getCollection('sales')

    const objectId = new ObjectId(sale._id)
    const result = await saleCollection.findOne({ _id: objectId })

    if (result != null) {
      const objectId = new ObjectId(result._id)
      await saleCollection.updateOne(
        { _id: objectId },
        { $set: result }
      )
    }
    return result
  }

  async findAllSales (): Promise<any> {
    const saleCollection = MongoConnection.getCollection('sales')
    const result = await saleCollection.find({}).toArray()
    return result
  }

  async exists (sale: any): Promise<boolean> {
    const result = await this.findSaleById(sale)
    if (result != null) {
      return true
    } else {
      return false
    }
  }

  async getSale (): Promise<any> {
    const sale = await this.findAllSales()

    if (sale) {
      return { data: sale }
    } else {
      return { message: 'Venda não encontrado' }
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
    } else {
      return { message: 'Colaborador não encontrado' }
    }
  }

  async deleteSale (_id: string): Promise<any> {
    const saleCollection = MongoConnection.getCollection('sales')
    const objectId = new ObjectId(_id)
    const sale = await saleCollection.deleteOne({ _id: objectId })
    if (sale) {
      return { message: 'Colaborador deletado com sucesso', data: await saleCollection.find({}).toArray() }
    } else {
      return { message: 'Colaborador não encontrado' }
    }
  }

  async getLastSaleNumber (): Promise<number> {
    const saleCollection = MongoConnection.getCollection('sales')

    const result = await saleCollection
      .find({})
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
