import { type ICategoryDataAccess } from '../../../usecases/category/port/category-data-access'
import { MongoConnection } from '../../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class CategoryRepositoryInfra implements ICategoryDataAccess {
  async createCategory (category: {
    _id?: any
    type: string
    name: string
    description?: string
    createdAt: string
    createdBy: any
  }): Promise<any> {
    const categoryCollection = MongoConnection.getCollection('categories')
    const exists = await this.exists(category)
    if ((!exists)) {
      category = {
        ...category
      }
      const categoryInserted = await categoryCollection.insertOne(category)
      return {
        data: {
          ...category,
          _id: categoryInserted.insertedId
        }
      }
    } else {
      throw new Error('Já existe uma categoria com este nome.')
    }
  }

  async findCategoryByName (category: any): Promise<any> {
    const categoryCollection = MongoConnection.getCollection('categories')

    const nameOfCategory = new ObjectId(category.name)
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

  async findAllCategorys (): Promise<any> {
    const categoryCollection = MongoConnection.getCollection('categories')
    const result = await categoryCollection.find({}).toArray()
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

  async getCategory (_id: string): Promise<any> {
    let category
    if (_id) {
      category = await this.findCategoryByName({ _id, email: '' })
    } else {
      category = await this.findAllCategorys()
    }
    if (category) {
      return { message: 'Categoria encontrada com sucesso', data: category }
    } else {
      return { message: 'Categoria não encontrado' }
    }
  }

  async editCategory (_id: string, updatedCategoryData: any): Promise<any> {
    const categoryCollection = MongoConnection.getCollection('categories')
    const objectId = new ObjectId(_id)
    delete updatedCategoryData._id
    delete updatedCategoryData.newPassword
    delete updatedCategoryData.newPasswordConfirmation
    const category = await categoryCollection.updateOne(
      { _id: objectId },
      { $set: updatedCategoryData }
    )

    if (category) {
      updatedCategoryData._id = _id
      return { data: updatedCategoryData }
    } else {
      return { message: 'Categoria não encontrada' }
    }
  }

  async deleteCategory (_id: string): Promise<any> {
    const categoryCollection = MongoConnection.getCollection('categorys')
    const objectId = new ObjectId(_id)
    const category = await categoryCollection.deleteOne({ _id: objectId })
    if (category) {
      return { message: 'Categoria deletada com sucesso', data: await categoryCollection.find({}).toArray() }
    } else {
      return { message: 'Categoria não encontrada' }
    }
  }
}
