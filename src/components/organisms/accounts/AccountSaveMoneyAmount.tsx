import { FC, FormEvent, useRef, useState } from 'react';
import { calMaturitDate } from '../../../utils/calMaturitDate';

interface IProps {
  period: string;
  payment1: number;
  payment2: number;
  onClick: (maturitDate: string, initMoney: number) => void;
}

export const AccountSaveMoneyAmount: FC<IProps> = ({
  period,
  payment1,
  payment2,
  onClick,
}) => {
  const maturitDatePeriods = calMaturitDate(period);
  const maturitDate = useRef<HTMLInputElement | null>(null);
  const initMoney = useRef<HTMLInputElement | null>(null);
  const [alertMaturitMessage, setAlertMaturitMessage] =
    useState<boolean>(false);
  const [alertMoneyMessage, setAlertMoneyMessage] = useState<boolean>(false);
  const [showMaturitScope, setShowMaturitScope] = useState<boolean>(false);

  const inputMaturitDateHandler = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (maturitDate.current?.value === '') {
      setAlertMaturitMessage(true);
      setShowMaturitScope(false);
      return;
    }
    if (maturitDate.current?.value) {
      setShowMaturitScope(true);
      if (maturitDatePeriods.scope === '개월') {
        console.log('>>');
        if (
          +maturitDate.current?.value < +maturitDatePeriods.periodList[0] ||
          +maturitDate.current?.value > +maturitDatePeriods.periodList[1]
        ) {
          setAlertMaturitMessage(true);
          maturitDate.current?.focus();
          return;
        }
      } else {
        if (
          !maturitDatePeriods.periodList.includes(maturitDate.current?.value)
        ) {
          setAlertMaturitMessage(true);
          maturitDate.current?.focus();
          return;
        }
      }
    }
    setAlertMaturitMessage(false);
    if (!alertMoneyMessage && initMoney.current?.value)
      saveData(+initMoney.current.value);
  };

  const inputMoneyHandler = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (initMoney.current?.value) {
      if (
        +initMoney.current?.value < payment1 * 1000 ||
        +initMoney.current?.value > payment2 * 1000
      ) {
        setAlertMoneyMessage(true);
        initMoney.current?.focus();
        return;
      }
    }
    setAlertMoneyMessage(false);
    if (!alertMaturitMessage && initMoney.current?.value)
      saveData(+initMoney.current.value);
  };

  const saveData = (money: number) => {
    onClick(
      `${maturitDate.current?.value}${
        maturitDatePeriods.scope === '개월' ? '개월' : '년'
      }`,
      money
    );
  };

  return (
    <div className='text-2xl font-hanaMedium flex flex-col gap-4'>
      <div className='flex flex-col gap-1'>
        <p className='flex items-center'>
          <input
            type='number'
            ref={maturitDate}
            placeholder={
              maturitDatePeriods.minPeriod + maturitDatePeriods.scope
            }
            onBlur={inputMaturitDateHandler}
            className='border-b-[0.6px] border-black py-2 w-20 text-center placeholder-[#979797] bg-transparent mr-2 focus:outline-none'
          />
          {showMaturitScope && maturitDatePeriods.scope} 만기로
        </p>
        {alertMaturitMessage && (
          <p className='text-red-600 font-hanaRegular text-lg'>
            {period} 중 해당하는 일자를 입력해주세요!
          </p>
        )}
      </div>
      <div className='flex flex-col gap-1'>
        <p className='flex items-center'>
          <input
            type='number'
            ref={initMoney}
            placeholder={`${payment1}${
              payment1 < 10 ? '천원' : '만원'
            }~${payment2}${payment2 < 10 ? '천원' : '만원'}`}
            onBlur={inputMoneyHandler}
            className='border-b-[0.6px] border-black py-2 w-44 text-center placeholder-[#979797] bg-transparent mr-2 focus:outline-none'
          />
          {initMoney.current?.value && '원 '}
          가입하기
        </p>
        {alertMoneyMessage && (
          <p className='text-red-600 font-hanaRegular text-lg'>
            {payment1}
            {payment1 < 10 ? '천원' : '만원'}부터 {payment2}
            {payment2 < 10 ? '천원' : '만원'}사이의 금액을 입력해주세요!
          </p>
        )}
      </div>
    </div>
  );
};
