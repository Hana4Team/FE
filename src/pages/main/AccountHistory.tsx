import { useEffect, useState } from 'react';
import Topbar from '../../components/Topbar';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { AccountHistoryItem } from '../../components/molecules/AccountHistoryItem';
import { dateMonth, dateYear } from '../../utils/getDate';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { formatter2, toLocale } from '../../utils/dateTimeformat';
import { TransactionType } from '../../types/transaction';

export const AccountHistory = () => {
  const location = useLocation();

  const locationState = location.state as {
    accountId: number;
    type: string;
  };

  const [year, setYear] = useState<number>(dateYear);
  const [month, setMonth] = useState<number>(dateMonth);

  const {
    data: transactionData,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['transactions', year, month],
    queryFn: () => {
      if (locationState.accountId != null) {
        const res = ApiClient.getInstance().getTransactionHistory(
          locationState.accountId,
          year,
          month
        );
        return res;
      } else if (locationState.type != null) {
        const res = ApiClient.getInstance().getMoneyBoxHistory(
          locationState.type,
          year,
          month
        );
        return res;
      }
    },
    staleTime: 10,
  });

  const [initData, setInitData] = useState({
    name: transactionData?.name,
    accountNumber: transactionData?.accountNumber,
    balance: transactionData?.balance.toLocaleString(),
  });

  useEffect(() => {
    if (locationState.accountId != null) {
      try {
        ApiClient.getInstance()
          .getTransactionHistory(locationState.accountId, year, month)
          .then((res) => {
            setInitData({
              name: res.name,
              accountNumber: res.accountNumber,
              balance: res.balance.toLocaleString(),
            });
          });
      } catch (e) {
        console.log(e);
      }
    } else if (locationState.type != null) {
      try {
        ApiClient.getInstance()
          .getMoneyBoxHistory(locationState.type, year, month)
          .then((res) => {
            setInitData({
              name: res.name,
              accountNumber: res.accountNumber,
              balance: res.balance.toLocaleString(),
            });
          });
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  // useEffect(() => {
  //   isSuccess &&
  //     setInitData({
  //       name: transactionData?.name,
  //       accountNumber: transactionData?.accountNumber,
  //       balance: transactionData?.balance.toLocaleString(),
  //     });
  // }, [isSuccess]);

  const onClickArrow = (value: number) => {
    if (year === dateYear && month === dateMonth && value === 1) return;
    if (year === 2000 && month === 1 && value === -1) return;

    if (month + value == 0) {
      setMonth(12);
      setYear(year - 1);
    } else if (month + value == 13) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + value);
    }
  };

  return (
    <>
      <Topbar title='내 계좌' />
      <div className='flex flex-col p-10 justify-center items-center gap-10'>
        {/* 카드 영역 */}
        <div className='w-full h-72 flex flex-col p-8 bg-hanaGreen rounded-2xl text-white'>
          <p className='font-hanaMedium text-3xl mb-4'>{initData.name}</p>
          <p className='font-hanaRegular text-2xl mb-6'>
            하나은행 {initData.accountNumber}
          </p>
          <p className='h-full flex flex-col justify-center font-hanaCM text-4xl'>
            {initData.balance}원
          </p>
        </div>
        {/* 히스토리 영역 */}
        <div className='w-full flex flex-col px-8 pt-8 pb-4 bg-white rounded-2xl'>
          <div className='flex flex-row mb-8'>
            <IoIosArrowBack
              size={20}
              className={`my-auto ${year === 2000 && month === 1 && 'text-gray-400'}`}
              onClick={() => onClickArrow(-1)}
            />
            <p className='font-hanaCM text-3xl leading-9 mx-5'>
              {year}년 {month}월
            </p>
            <IoIosArrowForward
              size={20}
              className={`my-auto ${year === dateYear && month === dateMonth && 'text-gray-400'}`}
              onClick={() => onClickArrow(1)}
            />
          </div>
          {transactionData?.transactionList?.map(
            (trans: TransactionType, idx: number) => (
              <AccountHistoryItem
                key={idx}
                name={trans.title}
                date={formatter2(new Date(trans.dateTime!)).monthDate}
                time={formatter2(new Date(trans.dateTime!)).time}
                balance={trans.amount}
                type={trans.isSender}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};
