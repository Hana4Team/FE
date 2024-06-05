export type RemmitanceType = {
  amount: number;
  senderTitle: string;
  recipientTitle: string;
  senderAccount: string;
  recipientAccount: string;
};
export type RemmitanceMoneyBoxType = {
  amount: number;
  senderTitle: string;
  recipientTitle: string;
  senderMoneyBox: string;
  recipientMoneyBox: string;
};

export type TransactionHistoryType = {
  name: string;
  accountNumber: string;
  balance: number;
  transactionList: TransactionType[];
};
export type TransactionType = {
  isSender: boolean;
  title: string;
  amount: number;
  createdAt: Date;
};
