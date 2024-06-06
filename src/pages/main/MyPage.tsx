import { FaChevronRight } from 'react-icons/fa';
import { AccountSummaryItem } from '../../components/molecules/AccountSummaryItem';
import { removeCookie } from '../../utils/cookie';
import { AccountType } from '../../types/account';
import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { useNavigate } from 'react-router-dom';

export const MyPage = () => {
  const navigate = useNavigate();

  const logout = () => {
    removeCookie('token');
    navigate('/home');
  };

  const { data: accounts } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => {
      const res = ApiClient.getInstance().getAccount({
        depositWithdrawalAccount: true,
        depositAccount: true,
        saving100Account: true,
        savingsAccount: true,
        moneyboxAccount: true,
      });
      return res;
    },
  });

  const { data: hanaMoney } = useQuery({
    queryKey: ['hanaMoney'],
    queryFn: () => {
      const res = ApiClient.getInstance().getHanaMoney();
      return res;
    },
  });

  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => {
      const res = ApiClient.getInstance().getUser();
      return res;
    },
  });

  return (
    <>
      <div className='pt-20 w-11/12 flex items-center m-auto mb-12'>
        <img
          src='images/profile.svg'
          alt='profile'
          className='w-32 drop-shadow-under'
        />
        <div className='flex flex-col gap-2 ml-5'>
          <h1 className='font-hanaBold text-[2.7rem]'>{userInfo?.name}</h1>
          <p
            className='flex items-center text-xl font-hanaMedium cursor-pointer'
            onClick={() => logout()}
          >
            로그아웃
            <FaChevronRight size={10} className='ml-1.5' />
          </p>
        </div>
      </div>
      <div className='flex flex-col items-center gap-7'>
        {hanaMoney && (
          <AccountSummaryItem
            title='하나머니'
            totalMoney={hanaMoney.points}
            icons='icons/piggybank.svg'
          />
        )}
        {accounts &&
          accounts.map((item: AccountType) => (
            <AccountSummaryItem
              key={item.accountId}
              title={item.name}
              totalMoney={item.balance}
              icons={
                item.name == '머니박스'
                  ? 'icons/moneybox_icon.svg'
                  : 'icons/bankbook.svg'
              }
            />
          ))}
      </div>
    </>
  );
};
