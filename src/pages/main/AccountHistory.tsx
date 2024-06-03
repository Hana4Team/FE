import React, { useMemo, useState } from 'react';
import Topbar from '../../components/Topbar';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { AccountHistoryItem } from '../../components/molecules/AccountHistoryItem';

export const AccountHistory = () => {
  const date = useMemo(() => {
    const today = new Date();
    return {
      dateYear: today.getFullYear(),
      dateMonth: today.getMonth() + 1,
    };
  }, []);

  const [year, setYear] = useState<number>(date.dateYear);
  const [month, setMonth] = useState<number>(date.dateMonth);

  const onClickArrow = (value: number) => {
    if (year === date.dateYear && month === date.dateMonth && value === 1)
      return;
    if (year === 2000 && month === 1 && value === -1) return;

    if (month + value == 0) {
      setMonth(12);
      setYear(year - 1);
    } else if (month + value == 13) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + value);
    }
  };

  return (
    <>
      <Topbar title='내 계좌' />
      <div className='flex flex-col p-10 justify-center items-center gap-10'>
        {/* 카드 영역 */}
        <div className='w-full h-72 flex flex-col p-8 bg-hanaGreen rounded-2xl text-white'>
          <p className='font-hanaMedium text-3xl mb-4'>하나 주거래 H20</p>
          <p className='font-hanaRegular text-2xl mb-6'>
            하나은행 111-111-111111
          </p>
          <p className='h-full flex flex-col justify-center font-hanaCM text-5xl'>
            600,000원
          </p>
        </div>
        {/* 히스토리 영역 */}
        <div className='w-full flex flex-col px-8 pt-8 pb-4 bg-white rounded-2xl'>
          <div className='flex flex-row mb-8'>
            <IoIosArrowBack
              size={20}
              className={`my-auto ${year === 2000 && month === 1 && 'text-gray-400'}`}
              onClick={() => onClickArrow(-1)}
            />
            <p className='font-hanaBold text-[2rem] leading-9 mx-5'>
              {year}년 {month}월
            </p>
            <IoIosArrowForward
              size={20}
              className={`my-auto ${year === date.dateYear && month === date.dateMonth && 'text-gray-400'}`}
              onClick={() => onClickArrow(1)}
            />
          </div>
          <AccountHistoryItem
            name='파킹'
            date='06. 02'
            time='09:20'
            balance={10000}
            type={2}
          />
          <AccountHistoryItem
            name='소비'
            date='06. 02'
            time='09:20'
            balance={10000}
            type={3}
          />
          <AccountHistoryItem
            name='파킹'
            date='06. 02'
            time='09:20'
            balance={10000}
            type={2}
          />
          <AccountHistoryItem
            name='소비'
            date='06. 02'
            time='09:20'
            balance={10000}
            type={3}
          />
        </div>
      </div>
    </>
  );
};
