interface ProductData {
  _id?: any
  name: string
  type: string
  description?: string
  category: string
  price: string
  quantityInStock: number
  createdAt: string
  createdByTheCompanyId: any
}
export class ProductEntity {
  _id?: any
  name: string
  type: string
  description?: string
  category: string
  price: string
  quantityInStock: number
  createdAt: string
  createdByTheCompanyId: any
  constructor (category: ProductData) {
    this._id = category._id
    this.type = category.type
    this.name = category.name
    this.category = category.category
    this.price = category.price
    this.quantityInStock = category.quantityInStock
    this.description = category.description
    this.createdAt = category.createdAt
    this.createdByTheCompanyId = category.createdByTheCompanyId
    Object.freeze(this)
  }
}
