import React, { FC } from 'react';

interface IProps {
  message: string;
}

export const Alarm: FC<IProps> = ({ message }) => {
  return (
    <div className='w-[35rem] h-24 border border-none rounded-3xl bg-white m-auto flex justify-center drop-shadow-xl'>
      <div className='w-28 h-20 my-auto'>
        <img
          src='images/logo.png'
          alt='alert_logo'
          className='w-full h-full object-contain'
        />
      </div>
      <div className='w-10/12 h-full flex flex-col justify-center'>
        <p className='text-2xl font-hanaRegular'>똑똑하나</p>
        <p className='text-xl font-hanaRegular'>{message}</p>
      </div>
    </div>
  );
};
