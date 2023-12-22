import { type IProductDataAccess } from '../../usecases/product/port/product-data-access'
import { MongoConnection } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class ProductRepositoryInfra implements IProductDataAccess {
  async createProduct (product: {
    _id?: any
    name: string
    description?: string
    categoryId: string
    price: number
    quantityInStock: number
    createdAt: string
    createdBy: any
  }): Promise<any> {
    const productCollection = MongoConnection.getCollection('products')
    const exists = await this.exists(product)
    if ((!exists)) {
      const productInserted = await productCollection.insertOne(product)
      console.log(productInserted)
      return {
        data: {
          ...product,
          _id: productInserted.insertedId
        }
      }
    } else {
      throw new Error('Já existe um produto com este nome.')
    }
  }

  async findProductByName (product: any): Promise<any> {
    const productCollection = MongoConnection.getCollection('products')

    const nameOfProduct = product.name
    const result = await productCollection.findOne({ name: nameOfProduct })
    if (result != null) {
      const objectId = new ObjectId(result._id)
      await productCollection.updateOne(
        { _id: objectId },
        { $set: result }
      )
    }
    return result
  }

  async findAllProducts (): Promise<any> {
    const productCollection = MongoConnection.getCollection('products')
    const result = await productCollection.find({}).toArray()
    return result
  }

  async exists (product: any): Promise<boolean> {
    const result = await this.findProductByName(product)
    if (result != null) {
      return true
    } else {
      return false
    }
  }

  async getProduct (_id: string): Promise<any> {
    let product
    if (_id) {
      product = await this.findProductByName({ _id, email: '' })
    } else {
      product = await this.findAllProducts()
    }
    if (product) {
      return { message: 'Produto encontrado com sucesso', data: product }
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
      return { message: 'Produto deletada com sucesso', data: await productCollection.find({}).toArray() }
    } else {
      return { message: 'Produto não encontrada' }
    }
  }
}
