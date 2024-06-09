import React, { useRef, useState } from 'react';
import Topbar from '../../components/Topbar';
import { SelectAccount } from '../../components/molecules/SelectAccount';
import { Button } from '../../components/ui/Button';
import { ChoiceMenu } from '../../components/ChoiceMenu';
import { AccountDetailItem } from '../../components/molecules/AccountDetailItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { ConfirmCard } from '../../components/molecules/ConfirmCard';
import { pwPattern } from '../../utils/checkValidation';
import { differenceInDays } from 'date-fns';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { AccountDelType, AccountPwdCheckType } from '../../types/account';

interface RequestType {
  accountId: number;
  accountName: string;
  sendAccount: string;
  sendAccountId: number;
  endDate: string;
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
  const [isPwdCheck, setIsPwdCheck] = useState<boolean>(true);

  const { mutate: postAccountPasswordCheck } = useMutation({
    mutationFn: (reqData: AccountPwdCheckType) => {
      const res = ApiClient.getInstance().postAccountPasswordCheck(reqData);
      return res;
    },
    onSuccess: (data) => {
      if (data.message === 'match') setStep((prev) => prev + 1);
      else setIsPwdCheck(false);
    },
  });

  const { data: accounts, isSuccess } = useQuery({
    queryKey: ['account'],
    queryFn: () => {
      const res = ApiClient.getInstance().getAccount({
        depositWithdrawalAccount: true,
        depositAccount: false,
        saving100Account: false,
        savingsAccount: false,
        moneyboxAccount: false,
      });
      return res;
    },
  });

  const { mutate: deleteAccount } = useMutation({
    mutationFn: (reqData: AccountDelType) => {
      const res = ApiClient.getInstance().deleteAccount(reqData);
      return res;
    },
    onSuccess: (data) => {
      data.message === 'success' && setStep((prev) => prev + 1);
    },
  });

  const locationState = location.state as {
    accountId: number;
    accountName: string;
    sendAccount: string;
    terminationDate: string;
    endDate: string;
    principal: number;
    totalAmount: number;
  };

  const [data, setDate] = useState<RequestType>({
    accountId: locationState.accountId,
    accountName: locationState.accountName,
    sendAccount: locationState.sendAccount,
    sendAccountId: 0,
    endDate: locationState.endDate,
    terminationDate: locationState.terminationDate,
    terminationType:
      differenceInDays(locationState.endDate, locationState.terminationDate) > 0
        ? '중도해지'
        : '만기해지',
    principal: locationState.principal,
    totalAmount:
      differenceInDays(locationState.endDate, locationState.terminationDate) > 0
        ? locationState.principal
        : locationState.totalAmount,
    receiveAccount: '',
  });

  const showModalHandler = () => setShowModal(!showModal);
  const nextStep = () => {
    if (step === 1) {
      postAccountPasswordCheck({
        accountNumber: data.sendAccount,
        password: pwdRef.current!.value,
      });
    } else if (step === 2) {
      deleteAccount({
        deleteAccountId: data.accountId,
        depositAccountId: data.sendAccountId,
      });
    } else if (step === 3) {
      navigate('/mission');
    }
  };
  const clickAccount = (
    clickedAccountId: number,
    clikedAccountNumber: string,
    clickedBalance: number,
    clickedName: string
  ) => {
    setShowModal(false);
    setDate({
      ...data,
      receiveAccount: clikedAccountNumber,
      sendAccountId: clickedAccountId,
    });
    if (pwPattern.test(pwdRef.current!.value)) setIsActive(true);
  };
  const checkIsActive = () => {
    if (pwPattern.test(pwdRef.current!.value) && data.receiveAccount !== '')
      setIsActive(true);
    else setIsActive(false);
  };

  return (
    <div className='bg-white h-screen flex flex-col items-center'>
      {showModal && isSuccess && (
        <ChoiceMenu title='입금계좌선택' onClose={() => showModalHandler()}>
          <div className='flex flex-col'>
            {accounts.map((account) => (
              <AccountDetailItem
                accountId={account.accountId}
                title={account.name}
                accountNumber={account.accountNumber}
                balance={account.balance}
                onClick={clickAccount}
              />
            ))}
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
              {!isPwdCheck && (
                <div className='text-lg mt-2 text-red-500'>
                  비밀번호를 다시 입력해주세요
                </div>
              )}
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
                <p>{data.endDate}</p>
              </div>
              <div className='flex justify-between mb-2'>
                <p>해지일</p>
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
                <p>해지계좌이름</p>
                <p>{data.accountName}</p>
              </div>
              <div className='flex justify-between'>
                <p>해지계좌번호</p>
                <p>{data.sendAccount}</p>
              </div>
              <div className='flex justify-between'>
                <p>만기일</p>
                <p>{data.endDate}</p>
              </div>
              <div className='flex justify-between'>
                <p>해지구분</p>
                <p>{data.terminationType}</p>
              </div>
              <div className='flex justify-between'>
                <p>원금</p>
                <p>{data.principal.toLocaleString()}</p>
              </div>
              <div className='flex justify-between'>
                <p>받으실금액</p>
                <p>{data.totalAmount.toLocaleString()}</p>
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
