import { type ICategoryDataAccess } from '../../usecases/category/port/category-data-access'
import { MongoConnection } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class CategoryRepositoryInfra implements ICategoryDataAccess {
  async createCategory (category: {
    _id?: any
    type: string
    name: string
    description?: string
    createdAt: string
    createdByTheCompanyId: any
  }): Promise<any> {
    const categoryCollection = MongoConnection.getCollection('categories')
    const exists = await this.exists(category)
    if ((!exists)) {
      const categoryInserted = await categoryCollection.insertOne(category)
      return {
        data: {
          ...category,
          _id: categoryInserted.insertedId
        }
      }
    } else {
      throw new Error('Já existe uma categoria com este nome')
    }
  }

  async findCategoryByName (category: any): Promise<any> {
    const categoryCollection = MongoConnection.getCollection('categories')
    const nameOfCategory = category.name
    const result = await categoryCollection.findOne({ name: nameOfCategory })
    if (result != null) {
      const objectId = new ObjectId(result._id)
      await categoryCollection.updateOne(
        { _id: objectId },
        { $set: result }
      )
    }
    return result
  }

  async findAllCategories (companyId: string): Promise<any> {
    const categoryCollection = MongoConnection.getCollection('categories')
    const result = await categoryCollection.find({ createdByTheCompanyId: companyId }).toArray()
    return result
  }

  async exists (category: any): Promise<boolean> {
    const result = await this.findCategoryByName(category)
    if (result != null) {
      return true
    } else {
      return false
    }
  }

  async getCategory (companyId: string): Promise<any> {
    const category = await this.findAllCategories(companyId)

    if (category) {
      return { message: 'Categoria encontrada com sucesso', data: category }
    }
  }

  async editCategory (_id: string, updatedCategoryData: any): Promise<any> {
    const categoryCollection = MongoConnection.getCollection('categories')
    const objectId = new ObjectId(_id)
    delete updatedCategoryData._id
    const category = await categoryCollection.updateOne(
      { _id: objectId },
      { $set: updatedCategoryData }
    )

    if (category) {
      updatedCategoryData._id = _id
      return { data: updatedCategoryData }
    }
  }

  async deleteCategory (_id: string): Promise<any> {
    const categoryCollection = MongoConnection.getCollection('categories')
    const objectId = new ObjectId(_id)
    const category = await categoryCollection.deleteOne({ _id: objectId })

    if (category) {
      return { message: 'Categoria deletada com sucesso', data: await categoryCollection.find({}).toArray() }
    }
  }
}
