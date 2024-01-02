export interface IReportUseCase {
  getReport: (companyId: string) => Promise<any>
}
