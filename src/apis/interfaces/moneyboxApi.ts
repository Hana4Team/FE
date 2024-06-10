import { moneyBoxType } from '../../types/moneyBox';

export interface moneyboxApi {
  getMoneyBox(): Promise<moneyBoxType>;
  getMoneyboxSaving(): Promise<{
    savingBalance: number;
  }>;
}
