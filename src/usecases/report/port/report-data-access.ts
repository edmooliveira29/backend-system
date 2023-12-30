export interface IReportDataAccess {
  getReport: () => Promise<string>
}
