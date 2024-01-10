import { type CompanyEntity } from '../../entities/company/company-entity'
import { type ICompanyUseCase } from './port/company-port'
import { CompanyUseCase } from './company-usecase'

describe('CompanyUseCase', () => {
  let companyUseCase: CompanyUseCase
  let mockRepository: jest.Mocked<ICompanyUseCase>
  let companyEntity: CompanyEntity
  beforeEach(() => {
    mockRepository = {
      createCompany: jest.fn(),
      getCompany: jest.fn(),
      editCompany: jest.fn(),
      deleteCompany: jest.fn()
    }

    companyUseCase = new CompanyUseCase(mockRepository)
    companyEntity = {
      _id: 'someId',
      name: 'someName',
      createdAt: 'someDate',
      createWithGoogle: false,
      profilePicture: 'somePicture',
      email: 'someEmail'
    }
  })

  describe('createCompany', () => {
    it('should create a company successfully', async () => {
      const expectedResponse = {
        message: 'Empresa criada com sucesso',
        data: companyEntity
      }

      mockRepository.createCompany.mockResolvedValueOnce({ data: companyEntity })

      const result = await companyUseCase.createCompany(companyEntity)
      console.log(result)
      expect(mockRepository.createCompany).toHaveBeenCalledWith(companyEntity)
      expect(result).toEqual(expectedResponse)
    })
  })

  describe('getCompany', () => {
    it('should get a company successfully', async () => {
      const companyId = 'someCompanyId'
      const expectedResponse = {
        message: 'Empresa encontrada com sucesso',
        data: { ...companyEntity }
      }

      mockRepository.getCompany.mockResolvedValueOnce({ data: { ...companyEntity } })

      const result = await companyUseCase.getCompany(companyId)

      expect(mockRepository.getCompany).toHaveBeenCalledWith(companyId)
      expect(result).toEqual(expectedResponse)
    })

    it('should return a not found message if company is not found', async () => {
      const companyId = 'nonexistentCompanyId'
      const expectedResponse = {
        message: 'Empresa não encontrada'
      }

      mockRepository.getCompany.mockResolvedValueOnce(null)

      const result = await companyUseCase.getCompany(companyId)

      expect(mockRepository.getCompany).toHaveBeenCalledWith(companyId)
      expect(result).toEqual(expectedResponse)
    })
  })

  describe('editCompany', () => {
    it('should edit a company successfully', async () => {
      const companyId = 'someCompanyId'
      const expectedResponse = {
        message: 'Empresa editada com sucesso',
        data: { ...companyEntity }
      }

      mockRepository.editCompany.mockResolvedValueOnce({ data: { ...companyEntity } })

      const result = await companyUseCase.editCompany(companyId, companyEntity)

      expect(mockRepository.editCompany).toHaveBeenCalledWith(companyId, companyEntity)
      expect(result).toEqual(expectedResponse)
    })

    it('should return a not found message if company is not found', async () => {
      const companyId = 'nonexistentCompanyId'
      const expectedResponse = {
        message: 'Empresa não encontrada'
      }

      mockRepository.editCompany.mockResolvedValueOnce(null)

      const result = await companyUseCase.editCompany(companyId, companyEntity)

      expect(mockRepository.editCompany).toHaveBeenCalledWith(companyId, companyEntity)
      expect(result).toEqual(expectedResponse)
    })
  })

  describe('deleteCompany', () => {
    it('should delete a company successfully', async () => {
      const companyId = 'someCompanyId'
      const expectedResponse = {
        message: 'Empresa deletada com sucesso',
        data: { ...companyEntity }
      }

      mockRepository.deleteCompany.mockResolvedValueOnce({ data: { ...expectedResponse.data } })

      const result = await companyUseCase.deleteCompany(companyId)

      expect(mockRepository.deleteCompany).toHaveBeenCalledWith(companyId)
      expect(result).toEqual(expectedResponse)
    })

    it('should return a not found message if company is not found', async () => {
      const companyId = 'nonexistentCompanyId'
      const expectedResponse = {
        message: 'Empresa não encontrada'
      }

      mockRepository.deleteCompany.mockResolvedValueOnce(null)

      const result = await companyUseCase.deleteCompany(companyId)

      expect(mockRepository.deleteCompany).toHaveBeenCalledWith(companyId)
      expect(result).toEqual(expectedResponse)
    })
  })
})
