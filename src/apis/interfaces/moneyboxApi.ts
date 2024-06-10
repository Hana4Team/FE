export interface moneyboxApi {
  getMoneyboxSaving(): Promise<{
    savingBalance: number;
  }>;
}
