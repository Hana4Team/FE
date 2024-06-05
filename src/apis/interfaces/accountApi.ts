import {
  AccountReqType,
  AccountType,
  AccountDetailType,
  OpendDepositSavingResType,
  OpenedDepositSavingReqType,
} from '../../types/account';

export interface accountApi {
  getAccountDetail(
    accountId: number,
    year: number,
    month: number
  ): Promise<AccountDetailType>;
  getAccount(type: AccountReqType): Promise<AccountType[]>;
  postOpendMoneyBox(
    password: string,
    productsId: number
  ): Promise<{
    accountId: number;
    moneyboxId: number;
  }>;
  postOpenedSaving100(
    data: OpenedDepositSavingReqType
  ): Promise<OpendDepositSavingResType>;
  postOpenedDepositSaving(
    data: OpenedDepositSavingReqType,
    initialAmount: number
  ): Promise<OpendDepositSavingResType>;
}
