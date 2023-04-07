
export interface IUserCreateAdapter {
  create: (user: {
    id: string
    email: string
    name: string
    password: string
    token: string
    expiration: Date
  }) => Promise<string>
}
