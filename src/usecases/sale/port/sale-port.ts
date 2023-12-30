import { type SaleEntity } from '../../../entities/sale/sale-entity'

export interface ISaleUseCase {
  [x: string]: any
  getLastSaleNumber: () => Promise<number>
  createSale: (sale: SaleEntity) => Promise<any>
  editSale: (_id: string, sale: SaleEntity) => Promise<any>
  getSale: () => Promise<any>
  deleteSale: (_id: string) => Promise<any>
}
