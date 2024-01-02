import { type CategoryHttpRequest, type CategoryHttpResponse } from '../ports'
import { type ICategoryCreateUseCase } from '../../../usecases/category/port/category-port'
import { badRequest, internalError, noContent, ok } from '../../helpers/http-helper'
import { InvalidParamError, MissingParamError, NotFound, ServerError } from '../errors'
import { formatNowDate } from '../../../utils/data'

export class CategoryController {
  public readonly categoryUseCase: ICategoryCreateUseCase

  constructor (categoryUseCase: ICategoryCreateUseCase) {
    this.categoryUseCase = categoryUseCase
  }

  async create (categoryHttpRequest: CategoryHttpRequest): Promise<CategoryHttpResponse> {
    try {
      const categoryData: any = {
        ...categoryHttpRequest.body,
        createdAt: formatNowDate()
      }
      const fieldsRequired = ['type', 'name']
      for (const field of fieldsRequired) {
        const fieldExists = Object.prototype.hasOwnProperty.call(categoryData, field)
        const value = categoryData[`${field}`]
        if (!fieldExists || value === undefined || value == null) {
          return badRequest(new MissingParamError(field))
        }
      }
      const createCategoryResponse = await this.categoryUseCase.createCategory(categoryData)
      if (createCategoryResponse.message !== 'Categoria criada com sucesso') {
        return badRequest(new InvalidParamError(createCategoryResponse.message))
      }
      return ok(createCategoryResponse)
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }

  async edit (categoryHttpRequest: CategoryHttpRequest): Promise<CategoryHttpResponse> {
    try {
      const categoryData = {
        ...categoryHttpRequest.body,
        editAt: formatNowDate()
      }

      const fildsRequired = ['_id', 'name', 'type']
      for (const field of fildsRequired) {
        if (!Object.prototype.hasOwnProperty.call(categoryHttpRequest.body, field)) {
          return badRequest(new MissingParamError(field))
        }
      }
      const createCategoryResponse = await this.categoryUseCase.editCategory(categoryHttpRequest.body._id, categoryData)

      if (!createCategoryResponse.data) {
        return badRequest(new InvalidParamError(createCategoryResponse.message))
      }
      return ok(createCategoryResponse)
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }

  async getCategory (companyId: string): Promise<CategoryHttpResponse> {
    try {
      const categoryReponseUseCase = await this.categoryUseCase.getCategory(companyId)

      if (!categoryReponseUseCase.data) {
        return noContent(new NotFound(categoryReponseUseCase.message))
      }
      delete categoryReponseUseCase.data.password
      return ok({ message: categoryReponseUseCase.message, ...categoryReponseUseCase })
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }

  async deleteCategory (objectId: string): Promise<CategoryHttpResponse> {
    try {
      const categoryReponseUseCase = await this.categoryUseCase.deleteCategory(objectId)
      return ok({ message: categoryReponseUseCase.message, data: categoryReponseUseCase.data })
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }
}
