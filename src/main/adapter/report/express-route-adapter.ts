/** Adaptar o http generico do report para o http do express */
import { type Request, type Response } from 'express'
import { type ReportController } from '../../../interfaces/report/controllers/report-adapters'
import { type ReportHttpResponse } from '../../../interfaces/report/ports/report-http-response'

export const getReportAdapterRoute = (controller: ReportController) => {
  return async (request: Request, response: Response): Promise<void> => {
    const { companyId } = request.query

    const httpResponse: ReportHttpResponse = await controller.getReport(companyId as string)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
