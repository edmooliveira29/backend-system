/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import {
  createCompanyAdapterRoute,
  getCompanyAdapterRoute
} from '../../adapter/company/express-route-adapter'
import { CompanyFactory } from '../../factories/company/company'

export default (router: Router): void => {
  const companyFactory = CompanyFactory()
  router.get('/company', getCompanyAdapterRoute(companyFactory))
  router.post('/company', createCompanyAdapterRoute(companyFactory))
}
