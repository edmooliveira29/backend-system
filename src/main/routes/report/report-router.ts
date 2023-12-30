/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import { getReportAdapterRoute } from '../../adapter/report/express-route-adapter'
import { ReportFactory } from '../../factories/report/report'

export default (router: Router): void => {
  const reportFactory = ReportFactory()
  router.get('/report', getReportAdapterRoute(reportFactory))
}
