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
          ...employeeResponse.data
        }
      }
    }
  }

  async editEmployee (_id: string, employee: EmployeeI): Promise<any> {
    if (!this.validation.emailIsValid(employee.email)) {
      return { message: 'E-mail não é valido' }
    } else if (!this.validation.nameIsValid(employee.name)) {
      return { message: 'Nome não é valido' }
    } else {
      const employeeResponse = (await this.portRepository.editEmployee(_id, employee))
      return {
        message: 'Colaborador editado com sucesso',
        data: {
          ...employeeResponse.data
        }
      }
    }
  }

  async getEmployee (companyId: string): Promise<any> {
    const employeeRepositoryInfra = await this.portRepository.getEmployee(companyId)
    if (!employeeRepositoryInfra) {
      return { message: 'Colaborador não encontrado' }
    }
    return {
      data: { ...employeeRepositoryInfra }
    }
  }

  async deleteEmployee (employeeId: string): Promise<any> {
    const employeeRepositoryInfra = await this.portRepository.deleteEmployee(employeeId)
    if (!employeeRepositoryInfra) {
      return { message: 'Colaborador não encontrado' }
    }
    return { message: 'Colaborador deletado com sucesso', data: employeeRepositoryInfra.data }
  }
}
