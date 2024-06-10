import axios, { AxiosInstance } from 'axios';
import { getCookie } from '../utils/cookie';
import { usersApi } from './interfaces/usersApi';
import { accountApi } from './interfaces/accountApi';
import {
  UserType,
  SavePointType,
  StepType,
  JoinType,
  JoinReqType,
  LoginReqType,
  LoginType,
  MsgCheckType,
} from '../types/users';
import { AccountReqType, AccountType } from '../types/account';
import { alarmApi } from './interfaces/alarmApi';
import { API_BASE_URL } from './url';
import { AlarmType } from '../types/alarm';
import { moneyBoxApi } from './interfaces/moneyBoxApi';
import { moneyBoxType } from '../types/moneyBox';
import { transactionApi } from './interfaces/transactionApi';
import {
  RemmitanceMoneyBoxType,
  RemmitanceType,
  TransactionHistoryType,
} from '../types/transaction';

const TOKEN = getCookie('token');

export class ApiClient
  implements usersApi, accountApi, moneyBoxApi, transactionApi, alarmApi
{
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = this.createAxiosInstance();
  }

  //---------users---------
  async postLogin(user: LoginReqType) {
    const response = await this.axiosInstance.request<LoginType>({
      method: 'post',
      url: '/users/login',
      data: user,
    });
    return response.data;
  }

  async postJoin(user: JoinReqType) {
    const response = await this.axiosInstance.request<JoinType>({
      method: 'post',
      url: '/users/join',
      data: user,
    });
    return response.data;
  }

  async postMessage(phoneNumber: string) {
    const response = await this.axiosInstance.request<{ code: string }>({
      method: 'post',
      url: '/users/message',
      data: { phoneNumber },
    });
    return response.data;
  }

  async postMsgCheck(codeReq: MsgCheckType) {
    const response = await this.axiosInstance.request<{ check: string }>({
      method: 'post',
      url: '/users/msgCheck',
      data: codeReq,
    });
    return response.data;
  }

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
      data: { phoneNumber },
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

  async getHanaMoney() {
    const response = await this.axiosInstance.request<{ points: number }>({
      method: 'get',
      url: '/users/point',
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

  //---------transaction---------
  async getTransactionHistory(accountId: number, year: number, month: number) {
    const response = await this.axiosInstance.request<TransactionHistoryType>({
      method: 'get',
      url: `/transaction/${accountId}
      ?year=${year}&month=${month}`,
    });
    return response.data;
  }

  async postOpendMoneyBox(password: string, productsId: number) {
    const response = await this.axiosInstance.request<{
      accountId: number;
      moneyboxId: number;
    }>({
      method: 'post',
      url: '/account/moneybox',
      data: {
        password,
        productsId,
      }});
    return response.data;
  }

  async getMoneyBoxHistory(type: string, year: number, month: number) {
    const response = await this.axiosInstance.request<TransactionHistoryType>({
      method: 'get',
      url: `/transaction/moneybox?type=${type}
      &year=${year}&month=${month}`,
    });
    return response.data;
  }

  async postRemittance(TransactionSaveReq: RemmitanceType) {
    console.log(TransactionSaveReq);
    const response = await this.axiosInstance.request<{
      transactionId: number;
    }>({
      method: 'post',
      url: '/transaction',
      data: TransactionSaveReq,
    });
    return response.data;
  }

  async postRemittanceMoneyBox(
    TransactionMoneyboxSaveReq: RemmitanceMoneyBoxType
  ) {
    const response = await this.axiosInstance.request<{
      transactionId: number;
    }>({
      method: 'post',
      url: '/transaction/moneybox',
      data: TransactionMoneyboxSaveReq,
    });
    return response.data;
  }
  //---------moneyBox---------
  async getMoneyBox(): Promise<moneyBoxType> {
    const response = await this.axiosInstance.request<moneyBoxType>({
      method: 'get',
      url: '/moneybox',
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

  async getAlarm() {
    const response = await this.axiosInstance.request<AlarmType[]>({
      method: 'get',
      url: '/alarm',
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
