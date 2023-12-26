import { type EmployeeEntity } from '../../../entities/employee/employee-entity'
import { type EmployeeI } from './employee-port'

export interface IEmployeeDataAccess {
  createEmployee: (employee: EmployeeEntity) => Promise<string>
  getEmployee: (objectId: string) => Promise<string>
  editEmployee: (_id: string, employee: EmployeeI) => Promise<object>
}
