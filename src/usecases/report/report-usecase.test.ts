import { ReportUseCase } from './report-usecase'

const mockSaleUseCase = {
  getSale: jest.fn()
}

const mockCustomerUseCase = {
  getCustomer: jest.fn()
}

const mockProductUseCase = {
}

describe('ReportUseCase', () => {
  let reportUseCase: ReportUseCase

  beforeEach(() => {
    reportUseCase = new ReportUseCase(
      mockSaleUseCase as any,
      mockCustomerUseCase as any,
      mockProductUseCase as any
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should generate a report', async () => {
    mockSaleUseCase.getSale.mockResolvedValueOnce({
      data: {
        data: [
          {
            dateOfSale: '2024-01-11T17:01:44',
            resumeOfSale: { totalAmount: '15,99', valueDiscount: '', totalOfSale: '15,99' },
            products: [
              {
                'productId-0': {
                  name: 'Produto 1',
                  price: '15,99'
                },
                'quantity-0': '1'
              }
            ]
          },
          {
            dateOfSale: '2024-01-11T17:01:44',
            resumeOfSale: { totalAmount: '106,14', valueDiscount: '', totalOfSale: '106,14' },
            products:
              [
                {
                  'productId-0': {
                    name: 'Produto 1',
                    price: '15,99'
                  },
                  'quantity-0': '1'
                },
                {
                  'productId-1': {
                    name: 'Produto 2',
                    price: '90,15'
                  },
                  'quantity-1': '1'
                }
              ]
          }
        ]
      }
    }
    )

    mockCustomerUseCase.getCustomer.mockResolvedValueOnce({ data: [] })
    const result = await reportUseCase.getReport('companyId')

    expect(result).toEqual({
      message: 'Relatório gerado com sucesso',
      data: {
        quantityOfSales: 2,
        quantityOfCustomers: 0,
        totalOfSales: '122,13',
        products: [{
          name: 'Produto 1',
          value: 2
        },
        {
          name: 'Produto 2',
          value: 1
        }
        ],
        salesIntheLast6Months: {
          average: [61.065],
          monthsName: ['dez'],
          quantity: [2]
        }
      }
    })

    expect(mockSaleUseCase.getSale).toHaveBeenCalledWith('companyId')
    expect(mockCustomerUseCase.getCustomer).toHaveBeenCalledWith('companyId')
  })
})
