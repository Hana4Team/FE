import { AlarmType } from '../../types/alarm';

export interface alarmApi {
  postAlarm(contents: string): Promise<string>;
  getAlarm(): Promise<AlarmType[]>;
}
