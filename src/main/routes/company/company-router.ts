/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import { createCompanyAdapterRoute } from '../../adapter/company/express-company-adapter'
import { CompanyFactory } from '../../factories/company/company'

export default (router: Router): void => {
  const userFactory = CompanyFactory()
  console.log('aqui')
  router.post('/company', createCompanyAdapterRoute(userFactory))
}
