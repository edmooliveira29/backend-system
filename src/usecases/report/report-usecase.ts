import { type ICustomerUseCase } from '../customer/port/customer-port'
import { type IProductUseCase } from '../product/port/product-port'
import { type ISaleUseCase } from '../sale/port/sale-port'
import { type IReportDataAccess } from './port/report-data-access'
import { format, parseISO } from 'date-fns'
import { pt } from 'date-fns/locale'

export class ReportUseCase implements IReportDataAccess {
  public readonly salesUseCase: ISaleUseCase
  public readonly customerUseCase: ICustomerUseCase
  public readonly productUseCase: IProductUseCase

  constructor (ISaleCreateUseCase: ISaleUseCase, ICustomerCreateUseCase: ICustomerUseCase, IProductCreateUseCase: IProductUseCase) {
    this.salesUseCase = ISaleCreateUseCase
    this.customerUseCase = ICustomerCreateUseCase
    this.productUseCase = IProductCreateUseCase
  }

  async getReport (): Promise<any> {
    const { data: sales } = await this.salesUseCase.getSale()
    const customers = await this.customerUseCase.getCustomer()
    let totalOfSales = 0
    const products = quantityOfTheProductsSold(sales.data)
    for (const sale of sales.data) {
      totalOfSales += Number((sale.resumeOfSale.totalOfSale).replace(',', '.'))
    }
    const salesIntheLast6Months = calcularMediaEVendas(sales.data)
    return {
      message: 'Relatório gerado com sucesso',
      data: {
        quantityOfSales: sales.data.length,
        quantityOfCustomers: customers.data.length,
        totalOfSales: totalOfSales.toFixed(2).replace('.', ','),
        products,
        salesIntheLast6Months
      }
    }
  }
}

const quantityOfTheProductsSold = (dados: any): any => {
  const productsSold: any = {}
  dados.forEach((venda: any) => {
    venda.products.forEach((produto: any, index: number) => {
      const nameOfProduct = produto[`productId-${index}`].name
      const quantitySold = parseInt(produto[`quantity-${index}`])
      if (productsSold[nameOfProduct]) {
        productsSold[nameOfProduct] += quantitySold
      } else {
        productsSold[nameOfProduct] = quantitySold
      }
    })
  })

  return Object.entries(productsSold).map(([name, value]) => ({ name, value }))
}

const calcularMediaEVendas = (salesData: any): any => {
  const salesByMonth = salesData.map((sale: any) => {
    return {
      monthYear: sale.dateOfSale,
      totalOfSale: parseFloat(sale.resumeOfSale.totalOfSale.replace(',', '.'))
    }
  })

  const currentDate = new Date()
  const sixMonthsAgo = new Date(currentDate)
  sixMonthsAgo.setMonth(currentDate.getMonth() - 6)
  const filteredSales = salesByMonth.filter((sale: any) => new Date(sale.monthYear) > sixMonthsAgo)
  const organizedData: any = {}

  filteredSales.forEach((item: any) => {
    const month = item.monthYear.substring(0, 7)
    if (!organizedData[month]) {
      organizedData[month] = { total: 0, count: 0 }
    }
    organizedData[month].total += item.totalOfSale
    organizedData[month].count += 1
  })

  const result: any = {
    average: [],
    quantity: [],
    monthsName: []
  }
  const sortedMonths = Object.keys(organizedData).sort() // Ordenar os meses

  for (const month of sortedMonths) {
    const average = organizedData[month].total / organizedData[month].count
    const quantity = organizedData[month].count
    const monthName = format(parseISO(`${month}-01T00:00:00.000Z`), 'MMMM', { locale: pt }).slice(0, 3)

    result.average.push(average)
    result.quantity.push(quantity)
    result.monthsName.push(monthName)
  }

  return result
}
