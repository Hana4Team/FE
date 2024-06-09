import { accountApi } from './interfaces/accountApi';
import axios, { AxiosInstance } from 'axios';
import { getCookie } from '../utils/cookie';
import { usersApi } from './interfaces/usersApi';
import { UserType, SavePointType, StepType } from '../types/users';
import {
  AccountReqType,
  AccountType,
  AccountDetailType,
  AccountPwdCheckType,
  AccountDelType,
} from '../types/account';
import { alarmApi } from './interfaces/alarmApi';
import { API_BASE_URL } from './url';
import { depositsavingType } from '../types/depositsaving';
import { HomeType } from '../types/home';
import { depositsavingApi } from './interfaces/depositsavingApi';
import { transactionApi } from './interfaces/transactionApi';
import { SpendType, TransactionHistoryType } from '../types/transaction';

const TOKEN = getCookie('token');

export class ApiClient
  implements usersApi, alarmApi, depositsavingApi, accountApi, transactionApi
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
      data: isMission,
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
      url: `/account?depositWithdrawalAccount=${type.depositWithdrawalAccount}
      &depositAccount=${type.depositAccount}&
      &saving100Account=${type.saving100Account}&
      &savingAccount=${type.savingsAccount}&
      &moneyboxAccount=${type.moneyboxAccount}`,
    });
    return response.data;
  }

  async postAccountPasswordCheck(reqData: AccountPwdCheckType) {
    const response = await this.axiosInstance.request<{ message: string }>({
      method: 'post',
      url: '/account/password',
      data: reqData,
    });
    return response.data;
  }

  async deleteAccount(reqData: AccountDelType) {
    const response = await this.axiosInstance.request<{ message: string }>({
      method: 'delete',
      url: '/account',
      data: reqData,
    });
    return response.data;
  }

  //---------transaction---------
  async getTransactionHistory(accountId: number, year: number, month: number) {
    const response = await this.axiosInstance.request<TransactionHistoryType>({
      method: 'get',
      url: `/transaction/${accountId}
      ?year=${year}&month=${month}`,
    });
    return response.data;
  }

  async getSaving100Check() {
    const response = await this.axiosInstance.request<{
      successCount: number;
      failCount: number;
    }>({
      method: 'get',
      url: `/transaction/saving100Check`,
    });
    return response.data;
  }

  async postSpend(spendReq: SpendType) {
    const response = await this.axiosInstance.request<{
      transactionId: number;
      spendId: number;
    }>({
      method: 'post',
      url: '/transaction/spend',
      data: spendReq,
    });
    return response.data;
  }

  //---------alarm---------
  async postAlarm(contents: string) {
    const response = await this.axiosInstance.request<string>({
      method: 'post',
      url: '/alarm',
      data: contents,
    });
    return response.data;
  }

  //---------depositsaving---------
  async getDepositSaving(type: string) {
    const response = await this.axiosInstance.request<depositsavingType>({
      method: 'get',
      url: `/depositsaving?type=${type}`,
    });
    return response.data;
  }

  //---------home---------
  async getHome() {
    const response = await this.axiosInstance.request<HomeType>({
      method: 'get',
      url: '/home',
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
