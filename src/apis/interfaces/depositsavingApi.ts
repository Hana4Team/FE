import { depositsavingType } from '../../types/depositsaving';

export interface depositsavingApi {
  getDepositSaving(type: string): Promise<depositsavingType>;
}
