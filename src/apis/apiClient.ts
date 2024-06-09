import axios, { AxiosInstance } from 'axios';
import { getCookie } from '../utils/cookie';
import { usersApi } from './interfaces/usersApi';
import { accountApi } from './interfaces/accountApi';
import { UserType, SavePointType, StepType } from '../types/users';
import {
  AccountReqType,
  AccountType,
  AccountDetailType,
} from '../types/account';
import { alarmApi } from './interfaces/alarmApi';
import { API_BASE_URL } from './url';
import { SpendListType } from '../types/spend';
import { spendApi } from './interfaces/spendApi';
import { BudgetReqType, BudgetResType } from '../types/budget';
import { budgetApi } from './interfaces/budgetApi';
const TOKEN = getCookie('token');

export class ApiClient
  implements usersApi, accountApi, spendApi, budgetApi, alarmApi
{
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = this.createAxiosInstance();
  }

  //---------users---------
  async updateMissionStart() {
    const response = await this.axiosInstance.request<StepType>({
      method: 'put',
      url: `/users/start`,
    });
    return response.data;
  }

  async updateMissionCheck() {
    const response = await this.axiosInstance.request<StepType>({
      method: 'put',
      url: `/users/check`,
    });
    return response.data;
  }

  async updatePoint(isMission: boolean) {
    const response = await this.axiosInstance.request<SavePointType>({
      method: 'put',
      url: `/users/point`,
      data: { isMission },
    });
    return response.data;
  }

  async postMessage(phoneNumber: string) {
    const response = await this.axiosInstance.request<number>({
      method: 'post',
      url: '/users/message',
      data: phoneNumber,
    });
    return response.data;
  }

  async postMsgCheck({ code, inputCode }: { code: number; inputCode: number }) {
    const response = await this.axiosInstance.request<string>({
      method: 'post',
      url: '/users/msgCheck',
      data: { code: code, input: inputCode },
    });
    return response.data;
  }

  async getUser() {
    const response = await this.axiosInstance.request<UserType>({
      method: 'get',
      url: '/users',
    });
    return response.data;
  }

  //---------account---------
  async getAccount(type: AccountReqType) {
    const response = await this.axiosInstance.request<AccountType[]>({
      method: 'get',
      url: '/account',
      data: type,
    });
    return response.data;
  }

  //---------spend---------
  async getSpendList(year: number, month: number) {
    const response = await this.axiosInstance.request<SpendListType>({
      method: 'get',
      url: `/spend?year=${year}&month=${month}`,
    });
    return response.data;
  }

  //---------budget---------
  async getTotalBudget() {
    const response = await this.axiosInstance.request<{ sum: number }>({
      method: 'get',
      url: '/budget',
    });
    return response.data;
  }

  async updateTotalBudget(sum: number) {
    const response = await this.axiosInstance.request<{
      isInitialUpdate: boolean;
    }>({
      method: 'put',
      url: '/budget',
      data: { sum },
    });
    return response.data;
  }

  async getCategoryBudget() {
    const response = await this.axiosInstance.request<BudgetResType>({
      method: 'get',
      url: '/budget/category',
    });
    return response.data;
  }

  async updateCategoryBudget(budget: BudgetReqType) {
    const response = await this.axiosInstance.request<{
      success: boolean;
      type: string;
      message: string;
    }>({
      method: 'put',
      url: '/budget/category',
      data: budget,
    });
    return response.data;
  }

  //---------alarm---------
  async postAlarm(contents: string) {
    const response = await this.axiosInstance.request<string>({
      method: 'post',
      url: '/alarm',
      data: { contents },
    });
    return response.data;
  }

  static getInstance(): ApiClient {
    return this.instance || (this.instance = new this());
  }

  // registerToken(newToken: string) {
  //   this.axiosInstance = this.createAxiosInstance(newToken);
  // }

  logout() {
    this.axiosInstance = this.createAxiosInstance();
  }

  private createAxiosInstance = () => {
    const headers: any = {
      'content-type': 'application/json',
    };

    const newInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 100000,
      headers,
    });

    newInstance.interceptors.request.use(
      (config) => {
        if (TOKEN) {
          config.headers['Authorization'] = `Bearer ${TOKEN}`;
        }

        config.headers['Content-Type'] = 'application/json';

        return config;
      },
      (error) => {
        console.log(error);
        return Promise.reject(error);
      }
    );

    return newInstance;
  };
}
