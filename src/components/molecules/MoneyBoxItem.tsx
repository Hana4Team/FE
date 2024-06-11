import React, { FC, useState } from 'react';
import { GoQuestion } from 'react-icons/go';
import { IoIosArrowRoundForward } from 'react-icons/io';

interface Iprops {
  title: string;
  balance?: number;
  color1: string;
  color2: string;
  onClick: (name: string) => void;
  onClick2: () => void;
  onClickQuestion?: () => void;
  isLimit?: boolean;
}

export const MoneyBoxItem: FC<Iprops> = ({
  title,
  balance,
  color1,
  color2,
  onClick,
  onClick2,
  isLimit,
}) => {
  return (
    <div className='flex h-[10rem]'>
      <div
        className={`flex flex-col justify-between w-full bg-[#${color1}] p-6 font-hanaMedium rounded-l-2xl`}
        onClick={() => onClick2()}
      >
        <div className='flex flex-row gap-4'>
          <p className='text-xl'>{title}</p>
          {isLimit && (
            <>
              <div
                className={`flex flex-col w-16 text-sm text-center justify-center align-middle font-hanaBold text-white bg-[#${color2}] rounded-3xl`}
              >
                출금제한
              </div>
            </>
          )}
        </div>
        <p className='text-3xl font-hanaBold'>{balance?.toLocaleString()} 원</p>
      </div>
      <div
        className={`flex flex-col justify-end items-end w-28 bg-[#${color2}] rounded-r-2xl p-5 font-hanaMedium cursor-pointer`}
        onClick={() => onClick(title)}
      >
        <IoIosArrowRoundForward size={20} />
        금액이동
      </div>
    </div>
  );
};
