import { FC } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

interface Iprops {
  onClick: () => void;
  account?: string;
  isDeposit?: boolean;
}

export const SelectAccount: FC<Iprops> = ({ onClick, account, isDeposit }) => {
  return (
    <div
      className='flex flex-col w-full cursor-pointer'
      onClick={() => onClick()}
    >
      <div className='flex m-full justify-between flex-row'>
        <div className='flex flex-row gap-4'>
          <img src='images/logo.svg' alt='logo' className='w-12 h-12' />
          <p
            className={`flex my-auto font-hanaLight text-xl pt-2 ${account == null ? 'text-gray-400' : ''}`}
          >
            {account == ''
              ? `${isDeposit ? '입금' : '출금'}할 계좌를 선택해주세요.`
              : account}
          </p>
        </div>
        <div className='flex justify-center items-center pt-2'>
          <IoIosArrowDown color='545454' size={15} />
        </div>
      </div>
      <div className='bg-gray-300 h-[0.15rem] mt-1'></div>
    </div>
  );
};
