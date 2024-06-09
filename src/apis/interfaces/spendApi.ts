import { SpendListType } from '../../types/spend';

export interface spendApi {
  getSpendList(year: number, month: number): Promise<SpendListType>;
}
