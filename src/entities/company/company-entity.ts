export interface CompanyData {
  _id?: any
  email: string
  name: string
  createdAt: string
  createWithGoogle: boolean
}
export class CompanyEntity {
  _id?: any
  email: string
  name: string
  createdAt: string
  createWithGoogle: boolean
  constructor (company: CompanyData) {
    this._id = company._id
    this.email = company.email
    this.name = company.name
    this.createdAt = company.createdAt
    this.createWithGoogle = company.createWithGoogle
    Object.freeze(this)
  }
}
