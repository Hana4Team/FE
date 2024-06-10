import {
  AccountPwdCheckType,
  AccountReqType,
  AccountType,
  OpenedDepositSavingReqType,
  OpendDepositSavingSuccessResType,
} from '../../types/account';

export interface accountApi {
  getAccount(type: AccountReqType): Promise<AccountType[]>;
  postAccountPasswordCheck(
    reqData: AccountPwdCheckType
  ): Promise<{ message: string }>;
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
