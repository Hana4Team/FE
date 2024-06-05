import { SavePointType, StepType, UserType } from '../../types/users';

export interface usersApi {
  updateMissionStart(): Promise<StepType>;
  updateMissionCheck(): Promise<StepType>;
  updatePoint(isMission: boolean): Promise<SavePointType>;
  postMessage(phoneNumber: string): Promise<number>;
  getUser(): Promise<UserType>;
  postMsgCheck({
    code,
    inputCode,
  }: {
    code: number;
    inputCode: number;
  }): Promise<string>;
  getHanaMoney(): Promise<number>;
}
