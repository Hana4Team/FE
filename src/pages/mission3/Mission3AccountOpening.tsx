import { useLocation, useNavigate } from 'react-router-dom';
import Topbar from '../../components/Topbar';
import { useRef, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { ConfirmCard } from '../../components/molecules/ConfirmCard';
import { AccountOutputChoice } from '../../components/organisms/accounts/AccountOutputChoice';
import { AccountMaturitChoice } from '../../components/organisms/accounts/AccountMaturitChoice';
import { userInfo } from 'os';
import { AccountPw } from '../../components/organisms/accounts/AccountPw';
import { AccountPwCheck } from '../../components/organisms/accounts/AccountPwCheck';
import { AccountCheck } from '../../components/organisms/accounts/AccountCheck';

export const dummyData = {
  initMoney: 500000,
  accounts: [
    {
      name: '영하나플러스통장1',
      accountNumber: '000-00000-000000',
      money: 200000,
    },
    {
      name: '영하나플러스통장2',
      accountNumber: '111-00000-000000',
      money: 300000,
    },
    {
      name: '영하나플러스통장3',
      accountNumber: '000-00000-000000',
      money: 400000,
    },
  ],
};

type userInfo = {
  initMoney: number;
  savingMoney: number;
  outdrawAccountNumber: string;
  savingDate: string;
  interest: number;
  password: string;
};

export const Mission3AccountOpening = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state.product;
  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const [btnActive, setBtnActive] = useState<boolean>(true);
  const [info, setInfo] = useState<userInfo>({
    initMoney: dummyData.initMoney,
    savingMoney: -1,
    outdrawAccountNumber: '',
    savingDate: '100일',
    interest: data.interest1,
    password: '',
  });

  const savingMoneyInput = useRef<HTMLInputElement | null>(null);

  const nextHandler = () => {
    if (currentNumber === 7) {
      navigate('/home');
      return;
    }
    setCurrentNumber((prev) => prev + 1);
    currentNumber === 2 || currentNumber === 5 || currentNumber === 6
      ? setBtnActive(true)
      : setBtnActive(false);
  };

  const checkEffectSavingMoney = (prev: userInfo) => {
    if (savingMoneyInput.current) {
      if (
        savingMoneyInput.current?.value === '' ||
        +savingMoneyInput.current.value < data.payment1 * 1000 ||
        +savingMoneyInput.current.value > data.payment2 * 1000
      ) {
        setInfo({
          ...prev,
          savingMoney: 0,
        });
        return;
      }
      setInfo({
        ...prev,
        savingMoney: +savingMoneyInput.current?.value,
      });
      setBtnActive(true);
    }
  };

  const checkOutdrawAccountModal = (account: string) => {
    setInfo({
      ...info,
      outdrawAccountNumber: account,
    });
    setBtnActive(true);
  };

  const checkPwModal = (password: string) => {
    setInfo({
      ...info,
      password: password,
    });
    setBtnActive(true);
  };

  return (
    <>
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
              {currentNumber === 4 && '계좌 비밀번호를 입력해주세요'}
              {currentNumber === 5 && '계좌 비밀번호를\n 한 번 더 입력해주세요'}
              {currentNumber === 6 && `이대로 가입하시겠어요?`}
            </h1>
            {currentNumber === 0 && (
              <div className='w-full flex items-center font-hanaMedium text-[1.7rem]'>
                <span className='mr-10'>
                  {dummyData.initMoney.toLocaleString('ko-KR')}
                </span>
                가입하기
              </div>
            )}
            {currentNumber === 1 && (
              <div>
                <p className='flex justify-center w-60 border-b-[0.05rem] text-2xl font-hanaMedium border-black py-3'>
                  <input
                    type='text'
                    ref={savingMoneyInput}
                    placeholder={`${data?.payment1}${data?.payment1 < 10 ? '천원' : '만원'} ~ ${data?.payment2}${data?.payment2 < 10 ? '천원' : '만원'} `}
                    onBlur={() => checkEffectSavingMoney(info)}
                    className='w-52 placeholder:text-[#979797] text-2xl'
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
              <div className='w-full'>
                <AccountOutputChoice onClick={checkOutdrawAccountModal} />
              </div>
            )}
            {currentNumber === 3 && (
              <div className='w-full'>
                <AccountMaturitChoice />
              </div>
            )}
            {currentNumber === 4 && <AccountPw onClick={checkPwModal} />}
            {currentNumber === 5 && (
              <AccountPwCheck
                password={info.password}
                onClick={() => setBtnActive(true)}
              />
            )}
            {currentNumber === 6 && (
              <div className='w-full'>
                <AccountCheck
                  money={info.initMoney}
                  period={info.savingDate}
                  interest={info.interest}
                  outdrawAccountNumber={info.outdrawAccountNumber}
                />
              </div>
            )}
            {currentNumber === 7 && (
              <ConfirmCard text={`100일 적금\n 가입 완료`} />
            )}
          </div>
          <Button
            text={currentNumber === 7 ? '완료' : '다음'}
            onClick={() => nextHandler()}
            isActive={btnActive}
          />
        </div>
      </div>
    </>
  );
};
