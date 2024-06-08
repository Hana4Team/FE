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
