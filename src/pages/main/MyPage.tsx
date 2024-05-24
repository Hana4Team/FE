import { FaChevronRight } from 'react-icons/fa';
import { AccountSummaryItem } from '../../components/molecules/AccountSummaryItem';
import { removeCookie, setCookie } from '../../utils/cookie';

export const MyPage = () => {
  return (
    <>
      <div className='pt-20 w-11/12 flex items-center m-auto mb-12'>
        <img
          src='images/별돌이1.png'
          alt='profile'
          className='w-32 drop-shadow-xl'
        />
        <div className='flex flex-col gap-2 ml-5'>
          <h1 className='font-hanaBold text-[2.7rem]'>별길돌</h1>
          <p
            className='flex items-center text-xl font-hanaMedium cursor-pointer'
            onClick={() => removeCookie('token')}
          >
            로그아웃
            <FaChevronRight size={10} className='ml-1.5' />
          </p>
        </div>
      </div>
      <div className='flex flex-col items-center gap-7'>
        <AccountSummaryItem
          title='하나머니'
          totalMoney={100000000}
          icons='icons/piggybank.svg'
        />
        <AccountSummaryItem
          title='머니박스'
          totalMoney={100000000}
          icons='icons/moneybox_icon.svg'
        />
        <AccountSummaryItem
          title='100일 적금'
          totalMoney={100000000}
          icons='icons/bankbook.svg'
        />
        <AccountSummaryItem
          title='청년 도약 계좌'
          totalMoney={100000000}
          icons='icons/bankbook.svg'
        />
      </div>
    </>
  );
};
