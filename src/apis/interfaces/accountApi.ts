import { AccountReqType, AccountType, AccountDetailType } from '../../types/account';

export interface accountApi {
  getAccountDetail(
    accountId: number,
    year: number,
    month: number
  ): Promise<AccountDetailType>;
  getAccount(type: AccountReqType): Promise<AccountType[]>;
}
