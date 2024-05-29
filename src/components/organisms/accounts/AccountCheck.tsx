import { FC } from 'react';

interface IProps {
  money: number;
  period: string;
  interest: number;
  automatic_payment_date?: number;
  automatic_payment_money?: string;
  outdrawAccountNumber: string;
}

export const AccountCheck: FC<IProps> = ({
  money,
  period,
  interest,
  automatic_payment_date,
  automatic_payment_money,
  outdrawAccountNumber,
}) => {
  return (
    <div className='flex flex-col gap-10'>
      <div className='flex justify-between font-hanaRegular text-2xl'>
        가입금액
        <span className='font-hanaLight'>
          {money.toLocaleString('ko-KR')} 원
        </span>
      </div>
      <div className='flex justify-between font-hanaRegular text-2xl'>
        가입기간
        <span className='font-hanaLight'>{period} 일</span>
      </div>
      <div className='flex justify-between font-hanaRegular text-2xl'>
        현재적용금리
        <span className='font-hanaBold text-hanaGreen'>
          {interest.toFixed(2)} %
        </span>
      </div>
      {/* {automatic_payment && (
          <div>
            <span>자동이체</span>
            <span>{automatic_payment}</span>
          </div>
        )} */}
      <div className='flex justify-between font-hanaRegular text-2xl'>
        출금계좌
        <p className='font-hanaLight flex flex-col text-right gap-2'>
          <span>하나은행</span>
          <span>{outdrawAccountNumber}</span>
        </p>
      </div>
    </div>
  );
};
