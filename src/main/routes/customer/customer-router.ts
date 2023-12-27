/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import {
  createCustomerAdapterRoute,
  editCustomerAdapterRoute,
  getCustomerAdapterRoute,
  deleteCustomerAdapterRoute
} from '../../adapter/customer/express-route-adapter'
import { CustomerFactory } from '../../factories/customer/customer'

export default (router: Router): void => {
  const customerFactory = CustomerFactory()
  router.put('/customer/:id', editCustomerAdapterRoute(customerFactory))
  router.get('/customer', getCustomerAdapterRoute(customerFactory))
  router.post('/customer', createCustomerAdapterRoute(customerFactory))
  router.delete('/customer/:id', deleteCustomerAdapterRoute(customerFactory))
}
