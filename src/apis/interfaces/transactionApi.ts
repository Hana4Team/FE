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
  postRemittance(TransactionSaveReq: RemmitanceType): Promise<{
    transactionId: number;
  }>;
  postRemittanceMoneyBox(
    TransactionMoneyboxSaveReq: RemmitanceMoneyBoxType
  ): Promise<{ transactionId: number }>;
}
