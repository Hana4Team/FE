export interface alarmApi {
  postAlarm(contents: string): Promise<string>;
}
