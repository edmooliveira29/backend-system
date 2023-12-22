import { type CategoryEntity } from '../../../entities/category/category-entity'
import { type CategoryEdit } from './category-port'

export interface ICategoryDataAccess {
  createCategory: (category: CategoryEntity) => Promise<string>
  getCategory: (objectId: string) => Promise<string>
  editCategory: (_id: string, category: CategoryEdit) => Promise<object>
}
