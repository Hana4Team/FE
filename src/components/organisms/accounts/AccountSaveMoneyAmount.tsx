import { FC, FormEvent, useRef, useState } from 'react';
import { calMaturitDate } from '../../../utils/calMaturitDate';
import {
  checkAmountMoney,
  checkAmountUnitMoney,
} from '../../../utils/checkAmountUnit';

interface IProps {
  type: boolean; // 적금: true: 예금: false
  period: string;
  payment1: number;
  payment2: number;
  onClick: (
    maturitDate: number,
    maturitDateUnit: string,
    initMoney: number
  ) => void;
  onClickCheck: (status: boolean) => void;
}

export const AccountSaveMoneyAmount: FC<IProps> = ({
  type,
  period,
  payment1,
  payment2,
  onClick,
  onClickCheck,
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
    onClickCheck(false);
    if (maturitDate.current?.value === '') {
      setAlertMaturitMessage(true);
      setShowMaturitScope(false);
      return;
    }
    if (maturitDate.current?.value) {
      setShowMaturitScope(true);
      if (maturitDatePeriods.scope === '개월') {
        if (
          +maturitDate.current?.value < +maturitDatePeriods.periodList[0] ||
          +maturitDate.current?.value > +maturitDatePeriods.periodList[1]
        ) {
          setAlertMaturitMessage(true);
          return;
        }
      } else {
        if (
          !maturitDatePeriods.periodList.includes(maturitDate.current?.value)
        ) {
          setAlertMaturitMessage(true);
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
    onClickCheck(false);
    if (initMoney.current?.value) {
      if (
        type &&
        (+initMoney.current?.value < payment1 * 1000 ||
          +initMoney.current?.value > payment2 * 1000)
      ) {
        setAlertMoneyMessage(true);
        return;
      } else if (!type && +initMoney.current?.value < payment1 * 1000) {
        setAlertMoneyMessage(true);
        return;
      }
    }
    setAlertMoneyMessage(false);
    if (!alertMaturitMessage && initMoney.current?.value)
      saveData(+initMoney.current.value);
  };

  const saveData = (money: number) => {
    if (maturitDate.current) {
      onClick(
        +maturitDate.current?.value,
        maturitDatePeriods.scope === '개월' ? '개월' : '년',
        money
      );
      onClickCheck(true);
    }
  };

  return (
    <div className='text-2xl font-hanaMedium flex flex-col gap-4'>
      <div className='flex flex-col gap-1'>
        <p className='flex items-center'>
          <input
            type='text'
            pattern='\d*'
            maxLength={2}
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
            type='text'
            pattern='\d*'
            maxLength={10}
            ref={initMoney}
            placeholder={
              type
                ? `${checkAmountMoney(payment1)}${checkAmountUnitMoney(
                    payment1
                  )}~${checkAmountMoney(payment2)}${checkAmountUnitMoney(payment2)}`
                : `${checkAmountMoney(payment1)}${checkAmountUnitMoney(
                    payment1
                  )}`
            }
            onBlur={inputMoneyHandler}
            className={`border-b-[0.6px] border-black py-2 w-44 text-center placeholder-[#979797] bg-transparent mr-2 focus:outline-none`}
          />
          {initMoney.current?.value && '원 '}
          가입하기
        </p>
        {alertMoneyMessage && (
          <p className='text-red-600 font-hanaRegular text-lg'>
            {type
              ? `${checkAmountMoney(payment1)}${checkAmountUnitMoney(payment1)}부터${checkAmountMoney(payment2)}${checkAmountUnitMoney(payment2)}사이의 금액을 입력해주세요!`
              : `${checkAmountMoney(payment1)}${checkAmountUnitMoney(payment1)}이상의 금액을 입력해주세요!`}
          </p>
        )}
      </div>
    </div>
  );
};
