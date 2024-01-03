import { type SaleEntity } from '../../../entities/sale/sale-entity'

export interface ISaleUseCase {
  [x: string]: any
  getLastSaleNumber: (companyId: string) => Promise<number>
  createSale: (sale: SaleEntity) => Promise<any>
  editSale: (_id: string, sale: SaleEntity) => Promise<any>
  getSale: (companyId: string) => Promise<any>
  deleteSale: (_id: string) => Promise<any>
}
