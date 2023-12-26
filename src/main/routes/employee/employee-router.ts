/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import {
  createEmployeeAdapterRoute,
  editEmployeeAdapterRoute,
  getEmployeeAdapterRoute,
  deleteEmployeeAdapterRoute
} from '../../adapter/employee/express-route-adapter'
import { EmployeeFactory } from '../../factories/employee/employee'

export default (router: Router): void => {
  const employeeFactory = EmployeeFactory()
  router.put('/employee/:id', editEmployeeAdapterRoute(employeeFactory))
  router.get('/employee', getEmployeeAdapterRoute(employeeFactory))
  router.post('/employee', createEmployeeAdapterRoute(employeeFactory))
  router.delete('/employee/:id', deleteEmployeeAdapterRoute(employeeFactory))
}
