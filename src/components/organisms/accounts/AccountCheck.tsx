import { FC } from 'react';

interface IProps {
  money: number;
  period: string;
  interest: number;
  automatic_payment_date?: number;
  automatic_payment_?: string;
  outdrawAccountName: string;
  outdrawAccountNumber: string;
}

export const AccountCheck: FC<IProps> = ({
  money,
  period,
  interest,
  outdrawAccountName,
  outdrawAccountNumber,
}) => {
  return (
    <div className='flex flex-col p-10'>
      <h1 className='text-4xl font-hanaMedium mb-7'>이대로 가입하시겠어요?</h1>
      <div>
        <div>
          <span>가입금액</span>
          <span>{money}</span>
        </div>
        <div>
          <span>가입기간</span>
          <span>{period}</span>
        </div>
        <div>
          <span>현재적용금리</span>
          <span>{interest}</span>
        </div>
        {/* {automatic_payment && (
          <div>
            <span>자동이체</span>
            <span>{automatic_payment}</span>
          </div>
        )} */}
        <div>
          <span>출금계좌</span>
          <p>
            <span>{outdrawAccountName}</span>
            <span>{outdrawAccountNumber}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
