interface EmployeeData {
  _id?: any
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
  address: string
  houseNumber: string
  complement: string
  neighborhood: string
  stateOfTheCountry: string
  city: string
  createdAt: string
  createdBy: any
}
export class EmployeeEntity {
  _id?: any
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
  address: string
  houseNumber: string
  complement: string
  neighborhood: string
  stateOfTheCountry: string
  city: string
  createdAt: string
  createdBy: any
  constructor (employee: EmployeeData) {
    this._id = employee._id
    this.name = employee.name
    this.cpf = employee.cpf
    this.birthday = employee.birthday
    this.gender = employee.gender
    this.nickname = employee.nickname
    this.phoneNumber = employee.phoneNumber
    this.email = employee.email
    this.additionalInformation = employee.additionalInformation
    this.office = employee.office
    this.department = employee.department
    this.hiringDate = employee.hiringDate
    this.wage = employee.wage
    this.zipCode = employee.zipCode
    this.address = employee.address
    this.houseNumber = employee.houseNumber
    this.complement = employee.complement
    this.neighborhood = employee.neighborhood
    this.stateOfTheCountry = employee.stateOfTheCountry
    this.city = employee.city
    this.createdAt = employee.createdAt
    this.createdBy = employee.createdBy
    Object.freeze(this)
  }
}
