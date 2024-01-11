import { type SaleEntity } from '../../entities/sale/sale-entity'
import { type ISaleUseCase } from './port/sale-port'
import { SaleUseCase } from './sale-usecase'

describe('SaleUseCase', () => {
  let saleUseCase: SaleUseCase
  let mockSaleEntity: SaleEntity
  let mockSaleRepository: jest.Mocked<ISaleUseCase>
  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    mockSaleEntity = {
      _id: '123',
      saleNumber: 1,
      dateOfSale: new Date().toDateString(),
      products: [],
      valueDiscount: '0',
      createdByTheCompanyId: '123',
      formOfPayment: ['Dinheiro'],
      resumeOfSale: {
        totalAmount: '0',
        totalOfSale: '0',
        valueDiscount: '0'
      },
      createdAt: new Date().toDateString(),
      customer: 'Customer name',
      description: 'Sale description',
      discount: '0',
      typeOfDiscount: false,
      informationAboutTheSale: 'Sale information'
    }

    mockSaleRepository = {
      createSale: jest.fn(),
      editSale: jest.fn(),
      getSale: jest.fn(),
      deleteSale: jest.fn(),
      getLastSaleNumber: jest.fn(),
      getQuantityOfSales: jest.fn(),
      getSalesIntheLast6Months: jest.fn()
    }

    saleUseCase = new SaleUseCase(mockSaleRepository)
  })

  it('createSale should call portRepository.createSale and return success message', async () => {
    mockSaleRepository.createSale.mockResolvedValueOnce({ data: mockSaleEntity })

    const result = await saleUseCase.createSale(mockSaleEntity)

    expect(mockSaleRepository.createSale).toHaveBeenCalledWith(mockSaleEntity)
    expect(result.message).toBe('Venda criada com sucesso')
    expect(result.data).toEqual(mockSaleEntity)
  })

  it('editSale should call portRepository.editSale and return success message', async () => {
    const saleId = '123'
    mockSaleRepository.editSale.mockResolvedValue({ data: mockSaleEntity })

    const result = await saleUseCase.editSale(saleId, mockSaleEntity)

    expect(mockSaleRepository.editSale).toHaveBeenCalledWith(saleId, mockSaleEntity)
    expect(result.message).toBe('Venda editada com sucesso')
    expect(result.data).toEqual(mockSaleEntity)
  })

  it('getSale should call portRepository.getSale and return sale data', async () => {
    const companyId = 'company123'
    mockSaleRepository.getSale.mockResolvedValue(mockSaleEntity)

    const result = await saleUseCase.getSale(companyId)

    expect(mockSaleRepository.getSale).toHaveBeenCalledWith(companyId)
    expect(result.data).toEqual(mockSaleEntity)
  })

  it('getSale should call portRepository.getSale and return message "Venda não encontrada"', async () => {
    const companyId = 'company123'
    mockSaleRepository.getSale.mockResolvedValue(false)

    const result = await saleUseCase.getSale(companyId)

    expect(mockSaleRepository.getSale).toHaveBeenCalledWith(companyId)
    expect(result.message).toEqual('Venda não encontrada')
  })

  it('deleteSale should call portRepository.deleteSale and return success message', async () => {
    const saleId = '123'
    mockSaleRepository.deleteSale.mockResolvedValue({ data: mockSaleEntity })

    const result = await saleUseCase.deleteSale(saleId)

    expect(mockSaleRepository.deleteSale).toHaveBeenCalledWith(saleId)
    expect(result.message).toBe('Venda deletada com sucesso')
    expect(result.data).toEqual(mockSaleEntity)
  })

  it('deleteSale should call portRepository.deleteSale and return success message', async () => {
    const saleId = '123'
    mockSaleRepository.deleteSale.mockResolvedValue(false)

    const result = await saleUseCase.deleteSale(saleId)

    expect(mockSaleRepository.deleteSale).toHaveBeenCalledWith(saleId)
    expect(result.message).toBe('Venda não encontrada')
  })

  it('getLastSaleNumber should call portRepository.getLastSaleNumber and return the new sale number', async () => {
    const companyId = 'company123'
    const mockLastSaleNumber = 10
    mockSaleRepository.getLastSaleNumber.mockResolvedValue(mockLastSaleNumber)

    const result = await saleUseCase.getLastSaleNumber(companyId)

    expect(mockSaleRepository.getLastSaleNumber).toHaveBeenCalledWith(companyId)
    expect(result).toBe(mockLastSaleNumber + 1)
  })

  it('getQuantityOfSales should call portRepository.getQuantityOfSales and return the quantity of sales', async () => {
    const companyId = 'company123'
    const mockQuantityOfSales = 5
    mockSaleRepository.getQuantityOfSales.mockResolvedValue(mockQuantityOfSales)

    const result = await saleUseCase.getQuantityOfSales(companyId)

    expect(mockSaleRepository.getQuantityOfSales).toHaveBeenCalledWith(companyId)
    expect(result).toBe(mockQuantityOfSales)
  })

  it('getSalesIntheLast6Months should call portRepository.getSalesIntheLast6Months and return sales data', async () => {
    const companyId = 'company123'
    mockSaleRepository.getQuantityOfSales.mockResolvedValue(mockSaleEntity)

    const result = await saleUseCase.getSalesIntheLast6Months(companyId)

    expect(result).toEqual(mockSaleEntity)
  })
})
