import { FaChevronRight } from 'react-icons/fa';
import { AccountSummaryItem } from '../../components/molecules/AccountSummaryItem';
import { getCookie, removeCookie } from '../../utils/cookie';
import { AccountType } from '../../types/account';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const MyPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const name = getCookie('name');

  const logout = () => {
    removeCookie('token');
    removeCookie('name');
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

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['accounts'] });
  }, []);

  return (
    <>
      <div className='pt-20 w-11/12 flex items-center m-auto mb-12'>
        <img
          src='images/profile.svg'
          alt='profile'
          className='w-32 drop-shadow-under'
        />
        <div className='flex flex-col gap-2 ml-5'>
          <h1 className='font-hanaBold text-[2.7rem]'>{name}</h1>
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
            link={''}
          />
        )}
        {accounts &&
          accounts.map((item: AccountType) => (
            <AccountSummaryItem
              key={item.accountId}
              title={item.name}
              totalMoney={item.balance}
              icons={
                item.name == '머니박스 통장'
                  ? 'icons/moneybox_icon.svg'
                  : 'icons/bankbook.svg'
              }
              link={
                item.type === 'moneybox'
                  ? '/moneyBox'
                  : item.type === 'saving100'
                    ? '/saving100'
                    : item.type === 'saving'
                      ? '/roadmap4'
                      : item.type === 'deposit'
                        ? '/roadmap5'
                        : ''
              }
            />
          ))}
      </div>
    </>
  );
};
