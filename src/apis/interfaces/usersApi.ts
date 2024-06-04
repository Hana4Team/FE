import { SavePointType } from '../../types/users';

export interface usersApi {
  updatePoint(isMission: boolean): Promise<SavePointType>;
  postMessage(phoneNumber: string): Promise<number>;
}
