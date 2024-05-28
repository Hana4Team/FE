import React, { FC } from 'react';
import { IoIosArrowRoundForward } from 'react-icons/io';

interface Iprops {
  title: string;
  balance: number;
  color1: string;
  color2: string;
  onClick?: () => void;
  isLimit?: boolean;
}

export const MoneyBoxItem: FC<Iprops> = ({
  title,
  balance,
  color1,
  color2,
  onClick,
  isLimit,
}) => {
  return (
    <div className='flex h-[10rem]'>
      <div
        className={`flex flex-col justify-between w-full bg-[#${color1}] p-6 font-hanaMedium ${isLimit ? 'rounded-2xl' : 'rounded-l-2xl'}`}
      >
        <div className='flex flex-row'>
          <p className='text-xl'>{title}</p>
          {isLimit && (
            <div
              className={`ml-4 flex w-16 flex-col text-sm text-center justify-center align-middle font-hanaBold text-white bg-[#${color2}] rounded-3xl`}
            >
              출금제한
            </div>
          )}
        </div>
        <p className='text-3xl font-hanaBold'>{balance.toLocaleString()} 원</p>
      </div>
      {!isLimit && (
        <div
          className={`flex flex-col justify-end items-end w-28 bg-[#${color2}] rounded-r-2xl p-5 font-hanaMedium cursor-pointer`}
          onClick={() => onClick!()}
        >
          <IoIosArrowRoundForward size={20} />
          금액이동
        </div>
      )}
    </div>
  );
};
