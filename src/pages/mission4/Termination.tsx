import React, { useRef, useState } from 'react';
import Topbar from '../../components/Topbar';
import { SelectAccount } from '../../components/molecules/SelectAccount';
import { Button } from '../../components/ui/Button';
import { ChoiceMenu } from '../../components/ChoiceMenu';
import { AccountDetailItem } from '../../components/molecules/AccountDetailItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { ConfirmCard } from '../../components/molecules/ConfirmCard';
import { pwPattern } from '../../utils/checkValidation';

interface RequestType {
  accountType: string;
  sendAccount: string;
  terminationDate: string;
  terminationType: string;
  principal: number;
  totalAmount: number;
  receiveAccount: string;
}

export const Termination = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const pwdRef = useRef<HTMLInputElement | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  const locationState = location.state as {
    accountType: string;
    sendAccount: string;
    terminationDate: string;
    terminationType: string;
    principal: number;
    totalAmount: number;
  };

  // const [receiveAccount, setReceiveAccount] = useState<string>('');
  const [data, setDate] = useState<RequestType>({
    accountType: locationState.accountType,
    sendAccount: locationState.sendAccount,
    terminationDate: locationState.terminationDate,
    terminationType: locationState.terminationType,
    principal: locationState.principal,
    totalAmount: locationState.totalAmount,
    receiveAccount: '',
  });

  const showModalHandler = () => setShowModal(!showModal);
  const nextStep = () => {
    if (step === 3) navigate('/mission');
    else setStep((prev) => prev + 1);
  };
  const clickAccount = (clikedAccount: string) => {
    setShowModal(false);
    setDate({ ...data, receiveAccount: clikedAccount });
    if (pwPattern.test(pwdRef.current!.value)) setIsActive(true);
  };
  const checkIsActive = () => {
    if (pwPattern.test(pwdRef.current!.value) && data.receiveAccount !== '')
      setIsActive(true);
  };

  return (
    <div className='bg-white h-screen flex flex-col items-center'>
      {showModal && (
        <ChoiceMenu title='입금계좌선택' onClose={() => showModalHandler()}>
          <div className='flex flex-col'>
            <AccountDetailItem
              title='영하나플러스통장'
              account='111-111-111111'
              balance={50000}
              onClick={clickAccount}
            />
            <AccountDetailItem
              title='영하나플러스통장'
              account='222-222-222222'
              balance={200000}
              onClick={clickAccount}
            />
          </div>
        </ChoiceMenu>
      )}
      <Topbar title='예적금 해지' />

      {step === 1 ? (
        <div className='flex flex-col justify-between items-center w-full h-full p-10'>
          <div className='w-full'>
            <div className='my-10'>
              <div className='font-hanaMedium text-2xl mb-2'>계좌 비밀번호</div>
              <input
                type='password'
                ref={pwdRef}
                maxLength={4}
                className='p-2 border-b-2 w-full text-2xl'
                onBlur={checkIsActive}
              />
            </div>
            <div className='my-10'>
              <div className='font-hanaMedium text-2xl mb-6'>입금계좌 선택</div>
              <SelectAccount
                onClick={() => showModalHandler()}
                account={data.receiveAccount}
                isDeposit
              />
            </div>
            <div className='m-5 font-hanaLight text-lg border p-5'>
              <div className='flex justify-between mb-2'>
                <p>해지구분</p>
                <p>{data.terminationType}</p>
              </div>
              <div className='flex justify-between mb-2'>
                <p>만기일</p>
                <p>{data.terminationDate}</p>
              </div>
              <div className='flex justify-between'>
                <p>해지방식</p>
                <p>내계좌로 입금</p>
              </div>
            </div>
          </div>
          <Button text='다음' onClick={() => nextStep()} isActive={isActive} />
        </div>
      ) : step === 2 ? (
        <div className='flex flex-col justify-between items-center w-full h-full p-10'>
          <div className='w-full'>
            <div className='font-hanaMedium text-3xl mb-10'>
              즉시해지 정보확인
            </div>
            <div className='flex flex-col font-hanaLight text-xl border px-7 py-5 gap-2'>
              <div className='flex justify-between'>
                <p>해지계좌종류</p>
                <p>{data.accountType}</p>
              </div>
              <div className='flex justify-between'>
                <p>해지계좌번호</p>
                <p>{data.sendAccount}</p>
              </div>
              <div className='flex justify-between'>
                <p>만기일</p>
                <p>{data.terminationDate}</p>
              </div>
              <div className='flex justify-between'>
                <p>해지구분</p>
                <p>{data.terminationType}</p>
              </div>
              <div className='flex justify-between'>
                <p>원금</p>
                <p>{data.principal}</p>
              </div>
              <div className='flex justify-between'>
                <p>받으실금액</p>
                <p>{data.totalAmount}</p>
              </div>
              <div className='flex justify-between'>
                <p>입금계좌번호</p>
                <p>{data.receiveAccount}</p>
              </div>
            </div>
          </div>
          <Button text='해지' onClick={() => nextStep()} />
        </div>
      ) : (
        <div className='flex flex-col justify-between items-center w-full h-full p-10'>
          <ConfirmCard text='해지 완료' />
          <Button text='완료' onClick={() => nextStep()} />
        </div>
      )}
    </div>
  );
};
