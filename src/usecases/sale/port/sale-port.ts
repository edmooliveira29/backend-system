import { type SaleEntity } from '../../../entities/sale/sale-entity'

export interface ISaleCreateUseCase {
  getLastSaleNumber: () => Promise<number>
  createSale: (sale: SaleEntity) => Promise<any>
  editSale: (_id: string, sale: SaleEntity) => Promise<any>
  getSale: (objectId: string) => Promise<any>
  deleteSale: (_id: string) => Promise<any>
}
