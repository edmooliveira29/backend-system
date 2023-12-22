import { type ProductHttpRequest, type ProductHttpResponse } from '../ports'
import { type IProductCreateUseCase } from '../../../usecases/product/port/product-port'
import { badRequest, internalError, noContent, ok } from '../../helpers/http-helper'
import { InvalidParamError, MissingParamError, NotFound, ServerError } from '../errors'

export class ProductController {
  public readonly productUseCase: IProductCreateUseCase

  constructor (productUseCase: IProductCreateUseCase) {
    this.productUseCase = productUseCase
  }

  async create (productHttpRequest: ProductHttpRequest): Promise<ProductHttpResponse> {
    try {
      const productData: any = {
        _id: productHttpRequest.body._id,
        name: productHttpRequest.body.name,
        description: productHttpRequest.body.description,
        categoryId: productHttpRequest.body.categoryId,
        price: productHttpRequest.body.price,
        quantityInStock: productHttpRequest.body.quantityInStock,
        createdAt: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      }
      const fieldsRequired = ['name', 'categoryId', 'price', 'quantityInStock']
      for (const field of fieldsRequired) {
        const fieldExists = Object.prototype.hasOwnProperty.call(productData, field)
        const value = productData[`${field}`]
        if (!fieldExists || value === undefined || value == null) {
          return badRequest(new MissingParamError(field))
        }
      }
      const createProductResponse = await this.productUseCase.createProduct(productData)
      if (createProductResponse.message !== 'Produto criada com sucesso') {
        return badRequest(new InvalidParamError(createProductResponse.message))
      }
      return ok(createProductResponse)
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }

  async edit (productHttpRequest: ProductHttpRequest): Promise<ProductHttpResponse> {
    try {
      const productData = {
        _id: productHttpRequest.body._id,
        name: productHttpRequest.body.name,
        description: productHttpRequest.body.description,
        categoryId: productHttpRequest.body.categoryId,
        price: productHttpRequest.body.price,
        quantityInStock: productHttpRequest.body.quantityInStock,
        editAt: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      }

      const fildsRequired = ['_id', 'name', 'categoryId', 'price', 'quantityInStock']
      for (const field of fildsRequired) {
        if (!Object.prototype.hasOwnProperty.call(productHttpRequest.body, field)) {
          return badRequest(new MissingParamError(field))
        }
      }
      const createProductResponse = await this.productUseCase.editProduct(productHttpRequest.body._id, productData)

      if (!createProductResponse.data) {
        return badRequest(new InvalidParamError(createProductResponse.message))
      }
      return ok(createProductResponse)
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }

  async getProduct (objectId: string): Promise<ProductHttpResponse> {
    try {
      const productReponseUseCase = await this.productUseCase.getProduct(objectId)
      if (!productReponseUseCase.data) {
        return noContent(new NotFound(productReponseUseCase.message))
      }
      delete productReponseUseCase.data.password
      return ok({ message: productReponseUseCase.message, ...productReponseUseCase })
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }

  async deleteProduct (objectId: string): Promise<ProductHttpResponse> {
    try {
      const productReponseUseCase = await this.productUseCase.deleteProduct(objectId)
      return ok({ message: productReponseUseCase.message, data: productReponseUseCase.data })
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }
}
