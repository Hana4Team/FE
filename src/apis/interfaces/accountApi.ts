import {
  AccountReqType,
  AccountType,
  AccountDetailType,
  OpenedDepositSavingReqType,
  OpendDepositSavingSuccessResType,
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
  ): Promise<OpendDepositSavingSuccessResType>;
  postOpenedSaving(
    data: OpenedDepositSavingReqType,
    payment: number,
    payDate: number,
    initialAmount: number
  ): Promise<OpendDepositSavingSuccessResType>;
  postOpenedDeposit(
    data: OpenedDepositSavingReqType,
    initialAmount: number
  ): Promise<OpendDepositSavingSuccessResType>;
}
