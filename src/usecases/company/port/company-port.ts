export interface ICompanyCreateUseCase {
  createCompany: (company: {
    _id: string
    email: string
    name: string
    password: string
    createdAt: string
    createWithGoogle: boolean
  }) => Promise<any>
}
