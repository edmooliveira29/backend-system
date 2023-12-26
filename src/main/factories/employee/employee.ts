import { EmployeeController } from '../../../interfaces/employee/controllers/employee-adapters'
import { EmployeeRepositoryInfra } from '../../../infra/employee/employee-repository'
import { EmployeeUseCase } from '../../../usecases/employee/employee-usecase'

export const EmployeeFactory = (): EmployeeController => {
  const employeeRepositoryInfra = new EmployeeRepositoryInfra()
  const employeeUseCase = new EmployeeUseCase(employeeRepositoryInfra)
  const employeeController = new EmployeeController(employeeUseCase)
  return employeeController
}
