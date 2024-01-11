export interface ProductEdit {
  _id?: string
  name: string
  description?: string
  category: string
  price: string
  quantityInStock: number
  type: string
}

export interface IProductUseCase {
  createProduct: (product: {
    _id?: string
    name: string
    type: string
    description?: string
    category: string
    price: string
    quantityInStock: number
    createdAt: string
    createdByTheCompanyId: string
  }) => Promise<any>
  editProduct: (_id: string, product: ProductEdit) => Promise<any>
  getProducts: (companyId: string) => Promise<any>
  deleteProduct: (_id: string) => Promise<any>
}
