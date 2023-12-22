import { CategoryController } from '../../../interfaces/category/controllers/category-adapters'
import { CategoryRepositoryInfra } from '../../../infra/category/repository/category-repository'
import { CategoryUseCase } from '../../../usecases/category/user-usecase'

export const CategoryFactory = (): CategoryController => {
  const categoryRepositoryInfra = new CategoryRepositoryInfra()
  const categoryUseCase = new CategoryUseCase(categoryRepositoryInfra)
  const categoryController = new CategoryController(categoryUseCase)
  return categoryController
}
