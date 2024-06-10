import { ConfirmCard } from './../components/molecules/ConfirmCard';
export type StepType = {
  phoneNumber: string;
  step: number;
  stepStatus: number;
};
export type SavePointType = {
  step: number;
  points: number;
};
export type UserType = {
  name: string;
  phonNumber: string;
  step: number;
  stepStatus: number;
};
export type LoginType = {
  success?: boolean;
  name?: string;
  phoneNumber?: string;
  step?: number;
  stepStatus?: null | number;
  token?: string;
  type?: string;
  message?: string;
};
export type LoginReqType = {
  phoneNumber: string;
  password: string;
};
export type JoinReqType = {
  name: string;
  birthDate: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};
export type JoinType = {
  success: boolean;
  usersId: number;
  phoneNumber: string;
};
export type MsgCheckType = {
  code: string;
  input: string;
};
