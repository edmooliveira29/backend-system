export interface CategoryEdit {
  _id: string
  type: string
  name: string
  description: string
}

export interface ICategoryCreateUseCase {
  createCategory: (category: {
    _id?: string
    type: string
    description?: string
    name: string
    createdAt: string
    createdBy: string
  }) => Promise<any>
  editCategory: (_id: string, category: CategoryEdit) => Promise<any>
  getCategory: (objectId: string) => Promise<any>
  deleteCategory: (_id: string) => Promise<any>
}
