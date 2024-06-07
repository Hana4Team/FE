import { SavePointType, StepType, UserType } from '../../types/users';

export interface usersApi {
  updateMissionStart(): Promise<StepType>;
  updateMissionCheck(): Promise<StepType>;
  updatePoint(isMission: boolean): Promise<SavePointType>;
  postMessage(phoneNumber: string): Promise<{
    code: string;
  }>;
  getUser(): Promise<UserType>;
  postMsgCheck({
    code,
    inputCode,
  }: {
    code: string;
    inputCode: string;
  }): Promise<{ check: string }>;
}
