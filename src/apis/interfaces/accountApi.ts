import { AccountReqType, AccountType } from '../../types/account';

export interface accountApi {
  getAccount(type: AccountReqType): Promise<AccountType[]>;
}
