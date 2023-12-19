/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import {
  createUserAdapterRoute,
  editUserAdapterRoute,
  getUserAdapterRoute,
  loginUserAdapterRoute,
  deleteUserAdapterRoute
} from '../../adapter/user/express-route-adapter'
import { UserFactory } from '../../factories/user/user'

export default (router: Router): void => {
  const userFactory = UserFactory()
  router.put('/user/:id', editUserAdapterRoute(userFactory))
  router.get('/user', getUserAdapterRoute(userFactory))
  router.post('/user', createUserAdapterRoute(userFactory))
  router.post('/login', loginUserAdapterRoute(userFactory))
  router.delete('/user/:id', deleteUserAdapterRoute(userFactory))
}
