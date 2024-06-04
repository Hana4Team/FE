import { UserType } from '../../types/user';

export interface userApi {
  getUser(): Promise<UserType>;
  postMsgCheck({
    code,
    inputCode,
  }: {
    code: number;
    inputCode: number;
  }): Promise<string>;
}
