import { HomeType } from '../../types/home';

export interface homeApi {
  getHome(): Promise<HomeType>;
}
