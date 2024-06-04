import { AccountDetailType } from '../../types/account';

export interface accountApi {
  getAccountDetail(
    accountId: number,
    year: number,
    month: number
  ): Promise<AccountDetailType>;
}
