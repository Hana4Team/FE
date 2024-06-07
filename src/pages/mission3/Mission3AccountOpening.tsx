import { useLocation, useNavigate } from 'react-router-dom';
import Topbar from '../../components/Topbar';
import { useRef, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { ConfirmCard } from '../../components/molecules/ConfirmCard';
import { AccountOutputChoice } from '../../components/organisms/accounts/AccountOutputChoice';
import { AccountMaturitChoice } from '../../components/organisms/accounts/AccountMaturitChoice';
import { AccountCheck } from '../../components/organisms/accounts/AccountCheck';
import {
  checkAmountMoney,
  checkAmountUnitMoney,
} from '../../utils/checkAmountUnit';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { add, format } from 'date-fns';

type userInfo = {
  savingMoney: number;
  outdrawAccountId: number;
  outdrawAccountNumber: string;
};

export const Mission3AccountOpening = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state.product;
  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const [btnActive, setBtnActive] = useState<boolean>(true);
  const [info, setInfo] = useState<userInfo>({
    savingMoney: -1,
    outdrawAccountId: -1,
    outdrawAccountNumber: '',
  });

  const savingMoneyInput = useRef<HTMLInputElement | null>(null);

  const {
    data: moneyboxMoney,
    isSuccess: moneyboxMoneyIsSuccess,
    isError: moneyboxMoneyIsError,
  } = useQuery({
    queryKey: ['moneyboxMoney'],
    queryFn: () => {
      const res = ApiClient.getInstance().getMoneyboxSaving();
      return res;
    },
  });

  const postOpenedSaving100 = useMutation({
    mutationFn: () =>
      ApiClient.getInstance().postOpenedSaving100({
        payment: info.savingMoney,
        endDate: format(add(new Date(), { days: 99 }), 'yyyy-MM-dd'),
        productsId: product.productsId,
        withdrawalAccountId: info.outdrawAccountId,
      }),
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
    if (currentNumber === 0) {
      if (!moneyboxMoneyIsSuccess || moneyboxMoneyIsError) {
        alert('머니박스 계좌 조회를 실패하였습니다.');
        navigate('/mission');
        return;
      }
    }
    if (currentNumber === 4) {
      postOpenedSaving100.mutate();
      return;
    }
    if (currentNumber === 5) {
      navigate('/savings100Days');
      return;
    }
    setCurrentNumber((prev) => prev + 1);
    currentNumber === 1 || currentNumber === 0
      ? setBtnActive(false)
      : setBtnActive(true);
  };

  const checkEffectSavingMoney = () => {
    if (savingMoneyInput.current) {
      if (
        savingMoneyInput.current?.value === '' ||
        +savingMoneyInput.current.value < product.payment1 * 1000 ||
        +savingMoneyInput.current.value > product.payment2 * 1000
      ) {
        setInfo({
          ...info,
          savingMoney: 0,
        });
        return;
      }
      setInfo({
        ...info,
        savingMoney: +savingMoneyInput.current?.value,
      });
      setBtnActive(true);
    }
  };

  const checkOutdrawAccountModal = (account: string, accountId: number) => {
    setInfo({
      ...info,
      outdrawAccountNumber: account,
      outdrawAccountId: accountId,
    });
    setBtnActive(true);
  };

  return (
    <div className='bg-white flex flex-col items-center h-screen w-full'>
      <Topbar title='100일 적금 가입' />
      <div className='flex flex-col justify-between items-center w-full h-full py-10'>
        <div className='flex flex-col px-10 w-full'>
          <h1 className='text-4xl font-hanaMedium mb-7 whitespace-pre-line leading-snug'>
            {currentNumber === 0 &&
              `머니박스의 저축 공간에 있던 돈을\n 초기 자본으로 넣을게요`}
            {currentNumber === 1 && `얼마를 저축할까요?`}
            {currentNumber === 2 && '어느 계좌에서 출금할까요?'}
            {currentNumber === 3 && '만기 시 어떻게 할까요?'}
            {currentNumber === 4 && `이대로 가입하시겠어요?`}
          </h1>
          {currentNumber === 0 && (
            <div className='w-full flex items-center font-hanaMedium text-[1.7rem]'>
              <span className='mr-2 text-hanaDeepGreen font-hanaBold'>
                {moneyboxMoney?.savingBalance.toLocaleString('ko-KR')}
              </span>
              원 가입하기
            </div>
          )}
          {currentNumber === 1 && (
            <div>
              <p className='flex w-52 border-b-[0.05rem] border-black py-3 text-2xl font-hanaMedium'>
                <input
                  type='text'
                  pattern='\d*'
                  maxLength={9}
                  ref={savingMoneyInput}
                  placeholder={`${checkAmountMoney(product.payment1)}${checkAmountUnitMoney(product.payment1)} ~ ${checkAmountMoney(product?.payment2)}${checkAmountUnitMoney(product?.payment2)} `}
                  onBlur={checkEffectSavingMoney}
                  className='w-48 placeholder:text-[#979797] text-end pr-2'
                />
                {savingMoneyInput.current?.value && '원'}
              </p>
              {info.savingMoney === 0 && (
                <span className='font-hanaLight text-lg text-red-600 mt-2'>
                  범위의 금액을 입력해주세요
                </span>
              )}
            </div>
          )}
          {currentNumber === 2 && (
            <AccountOutputChoice onClick={checkOutdrawAccountModal} />
          )}
          {currentNumber === 3 && <AccountMaturitChoice />}
          {currentNumber === 4 && (
            <AccountCheck
              money={moneyboxMoney?.savingBalance || 0}
              period='100일'
              interest={product.interest1}
              automatic_payment_money={info.savingMoney}
              outdrawAccountNumber={info.outdrawAccountNumber}
            />
          )}
          {currentNumber === 5 && (
            <ConfirmCard text={`100일 적금\n 가입 완료`} />
          )}
        </div>
        <Button
          text={currentNumber === 5 ? '완료' : '다음'}
          onClick={() => nextHandler()}
          isActive={btnActive}
        />
      </div>
    </div>
  );
};
