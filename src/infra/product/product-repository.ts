import { type IProductDataAccess } from '../../usecases/product/port/product-data-access'
import { MongoConnection } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class ProductRepositoryInfra implements IProductDataAccess {
  async createProduct (product: {
    _id?: any
    name: string
    description?: string
    category: string
    price: string
    quantityInStock: number
    createdAt: string
    createdByTheCompanyId: any
  }): Promise<any> {
    const productCollection = MongoConnection.getCollection('products')
    const exists = await this.exists(product)
    if ((!exists)) {
      const productInserted = await productCollection.insertOne(product)
      return {
        data: {
          ...product,
          _id: productInserted.insertedId
        }
      }
    } else {
      throw new Error('Já existe um produto com este nome')
    }
  }

  async findProductByName (product: any): Promise<any> {
    const productCollection = MongoConnection.getCollection('products')

    const nameOfProduct = product.name
    const result = await productCollection.findOne({ name: nameOfProduct, createdByTheCompanyId: product.createdByTheCompanyId })
    if (result != null) {
      const objectId = new ObjectId(result._id)
      await productCollection.updateOne(
        { _id: objectId },
        { $set: result }
      )
    }
    return result
  }

  async findAllProducts (companyId: string): Promise<any> {
    const productCollection = MongoConnection.getCollection('products')
    const result = await productCollection.find({ createdByTheCompanyId: companyId }).toArray()

    return result
  }

  async getCategoryDetails (category: ObjectId): Promise<any> {
    const categoryCollection = MongoConnection.getCollection('categories')
    const categoryDetails = await categoryCollection.findOne({ _id: category })
    return categoryDetails
  }

  async exists (product: any): Promise<boolean> {
    const result = await this.findProductByName(product)
    if (result != null) {
      return true
    } else {
      return false
    }
  }

  async getProducts (companyId: string): Promise<any> {
    const product = await this.findAllProducts(companyId)
    if (product) {
      return { data: product }
    } else {
      return { message: 'Produto não encontrado' }
    }
  }

  async editProduct (_id: string, updatedProductData: any): Promise<any> {
    const productCollection = MongoConnection.getCollection('products')
    const objectId = new ObjectId(_id)
    delete updatedProductData._id
    const product = await productCollection.updateOne(
      { _id: objectId },
      { $set: updatedProductData }
    )

    if (product) {
      updatedProductData._id = _id
      return { data: updatedProductData }
    } else {
      return { message: 'Produto não encontrada' }
    }
  }

  async deleteProduct (_id: string): Promise<any> {
    const productCollection = MongoConnection.getCollection('products')
    const objectId = new ObjectId(_id)
    const product = await productCollection.deleteOne({ _id: objectId })

    if (product) {
      return { message: 'Produto deletado com sucesso', data: await productCollection.find({}).toArray() }
    } else {
      return { message: 'Produto não encontrada' }
    }
  }
}
