import { SpendType, TransactionHistoryType } from '../../types/transaction';

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
}
