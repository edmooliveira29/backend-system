
export interface IUserCreateUseCase {
  create: (user: {
    id: string
    email: string
    name: string
    password: string
    sessionToken: string
    createdAt: string
  }) => Promise<any>

  login: (user: { email: string, password: string, remember: boolean }) => Promise<any>
}
