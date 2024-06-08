import { useLocation, useNavigate } from 'react-router-dom';
import Topbar from '../../components/Topbar';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { AccountSaveMoneyAmount } from '../../components/organisms/accounts/AccountSaveMoneyAmount';
import { IoIosArrowDown } from 'react-icons/io';
import { ChoiceMenu } from '../../components/ChoiceMenu';
import { AccountMaturitChoice } from '../../components/organisms/accounts/AccountMaturitChoice';
import { AccountCheck } from '../../components/organisms/accounts/AccountCheck';
import { ConfirmCard } from '../../components/molecules/ConfirmCard';
import { AccountOutputChoice } from '../../components/organisms/accounts/AccountOutputChoice';
import {
  checkAmountMoney,
  checkAmountUnitMoney,
} from '../../utils/checkAmountUnit';
import { add, format } from 'date-fns';
import { useMutation } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { calMaturitDate } from '../../utils/calMaturitDate';
type userInfo = {
  maturitDate: number;
  maturitDateUnit: string;
  initMoney: number;
  regularDay: number;
  regularMoney: number;
  withdrawAccountId: number;
  withdrawAccountNumber: string;
};

export const Mission4AccountOpening = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state.product;
  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const [btnActive, setBtnActive] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [checkInitMoneyAndMaturitDate, setcheckInitMoneyAndMaturitDate] =
    useState<boolean>(false);
  const [info, setInfo] = useState<userInfo>({
    maturitDate: -1,
    maturitDateUnit: '',
    initMoney: -1,
    regularDay: new Date().getDate(),
    regularMoney: -1,
    withdrawAccountId: -1,
    withdrawAccountNumber: '',
  });

  const regularDayInput = useRef<HTMLInputElement | null>(null);
  const moneyInput = useRef<HTMLInputElement | null>(null);

  const postOpenedDepositSaving = useMutation({
    mutationFn: () =>
      ApiClient.getInstance().postOpenedDepositSaving(
        {
          payment: info.regularMoney,
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
        !checkInitRegularMoney(info.initMoney)
      ) {
        setBtnActive(false);
        return;
      }
    }
    if (currentNumber === 1) {
      if (
        moneyInput.current &&
        (moneyInput.current.value === '' ||
          !checkInitRegularMoney(+moneyInput.current.value) ||
          !checkMaturitDate())
      ) {
        setBtnActive(false);
        return;
      }
    }
    if (currentNumber === 4) {
      postOpenedDepositSaving.mutate();
      return;
    }
    if (currentNumber === 5) {
      navigate('/roadmap4');
      return;
    }
    setCurrentNumber((prev) => prev + 1);
    currentNumber === 2 || currentNumber === 3 || currentNumber === 4
      ? setBtnActive(true)
      : setBtnActive(false);
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
  };

  const regularDayEffect = () => {
    if (regularDayInput.current) {
      if (regularDayInput.current.value === '') return;
      if (+regularDayInput.current.value < 1)
        regularDayInput.current.value = '1';
      else if (+regularDayInput.current.value > 30)
        regularDayInput.current.value = '30';
    }
  };

  const checkRegularDay = () => {
    if (regularDayInput.current) {
      if (regularDayInput.current.value === '') return;
      setInfo({ ...info, regularDay: +regularDayInput.current.value });
      setShowModal(!showModal);
    }
  };

  const checkMoney = () => {
    if (moneyInput.current) {
      if (
        moneyInput.current.value === '' ||
        !checkInitRegularMoney(+moneyInput.current.value)
      ) {
        setInfo({ ...info, regularMoney: 0 });
        return;
      }
      setInfo({ ...info, regularMoney: +moneyInput.current.value });
      setBtnActive(true);
    }
  };

  const checkOutdrawAccountModal = (account: string, accountId: number) => {
    setInfo({
      ...info,
      withdrawAccountNumber: account,
      withdrawAccountId: accountId,
    });
    setBtnActive(true);
  };

  const checkInitRegularMoney = (money: number) => {
    if (money < product.payment1 * 1000 || money > product.payment2 * 1000) {
      return false;
    }
    return true;
  };

  const checkMaturitDate = () => {
    const maturitDatePeriods = calMaturitDate(product.period);
    if (info.maturitDateUnit === '개월') {
      if (
        info.maturitDate < +maturitDatePeriods.periodList[0] ||
        info.maturitDate > +maturitDatePeriods.periodList[1]
      ) {
        return false;
      }
    } else {
      if (!maturitDatePeriods.periodList.includes(info.maturitDate + ''))
        return false;
    }
    return true;
  };

  useEffect(() => {
    if (
      checkInitMoneyAndMaturitDate &&
      checkInitRegularMoney(info.initMoney) &&
      checkMaturitDate()
    )
      setBtnActive(true);
    else setBtnActive(false);
  }, [checkInitMoneyAndMaturitDate]);

  return (
    <>
      {showModal && (
        <ChoiceMenu
          title='자동이체일 선택'
          onClose={() => setShowModal(!showModal)}
        >
          <div className='flex flex-col justify-center gap-5'>
            {currentNumber === 1 && (
              <div className='flex flex-col justify-center items-center gap-7'>
                <div className='w-5/6 flex justify-between items-center font-hanaRegular text-3xl gap-20'>
                  <p className='bg-[#F2F2F2] w-1/2 p-8 rounded-2xl text-center'>
                    매월
                  </p>
                  <p className='flex justify-center items-center bg-[#F2F2F2] w-1/2 p-8 rounded-2xl text-center'>
                    <input
                      type='number'
                      ref={regularDayInput}
                      onInput={regularDayEffect}
                      defaultValue={1}
                      className='w-10 text-center bg-transparent placeholder:text-[#858585]'
                    />
                    일
                  </p>
                </div>
                <Button text='저장' onClick={checkRegularDay} />
              </div>
            )}
          </div>
        </ChoiceMenu>
      )}
      <div className='bg-white flex flex-col items-center h-screen w-full'>
        <Topbar title='적금가입' />
        <div className='flex flex-col justify-between items-center w-full h-full py-10'>
          <div className='flex flex-col px-10 w-full'>
            <h1 className='text-4xl font-hanaMedium mb-7 whitespace-pre-line leading-snug'>
              {currentNumber === 0 && '얼마를 저축할까요?'}
              {currentNumber === 1 && '정기적으로 저축할까요?'}
              {currentNumber === 2 && '어느 계좌에서 출금할까요?'}
              {currentNumber === 3 && '만기 시 어떻게 할까요?'}
              {currentNumber === 6 && `이대로 가입하시겠어요?`}
            </h1>
            {currentNumber === 0 && (
              <AccountSaveMoneyAmount
                type={true}
                period={product.period}
                payment1={product.payment1}
                payment2={product.payment2}
                onClick={checkinitMoneyAndMaturitDateModal}
                onClickCheck={(status: boolean) =>
                  setcheckInitMoneyAndMaturitDate(status)
                }
              />
            )}
            {currentNumber === 1 && (
              <div className='flex flex-col gap-5 justify-center'>
                <p
                  onClick={() => setShowModal(!showModal)}
                  className='w-40 flex justify-between items-center px-1 pt-1 pb-2 border-b-[0.1rem] border-black cursor-pointer text-hanaGreen font-hanaBold text-2xl'
                >
                  매월 {info.regularDay}일
                  <IoIosArrowDown color='#545454' size={15} />
                </p>
                <p className='flex items-center font-hanaMedium text-[1.8rem]'>
                  <input
                    type='text'
                    pattern='\d*'
                    maxLength={8}
                    ref={moneyInput}
                    onBlur={checkMoney}
                    className='w-28 border-b-[0.1rem] border-black px-1 pt-1 pb-2 text-hanaGreen font-hanaBold text-2xl mr-3 text-end'
                  />
                  {moneyInput.current?.value && '원'}씩 저축하기
                </p>
                {info.regularMoney === 0 && (
                  <span className='font-hanaLight text-lg text-red-600 -mt-3'>
                    {`${checkAmountMoney(product.payment1)}${checkAmountUnitMoney(product.payment1)}~${checkAmountMoney(product.payment2)}${checkAmountUnitMoney(product.payment2)}사이의 금액을
                    입력해주세요`}
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
                money={info.initMoney}
                period={info.maturitDate + info.maturitDateUnit}
                interest={product.interest1}
                automatic_payment_date={info.regularDay}
                automatic_payment_money={info.regularMoney}
                outdrawAccountNumber={info.withdrawAccountNumber}
              />
            )}
            {currentNumber === 5 && (
              <ConfirmCard text={`${product.name}\n가입 완료`} />
            )}
          </div>
          <Button
            text={currentNumber === 5 ? '완료' : '다음'}
            onClick={() => nextHandler()}
            isActive={btnActive}
          />
        </div>
      </div>
    </>
  );
};
