import { type SaleEntity } from '../../../entities/sale/sale-entity'

export interface ISaleDataAccess {
  createSale: (sale: SaleEntity) => Promise<string>
  getSale: () => Promise<string>
  editSale: (_id: string, sale: SaleEntity) => Promise<object>
  getQuantityOfSales: () => Promise<any>
}
