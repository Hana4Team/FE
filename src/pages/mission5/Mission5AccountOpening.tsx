import { useLocation, useNavigate } from 'react-router-dom';
import Topbar from '../../components/Topbar';
import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { AccountSaveMoneyAmount } from '../../components/organisms/accounts/AccountSaveMoneyAmount';
import { AccountMaturitChoice } from '../../components/organisms/accounts/AccountMaturitChoice';
import { AccountCheck } from '../../components/organisms/accounts/AccountCheck';
import { ConfirmCard } from '../../components/molecules/ConfirmCard';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { add, format } from 'date-fns';
type userInfo = {
  maturitDate: number;
  maturitDateUnit: string;
  initMoney: number;
  withdrawAccountNumber: string;
};

export const Mission5AccountOpening = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state.product;
  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const [btnActive, setBtnActive] = useState<boolean>(false);
  const [info, setInfo] = useState<userInfo>({
    maturitDate: -1,
    maturitDateUnit: '',
    initMoney: -1,
    withdrawAccountNumber: '',
  });

  const { data: savingMoney } = useQuery({
    queryKey: ['savingMoney'],
    queryFn: () => {
      const res = ApiClient.getInstance().getDepositSaving('SAVING');
      return res;
    },
  });

  const postOpenedDepositSaving = useMutation({
    mutationFn: () =>
      ApiClient.getInstance().postOpenedDepositSaving(
        {
          payment: info.initMoney,
          endDate:
            info.maturitDateUnit === '년'
              ? format(
                  add(new Date(), { years: info.maturitDate }),
                  'yyyy-MM-dd'
                )
              : format(
                  add(new Date(), { months: info.maturitDate }),
                  'yyyy-MM-dd'
                ),
          productsId: product.productsId,
          withdrawalAccountId: savingMoney?.accountId || 0,
        },
        info.initMoney
      ),
    onSuccess: (data) => {
      if (data.accountId) setCurrentNumber((prev) => prev + 1);
      else {
        alert('상품 가입에 실패하였습니다.');
        navigate('/mission');
      }
    },
    onError: () => {
      alert('상품 가입에 실패하였습니다.');
      navigate('/mission');
    },
  });

  const nextHandler = () => {
    if (currentNumber === 1) {
      setInfo({
        ...info,
        withdrawAccountNumber: savingMoney?.accountNumber || '',
      });
    }
    if (currentNumber === 3) {
      postOpenedDepositSaving.mutate();
    }
    if (currentNumber === 4) {
      navigate('/home');
      return;
    }
    setCurrentNumber((prev) => prev + 1);
    setBtnActive(true);
  };

  const checkinitMoneyAndMaturitDateModal = (
    maturitDate: number,
    maturitDateUnit: string,
    initMoney: number
  ) => {
    setInfo({
      ...info,
      maturitDate: maturitDate,
      maturitDateUnit: maturitDateUnit,
      initMoney: initMoney,
    });
    setBtnActive(true);
  };

  console.log('info>>', info);

  return (
    <div className='bg-white flex flex-col items-center h-screen w-full'>
      <Topbar title='예금가입' />
      <div className='flex flex-col justify-between items-center w-full h-full py-10'>
        <div className='flex flex-col px-10 w-full'>
          <h1 className='text-4xl font-hanaMedium mb-7 whitespace-pre-line leading-snug'>
            {currentNumber === 0 && '얼마를 저축할까요?'}
            {currentNumber === 1 && '정보를 확인해주세요'}
            {currentNumber === 2 && '만기 시 어떻게 할까요?'}
            {currentNumber === 5 && `이대로 가입하시겠어요?`}
          </h1>
          {currentNumber === 0 && (
            <AccountSaveMoneyAmount
              type={false}
              period={product.period}
              payment1={savingMoney?.balance || 0}
              payment2={savingMoney?.balance || 0}
              onClick={checkinitMoneyAndMaturitDateModal}
            />
          )}
          {currentNumber === 1 && (
            <div className='flex flex-col gap-5 justify-center pt-1 pb-2 border-b-[0.1rem] border-black mb-3'>
              <div className='flex gap-3 items-center'>
                <img src='/images/logo.svg' alt='logo' className='w-12 h-12' />
                <div className='flex flex-col gap-1 text-hanaGreen'>
                  <p className='font-hanaRegular text-lg'>
                    {savingMoney?.productName}
                  </p>
                  <p className='font-hanaMedium text-xl'>
                    {savingMoney?.accountNumber}
                  </p>
                </div>
              </div>
            </div>
          )}
          {currentNumber === 2 && <AccountMaturitChoice />}
          {currentNumber === 3 && (
            <AccountCheck
              money={info.initMoney}
              period={info.maturitDate + info.maturitDateUnit}
              interest={product.interest1}
              outdrawAccountNumber={info.withdrawAccountNumber}
            />
          )}
          {currentNumber === 4 && (
            <ConfirmCard text={`${product.name}\n가입 완료`} />
          )}
        </div>
        <Button
          text={currentNumber === 4 ? '완료' : '다음'}
          onClick={() => nextHandler()}
          isActive={btnActive}
        />
      </div>
    </div>
  );
};
