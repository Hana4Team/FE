import React, { FC, ReactNode } from 'react';

interface IProps {
  title: ReactNode;
  placeholder: string;
}

export const InputForm: FC<IProps> = ({ title, placeholder }) => {
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='font-hanaBold text-4xl text-center'>{title}</div>
      <input
        className='font-hanaMedium text-2xl border-b-[1px] border-black my-12 p-2 w-5/6'
        placeholder={placeholder}
      />
    </div>
  );
};
