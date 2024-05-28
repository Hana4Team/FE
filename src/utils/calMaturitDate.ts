export type calMaturitDateProp = {
  minPeriod: string;
  periodList: string[];
  scope: string;
};

export function calMaturitDate(period: String): calMaturitDateProp {
  let periodList = period.includes(',')
    ? period.split(',')
    : period.includes('~')
      ? period.split('~')
      : [...period];

  periodList = periodList.map((period: string) =>
    period.replace(/[^0-9]/g, '')
  );

  const minPeriod = periodList[0];
  const scope = period.includes('~') ? '개월' : '년';
  return { minPeriod, periodList, scope };
}
