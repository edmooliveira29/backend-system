/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import { createUserAdapterRoute, loginUserAdapterRoute } from '../../adapter/user/express-route-adapter'
import { UserCreateFactory } from '../../factories/user/user-create'

export default (router: Router): void => {
  router.post('/user', createUserAdapterRoute(UserCreateFactory()))
  router.post('/login', loginUserAdapterRoute(UserCreateFactory()))
}
