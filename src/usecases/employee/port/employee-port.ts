export interface EmployeeI {
  name: string
  cpf: string
  birthday: string
  gender: string
  nickname: string
  phoneNumber: string
  email: string
  additionalInformation: string
  office: string
  department: string
  hiringDate: string
  wage: string
  zipCode: string
  street: string
  houseNumber: string
  complement: string
  neighborhood: string
  stateOfTheCountry: string
  city: string
  createdAt: string
  createdByTheCompanyId: string
}
export interface IEmployeeCreateUseCase {
  createEmployee: (user: EmployeeI) => Promise<any>
  editEmployee: (_id: string, user: EmployeeI) => Promise<any>
  getEmployee: (objectId: string) => Promise<any>
  deleteEmployee: (_id: string) => Promise<any>
}
