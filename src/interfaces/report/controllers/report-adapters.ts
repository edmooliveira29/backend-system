import { type IReportUseCase } from '../../../usecases/report/port/report-port'
import { internalError, noContent, ok } from '../../helpers/http-helper'
import { NotFound, ServerError } from '../errors'
import { type ReportHttpResponse } from '../ports'

export class ReportController {
  public readonly reportUseCase: IReportUseCase

  constructor (reportUseCase: IReportUseCase) {
    this.reportUseCase = reportUseCase
  }

  async getReport (sessionToken: string): Promise<ReportHttpResponse> {
    try {
      const reportReponseUseCase = await this.reportUseCase.getReport()

      if (!reportReponseUseCase.data) {
        return noContent(new NotFound(reportReponseUseCase.message))
      }
      return ok({ message: reportReponseUseCase.message, ...reportReponseUseCase })
    } catch (error: any) {
      console.error(error)
      return internalError(new ServerError(error.message))
    }
  }
}
