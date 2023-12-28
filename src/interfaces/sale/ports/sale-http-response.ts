import { type SaleEntity } from '../../../entities/sale/sale-entity'

export interface SaleHttpResponse {
  statusCode: number
  body: SaleEntity
}
