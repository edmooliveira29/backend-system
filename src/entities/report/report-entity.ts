interface ReportData {
  quantityOfSales: number
  quantityOfCustomers: number
  totalOfSales: string
  products: any[]
  salesIntheLast6Months: any[]
}
export class ReportEntity {
  quantityOfSales: number
  quantityOfCustomers: number
  totalOfSales: string
  products: any[]
  salesIntheLast6Months: any[]
  constructor (report: ReportData) {
    this.quantityOfSales = report.quantityOfSales
    this.quantityOfCustomers = report.quantityOfCustomers
    this.totalOfSales = report.totalOfSales
    this.products = report.products
    this.salesIntheLast6Months = report.salesIntheLast6Months

    Object.freeze(this)
  }
}
