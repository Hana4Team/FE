import React, { FC } from 'react';

interface IProps {
  color: string;
  name: string;
  balance: number;
}

export const CategoryItem: FC<IProps> = ({ color, name, balance }) => {
  return (
    <div className='flex flex-row w-full py-3 justify-between items-center'>
      <div className='flex items-center gap-3'>
        <div className={`h-4 w-4 rounded-full bg-[${color}]`} />
        <p className='font-hanaMedium text-2xl'>{name}</p>
      </div>
      <p className='font-hanaCM text-2xl'>{balance.toLocaleString()}원</p>
    </div>
  );
};
