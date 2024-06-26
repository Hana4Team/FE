import { FC } from 'react';

interface IProps {
  contents: string;
  createdAt: Date | string;
  isAlarm?: boolean;
}

export const Alarm: FC<IProps> = ({ contents, createdAt, isAlarm }) => {
  const createdDate = new Date(createdAt);

  return (
    <div className='w-11/12 h-24 border border-none rounded-3xl bg-white m-auto flex items-center justify-center drop-shadow-under'>
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
      {isAlarm ? (
        <div className='h-20 w-14 mr-5 mt-1 text-sm font-hanaRegular text-gray-500'>
          방금전
        </div>
      ) : (
        <div className='h-20 mr-5 mt-1 text-sm font-hanaRegular text-gray-500'>
          {`${createdDate.getFullYear()}.${(createdDate.getMonth() + 1).toString().padStart(2, '0')}.${createdDate.getDate().toString().padStart(2, '0')}`}
        </div>
      )}
    </div>
  );
};
