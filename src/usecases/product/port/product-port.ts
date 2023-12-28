export interface ProductEdit {
  _id: string
  name: string
  description?: string
  categoryId: string
  price: string
  quantityInStock: number
}

export interface IProductUseCase {
  createProduct: (product: {
    _id?: string
    name: string
    description?: string
    categoryId: string
    price: string
    quantityInStock: number
    createdAt: string
    createdBy: string
  }) => Promise<any>
  editProduct: (_id: string, product: ProductEdit) => Promise<any>
  getProduct: () => Promise<any>
  deleteProduct: (_id: string) => Promise<any>
}
