export type TransactionType = {
  isSender: boolean;
  title: string;
  amount: number;
  createdAt: Date;
};
export type AccountType = {
  accountId: number;
  name: string;
  balance: number;
  accountNumber: string;
};
export type AccountReqType = {
  depositWithdrawalAccount: boolean;
  depositAccount: boolean;
  saving100Account: boolean;
  savingsAccount: boolean;
  moneyboxAccount: boolean;
};
export type AccountPwdCheckType = {
  accountNumber: string;
  password: string;
};
export type AccountDelType = {
  deleteAccountId: number;
  depositAccountId: number;
};
export type OpenedDepositSavingReqType = {
  payment: number;
  endDate: string;
  productsId: number;
  withdrawalAccountId: number;
};
export type OpendDepositSavingSuccessResType = {
  depositSavingId: number;
  accountId: number;
};
