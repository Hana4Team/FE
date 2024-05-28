import { FaChevronRight } from 'react-icons/fa';
import { AccountSummaryItem } from '../../components/molecules/AccountSummaryItem';
import { removeCookie } from '../../utils/cookie';

type itemType = {
  title: string;
  money: number;
};
const items = [
  {
    title: '하나머니',
    money: 100000000,
  },
  {
    title: '머니박스',
    money: 100000000,
  },
  {
    title: '100일 적금',
    money: 100000000,
  },
  {
    title: '청년 도약 계좌',
    money: 100000000,
  },
];

export const MyPage = () => {
  return (
    <>
      <div className='pt-20 w-11/12 flex items-center m-auto mb-12'>
        <img
          src='images/별돌이1.png'
          alt='profile'
          className='w-32 drop-shadow-under'
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
        {items.map((item) => (
          <AccountSummaryItem
            title={item.title}
            totalMoney={item.money}
            icons={
              item.title == '하나머니'
                ? 'icons/piggybank.svg'
                : item.title == '머니박스'
                  ? 'icons/moneybox_icon.svg'
                  : 'icons/bankbook.svg'
            }
          />
        ))}
      </div>
    </>
  );
};
