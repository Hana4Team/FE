import { FC } from 'react';
import { AlarmType } from '../../types/alarm';

export const Alarm: FC<AlarmType> = ({ contents, createdAt }) => {
  return (
    <div className='w-11/12 h-24 border border-none rounded-3xl bg-white m-auto flex justify-center drop-shadow-under'>
      <div className='w-28 h-20 my-auto'>
        <img
          src='images/별돌이logo.svg'
          alt='alert_logo'
          className='w-full h-full object-contain'
        />
      </div>
      <div className='w-10/12 h-full flex flex-col justify-center'>
        <p className='text-2xl font-hanaRegular'>똑똑하나</p>
        <p className='text-xl font-hanaRegular'>{contents}</p>
      </div>
      <div>
        {`${createdAt.getFullYear()} -
          ${createdAt.getMonth() + 1} -
          ${createdAt.getDay()}`}
      </div>
    </div>
  );
};
