export interface ProductEdit {
  _id: string
  name: string
  description?: string
  categoryId: string
  price: number
  quantityInStock: number
}

export interface IProductCreateUseCase {
  createProduct: (product: {
    _id?: string
    name: string
    description?: string
    categoryId: string
    price: number
    quantityInStock: number
    createdAt: string
    createdBy: string
  }) => Promise<any>
  editProduct: (_id: string, product: ProductEdit) => Promise<any>
  getProduct: (objectId: string) => Promise<any>
  deleteProduct: (_id: string) => Promise<any>
}
