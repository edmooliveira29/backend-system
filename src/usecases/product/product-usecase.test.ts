import { type ProductEntity } from '../../entities/product/product-entity'
import { type IProductUseCase } from './port/product-port'
import { ProductUseCase } from './product-usecase'

describe('ProductUseCase', () => {
  let productUseCase: ProductUseCase
  let mockRepository: jest.Mocked<IProductUseCase>
  let productEntity: ProductEntity
  beforeEach(() => {
    mockRepository = {
      createProduct: jest.fn(),
      editProduct: jest.fn(),
      getProducts: jest.fn(),
      deleteProduct: jest.fn()
    }

    productEntity = {
      _id: 'someId',
      type: 'someType',
      name: 'someName',
      description: 'someDescription',
      category: 'someCategory',
      price: '10',
      quantityInStock: 10,
      createdAt: 'someDate',
      createdByTheCompanyId: 'someCompanyId'
    }
    productUseCase = new ProductUseCase(mockRepository)
  })

  describe('createProduct', () => {
    it('should create a product successfully', async () => {
      const expectedResponse = {
        message: 'Produto criado com sucesso',
        data: productEntity
      }

      mockRepository.createProduct.mockResolvedValueOnce({ data: productEntity })

      const result = await productUseCase.createProduct(productEntity)

      expect(mockRepository.createProduct).toHaveBeenCalledWith(productEntity)
      expect(result).toEqual(expectedResponse)
    })
  })

  describe('editProduct', () => {
    it('should edit a product successfully', async () => {
      const productId = 'someId'
      const expectedResponse = {
        message: 'Produto editado com sucesso',
        data: productEntity
      }

      mockRepository.editProduct.mockResolvedValueOnce({ data: productEntity })

      const result = await productUseCase.editProduct(productId, productEntity)
      expect(mockRepository.editProduct).toHaveBeenCalledWith(productId, productEntity)
      expect(result).toEqual(expectedResponse)
    })
  })

  describe('getProducts', () => {
    it('should get products successfully', async () => {
      const companyId = 'someCompanyId'
      const expectedResponse = {
        message: 'Produto encontrado com sucesso',
        data: productEntity
      }

      mockRepository.getProducts.mockResolvedValueOnce({ data: productEntity })

      const result = await productUseCase.getProducts(companyId)

      expect(mockRepository.getProducts).toHaveBeenCalledWith(companyId)
      expect(result).toEqual(expectedResponse)
    })

    it('should return a not found message if products are not found', async () => {
      const companyId = 'nonexistentCompanyId'
      const expectedResponse = {
        message: 'Produto não encontrada'
      }

      mockRepository.getProducts.mockResolvedValueOnce(null)

      const result = await productUseCase.getProducts(companyId)

      expect(mockRepository.getProducts).toHaveBeenCalledWith(companyId)
      expect(result).toEqual(expectedResponse)
    })
  })

  describe('deleteProduct', () => {
    it('should delete a product successfully', async () => {
      const productId = 'someProductId'
      const expectedResponse = {
        message: 'Produto deletado com sucesso',
        data: productEntity
      }

      mockRepository.deleteProduct.mockResolvedValueOnce({
        data: productEntity
      })

      const result = await productUseCase.deleteProduct(productId)

      expect(mockRepository.deleteProduct).toHaveBeenCalledWith(productId)
      expect(result).toEqual(expectedResponse)
    })

    it('should return a not found message if product is not found', async () => {
      const productId = 'nonexistentProductId'
      const expectedResponse = {
        message: 'Produto não encontrado'
      }

      mockRepository.deleteProduct.mockResolvedValueOnce(null)

      const result = await productUseCase.deleteProduct(productId)

      expect(mockRepository.deleteProduct).toHaveBeenCalledWith(productId)
      expect(result).toEqual(expectedResponse)
    })
  })
})
