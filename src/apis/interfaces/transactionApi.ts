import {
  RemmitanceMoneyBoxType,
  RemmitanceType,
  TransactionHistoryType,
} from '../../types/transaction';

export interface transactionApi {
  getTransactionHistory(
    accountId: number,
    year: number,
    month: number
  ): Promise<TransactionHistoryType>;
  postRemittance({
    amount,
    senderTitle,
    recipientTitle,
    senderAccount,
    recipientAccount,
  }: RemmitanceType): Promise<void>;
  postRemittanceMoneyBox({
    amount,
    senderTitle,
    recipientTitle,
    senderMoneyBox,
    recipientMoneyBox,
  }: RemmitanceMoneyBoxType): Promise<string>;
}
