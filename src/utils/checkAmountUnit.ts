export function checkAmountUnitMoney(money: number): string {
  return money >= 10 ? '만원' : '천원';
}

export function checkAmountUnitNumber(money: number): number {
  return money >= 10 ? money * 10000 : money * 1000;
}
