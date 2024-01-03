import { type ProductHttpRequest, type ProductHttpResponse } from '../ports'
import { type IProductUseCase } from '../../../usecases/product/port/product-port'
import { badRequest, internalError, noContent, ok } from '../../helpers/http-helper'
import { InvalidParamError, MissingParamError, NotFound, ServerError } from '../errors'
import { formatNowDate } from '../../../utils/data'

export class ProductController {
  public readonly productUseCase: IProductUseCase

  constructor (productUseCase: IProductUseCase) {
    this.productUseCase = productUseCase
  }

  async create (productHttpRequest: ProductHttpRequest): Promise<ProductHttpResponse> {
    try {
      const productData: any = {
        ...productHttpRequest.body,
        createdAt: formatNowDate()
      }
      const fieldsRequired = ['name', 'category', 'price', 'quantityInStock']
      for (const field of fieldsRequired) {
        const fieldExists = Object.prototype.hasOwnProperty.call(productData, field)
        const value = productData[`${field}`]
        if (!fieldExists || value === undefined || value == null) {
          return badRequest(new MissingParamError(field))
        }
      }
      const createProductResponse = await this.productUseCase.createProduct(productData)
      if (createProductResponse.message !== 'Produto criado com sucesso') {
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
        ...productHttpRequest.body,
        editAt: formatNowDate()
      }

      const fildsRequired = ['_id', 'name', 'category', 'price', 'quantityInStock']
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

  async getProducts (companyId: string): Promise<ProductHttpResponse> {
    try {
      const productReponseUseCase = await this.productUseCase.getProducts(companyId)
      if (!productReponseUseCase.data) {
        return noContent(new NotFound(productReponseUseCase.message))
      }
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
