import { SavePointType, StepType } from '../../types/users';

export interface usersApi {
  updateMissionStart(): Promise<StepType>;
  updateMissionCheck(): Promise<StepType>;
  updatePoint(isMission: boolean): Promise<SavePointType>;
  postMessage(phoneNumber: string): Promise<number>;
}
