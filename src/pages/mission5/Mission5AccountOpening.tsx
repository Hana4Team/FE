import { useLocation, useNavigate } from 'react-router-dom';
import Topbar from '../../components/Topbar';
import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { AccountSaveMoneyAmount } from '../../components/organisms/accounts/AccountSaveMoneyAmount';
import { AccountMaturitChoice } from '../../components/organisms/accounts/AccountMaturitChoice';
import { AccountPw } from '../../components/organisms/accounts/AccountPw';
import { AccountCheck } from '../../components/organisms/accounts/AccountCheck';
import { ConfirmCard } from '../../components/molecules/ConfirmCard';
import { AccountPwCheck } from '../../components/organisms/accounts/AccountPwCheck';
type userInfo = {
  maturitDate: string;
  initMoney: number;
  outdrawAccountNumber: string;
  interest: number;
  password: string;
};

export const Mission5AccountOpening = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state.product;
  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const [btnActive, setBtnActive] = useState<boolean>(false);
  const [info, setInfo] = useState<userInfo>({
    maturitDate: '',
    initMoney: -1,
    outdrawAccountNumber: '',
    interest: data.interest1,
    password: '',
  });

  const nextHandler = () => {
    if (currentNumber === 4) {
      navigate('/home');
      return;
    }
    setCurrentNumber((prev) => prev + 1);
    setBtnActive(true);
  };

  const checkinitMoneyAndMaturitDateModal = (
    maturitDate: string,
    initMoney: number
  ) => {
    setInfo({
      ...info,
      maturitDate: maturitDate,
      initMoney: initMoney,
    });
    setBtnActive(true);
  };

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
              period={data.period}
              payment1={1000000}
              payment2={1500000}
              onClick={checkinitMoneyAndMaturitDateModal}
            />
          )}
          {currentNumber === 1 && (
            <div className='flex flex-col gap-5 justify-center pt-1 pb-2 border-b-[0.1rem] border-black mb-3'>
              <div className='flex gap-3 items-center'>
                <img src='/images/logo.svg' alt='logo' className='w-12 h-12' />
                <div className='flex flex-col gap-1 text-hanaGreen'>
                  <p className='font-hanaRegular text-lg'>영하나적금통장</p>
                  <p className='font-hanaMedium text-xl'>000-00000-00000</p>
                </div>
              </div>
            </div>
          )}
          {currentNumber === 2 && <AccountMaturitChoice />}
          {currentNumber === 3 && (
            <AccountCheck
              money={info.initMoney}
              period={info.maturitDate}
              interest={info.interest}
              outdrawAccountNumber={info.outdrawAccountNumber}
            />
          )}
          {currentNumber === 4 && (
            <ConfirmCard text={`${data.name}\n가입 완료`} />
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
