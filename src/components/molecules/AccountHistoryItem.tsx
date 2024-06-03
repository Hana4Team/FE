import React, { FC } from 'react';

interface Iprops {
  name: string;
  date: string;
  time: string;
  balance: number;
  type: number;
}

export const AccountHistoryItem: FC<Iprops> = ({
  name,
  date,
  time,
  balance,
  type,
}) => {
  return (
    <div className='flex my-5 w-full justify-between'>
      <div className='flex flex-row'>
        <p className='font-hanaBold text-2xl mr-6 tracking-tighter'>{date}</p>
        <div className='flex flex-col font-hanaMedium gap-2'>
          <p className='font-hanaMedium text-[1.7rem] leading-8'>{name}</p>
          <p className='text-2xl text-gray-400'>{time}</p>
        </div>
      </div>
      <div className='flex flex-col items-end gap-2'>
        <p
          className={`font-hanaBold text-3xl ${type === 2 ? 'text-hanaGreen' : 'text-hanaRed'}`}
        >
          {type === 2 ? '+' : '-'}
          {balance.toLocaleString()}원
        </p>
        <p className='font-hanaMedium text-2xl text-gray-400'>
          {type === 2 ? '입금' : '출금'}
        </p>
      </div>
    </div>
  );
};
