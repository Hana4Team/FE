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
