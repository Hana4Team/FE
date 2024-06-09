import { AccountDelType, AccountPwdCheckType } from '../../types/account';

export interface accountApi {
  postAccountPasswordCheck(
    reqData: AccountPwdCheckType
  ): Promise<{ message: string }>;
  deleteAccount(reqData: AccountDelType): Promise<{ message: string }>;
}
