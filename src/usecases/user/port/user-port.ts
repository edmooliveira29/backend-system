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
  newPassword: string
  newPasswordConfirmation: string
  password: string
  lastChangedPassword?: string
  profilePicture: string
}
export interface IUserCreateUseCase {
  createUser: (user: {
    _id?: string
    email: string
    name: string
    password: string
    createdAt: string
    createWithGoogle: boolean
    profilePicture: string
    companyId: string
    createdBy: string
  }) => Promise<any>
  login: (user: { email: string, password: string, remember: boolean }, sessionToken?: string) => Promise<any>
  editUser: (_id: string, user: UserEdit) => Promise<any>
  getUser: (objectId: string) => Promise<any>
}
