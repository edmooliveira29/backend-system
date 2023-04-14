
export interface IUserCreateUseCase {
  create: (user: {
    id: string
    email: string
    name: string
    password: string
    token: string
    sessionId: Date
  }) => Promise<string>
}
