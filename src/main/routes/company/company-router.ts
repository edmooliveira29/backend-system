/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import { createCompanyAdapterRoute } from '../../adapter/company/express-company-adapter'
import { UserFactory } from '../../factories/user/user'

export default (router: Router): void => {
  const userFactory = UserFactory()
  router.post('/company', createCompanyAdapterRoute(userFactory))
}
