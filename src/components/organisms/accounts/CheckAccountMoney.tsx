import { FC } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

interface IProps {
  title: string;
  money: number;
  onClick?: () => void;
}

export const CheckAccountMoney: FC<IProps> = ({ title, money, onClick }) => {
  return (
    <div
      className='w-11/12 bg-white py-10 pl-10 pr-5 rounded-3xl m-auto flex justify-between items-center'
      onClick={onClick}
    >
      <div className='flex flex-col justify-center gap-3 font-hanaMedium text-xl'>
        <h2 className='font-hanaRegular text-3xl'>{title}</h2>
        <p className='flex items-center gap-2 font-hanaBold text-hanaRed text-3xl'>
          <img src='/icons/dollarbox.svg' alt='dollar' className='w-11' />
          {money.toLocaleString('ko-KR')}
          <span className='font-hanaMedium text-xl text-black mt-2'>원</span>
        </p>
        저금하는 과정을 도와드릴게요!
      </div>
      {onClick && <IoIosArrowForward size={30} className='cursor-pointer' />}
    </div>
  );
};
