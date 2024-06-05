import axios, { AxiosInstance } from 'axios';
import { getCookie } from '../utils/cookie';
import { usersApi } from './interfaces/usersApi';
import { accountApi } from './interfaces/accountApi';
import { UserType, SavePointType, StepType } from '../types/users';
import {
  AccountReqType,
  AccountType,
  AccountDetailType,
  OpendDepositSavingResType,
  OpenedDepositSavingReqType,
} from '../types/account';
import { alarmApi } from './interfaces/alarmApi';
import { API_BASE_URL } from './url';
import { productsApi } from './interfaces/productsApi';
import { ProductsType } from '../types/products';

const TOKEN = getCookie('token');

export class ApiClient implements usersApi, accountApi, alarmApi, productsApi {
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

  async getHanaMoney() {
    const response = await this.axiosInstance.request<number>({
      method: 'get',
      url: '/users/point',
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

  async getAccountDetail(accountId: number, year: number, month: number) {
    const response = await this.axiosInstance.request<AccountDetailType>({
      method: 'get',
      url: `/account/${accountId}
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
      },
    });
    return response.data;
  }

  async postOpenedSaving100(data: OpenedDepositSavingReqType) {
    const response =
      await this.axiosInstance.request<OpendDepositSavingResType>({
        method: 'post',
        url: '/account/saving100',
        data: data,
      });
    return response.data;
  }

  async postOpenedDepositSaving(
    data: OpenedDepositSavingReqType,
    initialAmount: number
  ) {
    const response =
      await this.axiosInstance.request<OpendDepositSavingResType>({
        method: 'post',
        url: '/account/depositsaving',
        data: {
          data,
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

  async getProduct(productId: number) {
    const response = await this.axiosInstance.request<ProductsType>({
      method: 'get',
      url: `/products/${productId}`,
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
