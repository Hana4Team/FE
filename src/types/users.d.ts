export type StepType = {
  phoneNumber: string;
  step: number;
  stepStatus: number;
};
export type SavePointType = {
  step: number;
  points: number;
};
export type UserType = {
  name: string;
  phonNumber: string;
  step: number;
  stepStatus: null | number;
};
