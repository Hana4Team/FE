import { BudgetReqType, BudgetResType } from '../../types/budget';

export interface budgetApi {
  getTotalBudget(): Promise<{ sum: number }>;
  updateTotalBudget(sum: number): Promise<{ isInitialUpdate: boolean }>;
  getCategoryBudget(): Promise<BudgetResType>;
  updateCategoryBudget(
    budget: BudgetReqType
  ): Promise<{ success: boolean; type: string; message: string }>;
}
