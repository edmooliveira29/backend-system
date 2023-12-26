import { type EmployeeEntity } from '../../entities/employee/employee-entity'
import { type IEmployeeDataAccess } from './port/employee-data-access'
import { type EmployeeI, type IEmployeeCreateUseCase } from './port/employee-port'
import { Validation } from '../validation/validations'

export class EmployeeUseCase implements IEmployeeDataAccess {
  public readonly portRepository: IEmployeeCreateUseCase
  public readonly validation: Validation

  constructor (IEmployeeCreateUseCase: IEmployeeCreateUseCase) {
    this.portRepository = IEmployeeCreateUseCase
    this.validation = new Validation()
  }

  async createEmployee (employee: EmployeeEntity): Promise<any> {
    if (!this.validation.emailIsValid(employee.email)) {
      return { message: 'E-mail não é valido' }
    } else if (!this.validation.nameIsValid(employee.name)) {
      return { message: 'Nome não é valido' }
    } else {
      const employeeResponse = await this.portRepository.createEmployee(employee)

      return {
        message: 'Colaborador criado com sucesso',
        data: {
          _id: employeeResponse.data._id,
          name: employeeResponse.data.name,
          cpf: employeeResponse.data.cpf,
          birthday: employeeResponse.data.birthday,
          gender: employeeResponse.data.gender,
          nickname: employeeResponse.data.nickname,
          phoneNumber: employeeResponse.data.phoneNumber,
          email: employeeResponse.data.email,
          additionalInformation: employeeResponse.data.additionalInformation,
          office: employeeResponse.data.office,
          department: employeeResponse.data.department,
          hiringDate: employeeResponse.data.hiringDate,
          wage: employeeResponse.data.wage,
          zipCode: employeeResponse.data.zipCode,
          address: employeeResponse.data.address,
          houseNumber: employeeResponse.data.houseNumber,
          complement: employeeResponse.data.complement,
          neighborhood: employeeResponse.data.neighborhood,
          stateOfTheCountry: employeeResponse.data.stateOfTheCountry,
          city: employeeResponse.data.city
        }
      }
    }
  }

  async editEmployee (_id: string, employee: EmployeeI): Promise<any> {
    const employeeFound = await this.getEmployee(_id)
    const employeeResponse = (await this.portRepository.editEmployee(_id, employeeFound))
    if (!this.validation.emailIsValid(employee.email)) {
      return { message: 'E-mail não é valido' }
    } else if (!this.validation.nameIsValid(employee.name)) {
      return { message: 'Nome não é valido' }
    } else {
      return {
        message: 'Colaborador editado com sucesso',
        data: {
          _id: employeeResponse.data._id,
          name: employeeResponse.data.name,
          cpf: employeeResponse.data.cpf,
          birthday: employeeResponse.data.birthday,
          gender: employeeResponse.data.gender,
          nickname: employeeResponse.data.nickname,
          phoneNumber: employeeResponse.data.phoneNumber,
          email: employeeResponse.data.email,
          additionalInformation: employeeResponse.data.additionalInformation,
          office: employeeResponse.data.office,
          department: employeeResponse.data.department,
          hiringDate: employeeResponse.data.hiringDate,
          wage: employeeResponse.data.wage,
          zipCode: employeeResponse.data.zipCode,
          address: employeeResponse.data.address,
          houseNumber: employeeResponse.data.houseNumber,
          complement: employeeResponse.data.complement,
          neighborhood: employeeResponse.data.neighborhood,
          stateOfTheCountry: employeeResponse.data.stateOfTheCountry,
          city: employeeResponse.data.city
        }
      }
    }
  }

  async getEmployee (employeeId: string): Promise<any> {
    const employeeRepositoryInfra = await this.portRepository.getEmployee(employeeId)
    if (!employeeRepositoryInfra) {
      return { message: 'Colaborador não encontrado' }
    }

    return { message: 'Colaborador encontrado com sucesso', ...employeeRepositoryInfra }
  }

  async deleteEmployee (employeeId: string): Promise<any> {
    const employeeRepositoryInfra = await this.portRepository.deleteEmployee(employeeId)
    if (!employeeRepositoryInfra) {
      return { message: 'Colaborador não encontrado' }
    }
    return { message: 'Colaborador deletado com sucesso', data: employeeRepositoryInfra.data }
  }
}
