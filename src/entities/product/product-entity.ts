interface ProductData {
  _id?: any
  name: string
  description?: string
  categoryId: string
  price: number
  quantityInStock: number
  createdAt: string
  createdBy: any
}
export class ProductEntity {
  _id?: any
  name: string
  description?: string
  categoryId: string
  price: number
  quantityInStock: number
  createdAt: string
  createdBy: any
  constructor (category: ProductData) {
    this._id = category._id
    this.name = category.name
    this.categoryId = category.categoryId
    this.price = category.price
    this.quantityInStock = category.quantityInStock
    this.description = category.description
    this.createdAt = category.createdAt
    this.createdBy = category.createdBy
    Object.freeze(this)
  }
}
