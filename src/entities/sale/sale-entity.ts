interface SaleData {
  _id?: any
  saleNumber: number
  customerId: string
  dateOfSale: string
  formOfPayment: string[]
  products: any[]
  resumeOfSale: any
  description: string
  discount: string
  valueDiscount: string
  typeOfDiscount: false
  informationAboutTheSale: string
  createdAt: string
  createdBy: any
}
export class SaleEntity {
  _id?: any
  saleNumber: number
  customerId: string
  dateOfSale: string
  formOfPayment: string[]
  products: any[]
  resumeOfSale: any
  description: string
  discount: string
  valueDiscount: string
  typeOfDiscount: false
  informationAboutTheSale: string
  createdAt: string
  createdBy: any
  constructor (sale: SaleData) {
    this._id = sale._id
    this.saleNumber = sale.saleNumber
    this.customerId = sale.customerId
    this.dateOfSale = sale.dateOfSale
    this.formOfPayment = sale.formOfPayment
    this.products = sale.products
    this.resumeOfSale = sale.resumeOfSale
    this.description = sale.description
    this.discount = sale.discount
    this.valueDiscount = sale.valueDiscount
    this.typeOfDiscount = sale.typeOfDiscount
    this.informationAboutTheSale = sale.informationAboutTheSale
    this.createdAt = sale.createdAt
    this.createdBy = sale.createdBy
    Object.freeze(this)
  }
}
