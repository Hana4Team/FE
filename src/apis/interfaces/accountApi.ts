import {
  AccountPwdCheckType,
  AccountReqType,
  AccountType,
} from '../../types/account';

export interface accountApi {
  getAccount(type: AccountReqType): Promise<AccountType[]>;
  postAccountPasswordCheck(
    reqData: AccountPwdCheckType
  ): Promise<{ message: string }>;
}
