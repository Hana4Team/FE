import { useLocation, useNavigate } from 'react-router-dom';
import Topbar from '../../components/Topbar';
import { useRef, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { AccountSaveMoneyAmount } from '../../components/organisms/accounts/AccountSaveMoneyAmount';
import { IoIosArrowDown } from 'react-icons/io';
import { ChoiceMenu } from '../../components/ChoiceMenu';
import { AccountMaturitChoice } from '../../components/organisms/accounts/AccountMaturitChoice';
import { AccountPw } from '../../components/organisms/accounts/AccountPw';
import { AccountCheck } from '../../components/organisms/accounts/AccountCheck';
import { ConfirmCard } from '../../components/molecules/ConfirmCard';
import { AccountOutputChoice } from '../../components/organisms/accounts/AccountOutputChoice';
import { AccountPwCheck } from '../../components/organisms/accounts/AccountPwCheck';
import {
  checkAmountUnitMoney,
  checkAmountUnitNumber,
} from '../../utils/checkAmountUnit';
type userInfo = {
  maturitDate: string;
  initMoney: number;
  regularDay: number;
  money: number;
  outdrawAccountNumber: string;
  interest: number;
  password: string;
};

export const Mission4AccountOpening = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state.product;
  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const [btnActive, setBtnActive] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [info, setInfo] = useState<userInfo>({
    maturitDate: '',
    initMoney: -1,
    regularDay: new Date().getDate(),
    money: -1,
    outdrawAccountNumber: '',
    interest: data.interest1,
    password: '',
  });

  const regularDayInput = useRef<HTMLInputElement | null>(null);
  const moneyInput = useRef<HTMLInputElement | null>(null);

  const nextHandler = () => {
    if (currentNumber === 7) {
      navigate('/roadmap4');
      return;
    }
    setCurrentNumber((prev) => prev + 1);
    currentNumber === 2 || currentNumber === 5 || currentNumber === 6
      ? setBtnActive(true)
      : setBtnActive(false);
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

  const regularDayEffect = () => {
    if (regularDayInput.current) {
      if (regularDayInput.current.value === '') return;
      if (+regularDayInput.current.value < 1)
        regularDayInput.current.value = '1';
      else if (+regularDayInput.current.value > 31)
        regularDayInput.current.value = '31';
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
        +moneyInput.current.value < checkAmountUnitNumber(data.payment1) ||
        +moneyInput.current.value > checkAmountUnitNumber(data.payment2)
      ) {
        setInfo({ ...info, money: 0 });
        return;
      }
      setInfo({ ...info, money: +moneyInput.current.value });
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
              {currentNumber === 4 && '계좌 비밀번호를 입력해주세요'}
              {currentNumber === 5 && '계좌 비밀번호를\n 한 번 더 입력해주세요'}
              {currentNumber === 6 && `이대로 가입하시겠어요?`}
            </h1>
            {currentNumber === 0 && (
              <AccountSaveMoneyAmount
                type={true}
                period={data.period}
                payment1={data.payment1}
                payment2={data.payment2}
                onClick={checkinitMoneyAndMaturitDateModal}
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
                {info.money === 0 && (
                  <span className='font-hanaLight text-lg text-red-600 -mt-3'>
                    {`${data.payment1}${checkAmountUnitMoney(data.payment1)}~${data.payment2}${checkAmountUnitMoney(data.payment2)}사이의 금액을
                    입력해주세요`}
                  </span>
                )}
              </div>
            )}
            {currentNumber === 2 && (
              <AccountOutputChoice onClick={checkOutdrawAccountModal} />
            )}
            {currentNumber === 3 && <AccountMaturitChoice />}
            {currentNumber === 4 && <AccountPw onClick={checkPwModal} />}
            {currentNumber === 5 && (
              <AccountPwCheck
                password={info.password}
                onClick={() => setBtnActive(true)}
              />
            )}
            {currentNumber === 6 && (
              <AccountCheck
                money={info.initMoney}
                period={info.maturitDate}
                interest={info.interest}
                automatic_payment_date={info.regularDay}
                automatic_payment_money={info.money}
                outdrawAccountNumber={info.outdrawAccountNumber}
              />
            )}
            {currentNumber === 7 && (
              <ConfirmCard text={`${data.name}\n가입 완료`} />
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
