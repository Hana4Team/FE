import { moneyBoxType } from '../../types/moneyBox';

export interface moneyBoxApi {
  getMoneyBox(): Promise<moneyBoxType>;
}
