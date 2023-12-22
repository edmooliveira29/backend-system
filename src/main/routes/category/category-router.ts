/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import {
  createCategoryAdapterRoute,
  editCategoryAdapterRoute,
  getCategoryAdapterRoute,
  deleteCategoryAdapterRoute
} from '../../adapter/category/express-route-adapter'
import { CategoryFactory } from '../../factories/category/category'

export default (router: Router): void => {
  const categoryFactory = CategoryFactory()
  router.put('/category/:id', editCategoryAdapterRoute(categoryFactory))
  router.get('/category', getCategoryAdapterRoute(categoryFactory))
  router.post('/category', createCategoryAdapterRoute(categoryFactory))
  router.delete('/category/:id', deleteCategoryAdapterRoute(categoryFactory))
}
