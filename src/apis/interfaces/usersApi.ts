import {
  JoinReqType,
  JoinType,
  LoginReqType,
  LoginType,
  MsgCheckType,
  SavePointType,
  StepType,
  UserType,
} from '../../types/users';

export interface usersApi {
  postLogin(user: LoginReqType): Promise<LoginType>;
  postJoin(user: JoinReqType): Promise<JoinType>;
  postMessage(phoneNumber: string): Promise<number>;
  postMsgCheck(codeReq: MsgCheckType): Promise<string>;
  updateMissionStart(): Promise<StepType>;
  updateMissionCheck(): Promise<StepType>;
  updatePoint(isMission: boolean): Promise<SavePointType>;
  getUser(): Promise<UserType>;
}
