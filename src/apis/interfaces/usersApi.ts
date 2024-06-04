import { StepType } from '../../types/users';

export interface usersApi {
  updateMissionStart(): Promise<StepType>;
  updateMissionCheck(): Promise<StepType>;
}
