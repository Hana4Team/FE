export type AccountDetailType = {
  name: string;
  accountNumber: string;
  balance: number;
  transactionList: TransactionType[];
};
export type TransactionType = {
  isSender: boolean;
  title: string;
  amount: number;
  createdAt: string;
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
