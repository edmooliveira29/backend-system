export interface IReportDataAccess {
  getReport: (companyId: string) => Promise<string>
}
