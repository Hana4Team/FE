export type AccountType = {
  accountId: number;
  name: string;
  balance: number;
  accountNumber: string;
};

export type AccountReqType = {
  depositWithdrawalAccount: boolean;
  depositAccount: boolean;
  savingsAccount: boolean;
  moneyboxAccount: boolean;
};
