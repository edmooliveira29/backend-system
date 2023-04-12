/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import { adapterRoute } from '../../adapter/express-route-adapter'

import { UserCreateFactory } from '../../factories/user/user-create'
export default (router: Router): void => {
  router.post('/user', adapterRoute(UserCreateFactory()))
}
