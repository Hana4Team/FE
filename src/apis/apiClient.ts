import axios, { AxiosInstance } from 'axios';
import { getCookie } from '../utils/cookie';
import { usersApi } from './interfaces/usersApi';
import { accountApi } from './interfaces/accountApi';
import {
  AccountPwdCheckType,
  AccountReqType,
  AccountType,
  AccountDelType,
  OpenedDepositSavingReqType,
  OpendDepositSavingSuccessResType,
} from '../types/account';
import { SpendListType } from '../types/spend';
import { spendApi } from './interfaces/spendApi';
import { BudgetReqType, BudgetResType } from '../types/budget';
import { budgetApi } from './interfaces/budgetApi';
import { HomeType } from '../types/home';
import { depositsavingApi } from './interfaces/depositsavingApi';
import { alarmApi } from './interfaces/alarmApi';
import { API_BASE_URL } from './url';
import { newsApi } from './interfaces/newsApi';
import { NewsItemsType } from '../types/news';
import { productsApi } from './interfaces/productsApi';
import { ProductsType } from '../types/products';
import { depositsavingType } from '../types/depositsaving';
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
import { AlarmType } from '../types/alarm';
import { moneyBoxType } from '../types/moneyBox';
import { transactionApi } from './interfaces/transactionApi';
import {
  SpendType,
  RemmitanceMoneyBoxType,
  RemmitanceType,
  TransactionHistoryType,
} from '../types/transaction';
import { moneyboxApi } from './interfaces/moneyboxApi';

const TOKEN = getCookie('token');

export class ApiClient
  implements
    usersApi,
    accountApi,
    alarmApi,
    productsApi,
    moneyboxApi,
    transactionApi,
    depositsavingApi,
    newsApi,
    budgetApi,
    spendApi
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

  async getUser() {
    const response = await this.axiosInstance.request<UserType>({
      method: 'get',
      url: '/users',
    });
    return response.data;
  }

  async putCheckNews() {
    const response = await this.axiosInstance.request<{
      success: boolean;
      type?: string;
      message?: string;
    }>({
      method: 'put',
      url: '/users/news',
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
      },
    });
    return response.data;
  }

  async postOpenedSaving100(data: OpenedDepositSavingReqType) {
    const response =
      await this.axiosInstance.request<OpendDepositSavingSuccessResType>({
        method: 'post',
        url: '/account/saving100',
        data: data,
      });
    return response.data;
  }

  async postOpenedSaving(
    data: OpenedDepositSavingReqType,
    payment: number,
    payDate: number,
    initialAmount: number
  ) {
    const response =
      await this.axiosInstance.request<OpendDepositSavingSuccessResType>({
        method: 'post',
        url: '/account/saving',
        data: {
          ...data,
          payment,
          payDate,
          initialAmount,
        },
      });
    return response.data;
  }

  async postOpenedDeposit(
    data: OpenedDepositSavingReqType,
    initialAmount: number
  ) {
    const response =
      await this.axiosInstance.request<OpendDepositSavingSuccessResType>({
        method: 'post',
        url: '/account/deposit',
        data: {
          ...data,
          initialAmount,
        },
      });
    return response.data;
  }

  //---------products---------
  async getProdustsList(type: string) {
    const response = await this.axiosInstance.request<ProductsType[]>({
      method: 'get',
      url: `/products?type=${type}`,
    });
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

  async getProduct(productId: number) {
    const response = await this.axiosInstance.request<ProductsType>({
      method: 'get',
      url: `/products/${productId}`,
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

  //---------moneybox---------
  async getMoneyboxSaving() {
    const response = await this.axiosInstance.request<{
      savingBalance: number;
    }>({
      method: 'get',
      url: '/moneybox/saving',
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

  //---------news---------
  async getNews(query: string) {
    const response = await this.axiosInstance.request<{
      lastBuildDate: Date;
      total: number;
      start: number;
      display: number;
      items: NewsItemsType[];
    }>({
      method: 'get',
      url: `/news?query=${query}`,
    });
    return response.data;
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
