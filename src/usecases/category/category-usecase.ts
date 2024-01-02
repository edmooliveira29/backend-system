import { type CategoryEntity } from '../../entities/category/category-entity'
import { type ICategoryDataAccess } from './port/category-data-access'
import { type CategoryEdit, type ICategoryCreateUseCase } from './port/category-port'

export class CategoryUseCase implements ICategoryDataAccess {
  public readonly portRepository: ICategoryCreateUseCase

  constructor (ICategoryCreateUseCase: ICategoryCreateUseCase) {
    this.portRepository = ICategoryCreateUseCase
  }

  async createCategory (category: CategoryEntity): Promise<any> {
    const categoryResponse = await this.portRepository.createCategory(category)
    return {
      message: 'Categoria criada com sucesso',
      data: {
        ...categoryResponse.data
      }
    }
  }

  async editCategory (_id: string, category: CategoryEdit): Promise<any> {
    const categoryResponse = await this.portRepository.editCategory(_id, category)
    return {
      message: 'Categoria editado com sucesso',
      data: {
        ...categoryResponse.data
      }
    }
  }

  async getCategory (category: string): Promise<any> {
    const categoryRepositoryInfra = await this.portRepository.getCategory(category)
    if (!categoryRepositoryInfra) {
      return { message: 'Categoria não encontrada' }
    }
    return { message: 'Categoria encontrada com sucesso', ...categoryRepositoryInfra }
  }

  async deleteCategory (category: string): Promise<any> {
    const categoryRepositoryInfra = await this.portRepository.deleteCategory(category)
    if (!categoryRepositoryInfra) {
      return { message: 'Categoria não encontrado' }
    }
    return { message: 'Categoria deletada com sucesso', data: categoryRepositoryInfra.data }
  }
}
