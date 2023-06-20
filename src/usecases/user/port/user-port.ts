
export interface IUserCreateUseCase {
  create: (user: {
    id: string
    email: string
    name: string
    password: string
    sessionToken: string
    createdAt: string
  }) => Promise<string>

  login: (user: { email: string, password: string }) => Promise<any>
}
