import { type CategoryEntity } from '../../entities/category/category-entity'
import { type ICategoryCreateUseCase, type CategoryEdit } from './port/category-port'
import { CategoryUseCase } from './category-usecase'

describe('CategoryUseCase', () => {
  let categoryUseCase: CategoryUseCase
  let mockRepository: jest.Mocked<ICategoryCreateUseCase>
  let categoryEntity: CategoryEntity
  beforeEach(() => {
    mockRepository = {
      createCategory: jest.fn(),
      editCategory: jest.fn(),
      getCategory: jest.fn(),
      deleteCategory: jest.fn()
    }

    categoryUseCase = new CategoryUseCase(mockRepository)
    categoryEntity = {
      _id: 'someId',
      name: 'someName',
      type: 'someType',
      description: 'someDescription',
      createdAt: 'someDate',
      createdByTheCompanyId: 'someCompanyId'
    }
  })

  describe('createCategory', () => {
    it('should create a category successfully', async () => {
      const expectedResponse = {
        message: 'Categoria criada com sucesso',
        data: { ...categoryEntity }
      }

      mockRepository.createCategory.mockResolvedValueOnce({ data: { ...categoryEntity } })

      const result = await categoryUseCase.createCategory(categoryEntity)
      console.log(result)
      expect(mockRepository.createCategory).toHaveBeenCalledWith(categoryEntity)
      expect(result).toEqual(expectedResponse)
    })
  })

  describe('editCategory', () => {
    it('should edit a category successfully', async () => {
      const categoryId = 'someId'
      const categoryEdit: CategoryEdit = {
        _id: 'someId',
        name: 'someName',
        type: 'someType',
        description: 'someDescription'
      }
      const expectedResponse = {
        message: 'Categoria editado com sucesso',
        data: { ...categoryEdit }
      }

      mockRepository.editCategory.mockResolvedValueOnce({ data: { ...categoryEdit } })

      const result = await categoryUseCase.editCategory(categoryId, categoryEdit)

      expect(mockRepository.editCategory).toHaveBeenCalledWith(categoryId, categoryEdit)
      expect(result).toEqual(expectedResponse)
    })
  })

  describe('getCategory', () => {
    it('should get a category successfully', async () => {
      const companyId = 'someCompanyId'
      const expectedResponse = {
        message: 'Categoria encontrada com sucesso',
        data: categoryEntity
      }

      mockRepository.getCategory.mockResolvedValueOnce({ ...expectedResponse })

      const result = await categoryUseCase.getCategory(companyId)
      console.log(result)
      expect(mockRepository.getCategory).toHaveBeenCalledWith(companyId)
      expect(result).toEqual(expectedResponse)
    })

    it('should return a not found message if category is not found', async () => {
      const companyId = 'nonexistentCompanyId'
      const expectedResponse = {
        message: 'Categoria não encontrada'
      }

      mockRepository.getCategory.mockResolvedValueOnce(null)

      const result = await categoryUseCase.getCategory(companyId)

      expect(mockRepository.getCategory).toHaveBeenCalledWith(companyId)
      expect(result).toEqual(expectedResponse)
    })
  })

  describe('deleteCategory', () => {
    it('should delete a category successfully', async () => {
      const categoryId = 'someCategoryId'
      const expectedResponse = {
        message: 'Categoria deletada com sucesso',
        data: { /* expected data from deleteCategory method */ }
      }

      mockRepository.deleteCategory.mockResolvedValueOnce({ data: { ...expectedResponse.data } })

      const result = await categoryUseCase.deleteCategory(categoryId)

      expect(mockRepository.deleteCategory).toHaveBeenCalledWith(categoryId)
      expect(result).toEqual(expectedResponse)
    })

    it('should return a not found message if category is not found', async () => {
      const categoryId = 'nonexistentCategoryId'
      const expectedResponse = {
        message: 'Categoria não encontrado'
      }

      mockRepository.deleteCategory.mockResolvedValueOnce(null)

      const result = await categoryUseCase.deleteCategory(categoryId)

      expect(mockRepository.deleteCategory).toHaveBeenCalledWith(categoryId)
      expect(result).toEqual(expectedResponse)
    })
  })
})
