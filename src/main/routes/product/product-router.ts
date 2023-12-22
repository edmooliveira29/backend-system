/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import {
  createProductAdapterRoute,
  editProductAdapterRoute,
  getProductAdapterRoute,
  deleteProductAdapterRoute
} from '../../adapter/product/express-route-adapter'
import { ProductFactory } from '../../factories/product/product'

export default (router: Router): void => {
  const productFactory = ProductFactory()
  router.put('/product/:id', editProductAdapterRoute(productFactory))
  router.get('/product', getProductAdapterRoute(productFactory))
  router.post('/product', createProductAdapterRoute(productFactory))
  router.delete('/product/:id', deleteProductAdapterRoute(productFactory))
}
