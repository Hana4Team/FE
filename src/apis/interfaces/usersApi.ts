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
  postMessage(phoneNumber: string): Promise<{ code: string }>;
  postMsgCheck(codeReq: MsgCheckType): Promise<{ check: string }>;
  updateMissionStart(): Promise<StepType>;
  updateMissionCheck(): Promise<StepType>;
  updatePoint(isMission: boolean): Promise<SavePointType>;
  getUser(): Promise<UserType>;
  getHanaMoney(): Promise<{ points: number }>;
}
