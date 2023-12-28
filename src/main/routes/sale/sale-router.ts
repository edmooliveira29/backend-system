/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import {
  createSaleAdapterRoute,
  editSaleAdapterRoute,
  getSaleAdapterRoute,
  deleteSaleAdapterRoute
} from '../../adapter/sale/express-route-adapter'
import { SaleFactory } from '../../factories/sale/sale'

export default (router: Router): void => {
  const saleFactory = SaleFactory()
  router.put('/sale/:id', editSaleAdapterRoute(saleFactory))
  router.get('/sale', getSaleAdapterRoute(saleFactory))
  router.post('/sale', createSaleAdapterRoute(saleFactory))
  router.delete('/sale/:id', deleteSaleAdapterRoute(saleFactory))
}
