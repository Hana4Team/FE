import { ErrorResponse, useLocation, useNavigate } from 'react-router-dom';
import Topbar from '../../components/Topbar';
import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { AccountSaveMoneyAmount } from '../../components/organisms/accounts/AccountSaveMoneyAmount';
import { AccountMaturitChoice } from '../../components/organisms/accounts/AccountMaturitChoice';
import { AccountCheck } from '../../components/organisms/accounts/AccountCheck';
import { ConfirmCard } from '../../components/molecules/ConfirmCard';
import { useMutation } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { add, format } from 'date-fns';
import { AccountOutputChoice } from '../../components/organisms/accounts/AccountOutputChoice';
import { calMaturitDate } from '../../utils/calMaturitDate';

type userInfo = {
  maturitDate: number;
  maturitDateUnit: string;
  initMoney: number;
  withdrawAccountNumber: string;
  withdrawAccountId: number;
};

export const Mission5AccountOpening = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state.product;
  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const [btnActive, setBtnActive] = useState<boolean>(false);
  const [checkInitMoneyAndMaturitDate, setcheckInitMoneyAndMaturitDate] =
    useState<boolean>(false);
  const [info, setInfo] = useState<userInfo>({
    maturitDate: -1,
    maturitDateUnit: '',
    initMoney: -1,
    withdrawAccountNumber: '',
    withdrawAccountId: -1,
  });

  const postOpenedDepositSaving = useMutation({
    mutationFn: () =>
      ApiClient.getInstance().postOpenedDeposit(
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
          withdrawalAccountId: info.withdrawAccountId,
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
    if (currentNumber === 0) {
      if (
        !checkInitMoneyAndMaturitDate ||
        !checkInitRegularMoney() ||
        !checkMaturitDate()
      ) {
        setBtnActive(false);
        return;
      }
    }
    if (currentNumber === 3) {
      postOpenedDepositSaving.mutate();
      return;
    }
    if (currentNumber === 4) {
      navigate('/home');
      return;
    }
    setCurrentNumber((prev) => prev + 1);
    currentNumber === 0 ? setBtnActive(false) : setBtnActive(true);
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

  const checkOutdrawAccountModal = (account: string, accountId: number) => {
    setInfo({
      ...info,
      withdrawAccountNumber: account,
      withdrawAccountId: accountId,
    });
    setBtnActive(true);
  };

  const checkMaturitDate = () => {
    const maturitDatePeriods = calMaturitDate(product.period);
    if (
      info.maturitDate < +maturitDatePeriods.periodList[0] ||
      info.maturitDate > +maturitDatePeriods.periodList[1]
    ) {
      return false;
    }
    return true;
  };

  const checkInitRegularMoney = () => {
    if (info.initMoney < product.payment1 * 1000) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (
      checkInitMoneyAndMaturitDate &&
      checkInitRegularMoney() &&
      checkMaturitDate()
    )
      setBtnActive(true);
    else setBtnActive(false);
  }, [checkInitMoneyAndMaturitDate]);

  return (
    <div className='bg-white flex flex-col items-center h-screen w-full'>
      <Topbar title='예금가입' />
      <div className='flex flex-col justify-between items-center w-full h-full py-10'>
        <div className='flex flex-col px-10 w-full'>
          <h1 className='text-4xl font-hanaMedium mb-7 whitespace-pre-line leading-snug'>
            {currentNumber === 0 && '얼마를 저축할까요?'}
            {currentNumber === 1 && '어느 계좌에서 출금할까요?'}
            {currentNumber === 2 && '만기 시 어떻게 할까요?'}
            {currentNumber === 5 && `이대로 가입하시겠어요?`}
          </h1>
          {currentNumber === 0 && (
            <AccountSaveMoneyAmount
              type={false}
              period={product.period}
              payment1={product.payment1}
              payment2={0}
              onClick={checkinitMoneyAndMaturitDateModal}
              onClickCheck={(status: boolean) =>
                setcheckInitMoneyAndMaturitDate(status)
              }
            />
          )}
          {currentNumber === 1 && (
            <AccountOutputChoice
              productId={product.productId}
              onClick={checkOutdrawAccountModal}
            />
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
