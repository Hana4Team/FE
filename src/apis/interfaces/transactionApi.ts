import {
  SpendType,
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
  getSaving100Check(): Promise<{
    successCount: number;
    failCount: number;
  }>;
  postSpend(
    spendReq: SpendType
  ): Promise<{ transactionId: number; spendId: number }>;
  getMoneyBoxHistory(
    type: string,
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
