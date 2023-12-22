interface CategoryData {
  _id?: any
  type: string
  name: string
  description?: string
  createdAt: string
  createdBy: any
}
export class CategoryEntity {
  _id?: any
  type: string
  description?: string
  name: string
  createdAt: string
  createdBy: any
  constructor (category: CategoryData) {
    this._id = category._id
    this.name = category.name
    this.type = category.type
    this.description = category.description
    this.createdAt = category.createdAt
    this.createdBy = category.createdBy
    Object.freeze(this)
  }
}
