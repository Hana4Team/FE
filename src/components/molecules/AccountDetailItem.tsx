import { FC } from 'react';

interface Iprops {
  title: string;
  account: string;
  balance: number;
  onClick: (
    clikedAccount: string,
    clickedName?: string | undefined,
    clickedBalance?: number | undefined
  ) => void;
  isThreeData?: boolean;
}

export const AccountDetailItem: FC<Iprops> = ({
  title,
  account,
  balance,
  isThreeData,
  onClick,
}) => {
  return (
    <div
      className='flex flex-col px-5 cursor-pointer'
      onClick={() => {
        !isThreeData ? onClick(account) : onClick(account, title, balance);
      }}
    >
      <div className='flex flex-row h-28 justify-between'>
        <div className='flex flex-row justify-center items-center'>
          <img src='/images/logo.svg' alt='logo' className='w-10 h-10 mr-4' />
          <div className='flex flex-col font-hanaLight text-2xl'>
            <p>{title}</p>
            <p className='text-gray-500 tracking-tight'>{account}</p>
          </div>
        </div>
        <div className='flex flex-col justify-end iems-end'>
          <p className='font-hanaMedium text-2xl'>
            {balance.toLocaleString()}원
          </p>
        </div>
      </div>
      <div className='bg-gray-200 h-[0.1rem] mt-1'></div>
    </div>
  );
};
