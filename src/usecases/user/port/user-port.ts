
export interface IUserCreateUseCase {
  create: (user: {
    id: string
    email: string
    name: string
    password: string
    token: string
    sessionToken: Date
  }) => Promise<string>
}
