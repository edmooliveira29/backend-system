export interface UserEdit {
  _id: string
  address: string
  birthday: string
  city: string
  complement: string
  cpf: string
  email: string
  gender: string
  houseNumber: string
  name: string
  neighborhood: string
  nickname: string
  phoneNumber: string
  stateOfTheCountry: string
  zipCode: string
}
export interface IUserCreateUseCase {
  createUser: (user: {
    _id: string
    email: string
    name: string
    password: string
    createdAt: string
  }) => Promise<any>
  login: (user: { email: string, password: string, remember: boolean }, sessionToken?: string) => Promise<any>
  editUser: (_id: string, user: UserEdit) => Promise<any>
  getUser: (objectId: string) => Promise<any>
}
