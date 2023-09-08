/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import { createUserAdapterRoute, getUserAdapterRoute, loginUserAdapterRoute } from '../../adapter/user/express-route-adapter'
import { UserFactory } from '../../factories/user/user'

export default (router: Router): void => {
  const userFactory = UserFactory()
  router.get('/user', getUserAdapterRoute(userFactory))
  router.post('/user', createUserAdapterRoute(userFactory))
  router.post('/login', loginUserAdapterRoute(userFactory))
}
