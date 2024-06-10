import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { SelectAccount } from '../../components/molecules/SelectAccount';
import Topbar from '../../components/Topbar';
import { ChoiceMenu } from '../../components/ChoiceMenu';
import { AccountDetailItem } from '../../components/molecules/AccountDetailItem';
import { SendingModal } from '../../components/SendingModal';
import { PasswordForm } from '../../components/molecules/PasswordForm';
import { ConfirmCard } from '../../components/molecules/ConfirmCard';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';

interface RequestType {
  balance: number;
  sendName: string;
  receiveName: string;
  sendAccount: string;
  receiveAccount: string;
}

export const Sending = () => {
  const location = useLocation();

  const locationState = location.state as {
    initialBalance: number;
    sendName: string;
    receiveName: string;
    sendAccount: string;
    receiveAccount: string;
  };

  const accountQuery = useQuery({
    queryKey: ['accounts'],
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
    enabled: false,
  });

  const { mutate: sending, isSuccess: mutateSuccess0 } = useMutation({
    mutationKey: ['sending'],
    mutationFn: () => {
      const res = ApiClient.getInstance().postRemittance({
        amount: Number(String(price).replaceAll(',', '')),
        senderTitle: '머니박스충전',
        recipientTitle: '머니박스충전',
        senderAccount: data.sendAccount,
        recipientAccount: data.receiveAccount,
      });
      return res;
    },
  });

  const { mutate: sendingMoneyBox, isSuccess: mutateSuccess1 } = useMutation({
    mutationKey: ['sendingMoneyBox'],
    mutationFn: () => {
      const res = ApiClient.getInstance().postRemittanceMoneyBox({
        amount: Number(String(price).replaceAll(',', '')),
        senderTitle: `${data.sendName}->${data.receiveName}`,
        recipientTitle: `${data.sendName}->${data.receiveName}`,
        senderMoneybox:
          data.sendName === '파킹'
            ? 'PARKING'
            : data.sendName === '소비'
              ? 'EXPENSE'
              : 'SAVING',
        recipientMoneybox:
          data.receiveName === '파킹'
            ? 'PARKING'
            : data.receiveName === '소비'
              ? 'EXPENSE'
              : 'SAVING',
      });
      return res;
    },
  });

  const { mutate: passwordCheck, data: passwordData } = useMutation({
    mutationKey: ['passwordCheck'],
    mutationFn: (password: string) => {
      const res = ApiClient.getInstance().postAccountPasswordCheck({
        accountNumber: data.sendAccount,
        password: password,
      });
      return res;
    },
  });

  useEffect(() => {
    if (mutateSuccess0 || mutateSuccess1) {
      setPage(page + 1);
      setButtonText('완료');
    }
  }, [mutateSuccess0, mutateSuccess1]);

  const [data, SetData] = useState<RequestType>({
    balance: locationState.initialBalance ? locationState.initialBalance : 0,
    sendName: locationState.sendName,
    receiveName: locationState.receiveName,
    sendAccount: locationState.sendAccount,
    receiveAccount: locationState.receiveAccount,
  });
  const [page, setPage] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModal2, setShowModal2] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [price, setPrice] = useState<number>();
  const [moneyCap, setMoneyCap] = useState<boolean>(true);
  const [isPwdCorrect, setIsPwdCorrect] = useState<boolean>(true);
  const [re, setRe] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>('다음');

  const pwdRef = useRef<(HTMLInputElement | null)[]>(Array(4).fill(null));

  const navigate = useNavigate();

  const showModalHandler = () => setShowModal(!showModal);

  const closeModal2 = () => {
    setShowModal2(!showModal2);
    setPage(page - 1);
  };

  const clickAccount = (
    clickedAccountId: number,
    clickedAccountNumber: string,
    clickedBalance: number,
    clickedName: string
  ) => {
    console.log(clickedAccountId, clickedName);
    SetData({
      ...data,
      sendAccount: clickedAccountNumber,
      balance: clickedBalance,
    });
    setIsActive(true);
    showModalHandler();
  };

  const moveHandler = () => {
    if (page === 1) {
      setPage(page + 1);
      setIsActive(false);
      return;
    } else if (page === 2) {
      setPage(page + 1);
      setShowModal2(true);
      return;
    } else if (page === 3) {
      setPage(page + 1);
      setIsActive(false);
      setShowModal2(false);
      return;
    } else if (page === 4 && passwordData?.message === 'match') {
      if (data.sendAccount === data.receiveAccount) {
        sendingMoneyBox();
      } else {
        sending();
      }
      return;
    } else if (page === 4 && passwordData?.message === 'mismatch') {
      setIsPwdCorrect(false);
      setIsActive(false);
      setRe(!re);
      return;
    } else if (page === 5) {
      navigate('/moneyBox'),
        {
          state: {
            prev: true,
          },
        };
    }
  };

  const priceChangeHandler = (e: any) => {
    let inputPrice = e.target.value;

    inputPrice = Number(inputPrice.replace(/[^0-9]/g, ''));

    setPrice(inputPrice.toLocaleString());
  };

  const blurInput = () => {
    if (!price) return;

    const content = document.getElementById('warning1');

    if (price == 0) {
      setIsActive(false);
      setMoneyCap(false);
      content!.innerText = '0원은 송금할 수 없습니다.';
      return;
    }

    let realPrice = Number(String(price).replaceAll(',', ''));

    if (realPrice > data.balance) {
      setIsActive(false);
      setMoneyCap(false);
      content!.innerText = '현재 잔액보다 큰 금액은 송금할 수 없습니다.';
      return;
    }

    if (!price || price != 0) {
      setIsActive(true);
      setMoneyCap(true);
    }
  };

  const checkPwdCondition = () => {
    if (pwdRef.current.map((p) => p?.value).join('').length === 4) {
      passwordCheck(pwdRef.current.map((p) => p?.value).join(''));
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  useEffect(() => {
    if (data.sendAccount) {
      setPage(2);
    } else {
      accountQuery.refetch();
    }
  }, []);

  return (
    <>
      {showModal && (
        <ChoiceMenu title='출금계좌선택' onClose={() => showModalHandler()}>
          <div className='flex flex-col'>
            {accountQuery.data?.map((account, idx) => (
              <AccountDetailItem
                key={idx}
                title={account.name}
                accountId={account.accountId}
                accountNumber={account.accountNumber}
                balance={account.balance}
                onClick={clickAccount}
              />
            ))}
          </div>
        </ChoiceMenu>
      )}
      {/* 3페이지 */}
      {showModal2 && (
        <SendingModal
          balance={String(price)}
          sendName={data.sendName ? data.sendName : ''}
          receiveName={data.receiveName}
          sendAccount={data.sendAccount}
          receiveAccount={data.receiveAccount}
          onClose={closeModal2}
          onButton={moveHandler}
        />
      )}
      <Topbar title='머니박스 송금' />
      <div className='flex flex-col p-10 justify-between min-h-real-screen2 bg-white'>
        <div className='flex flex-col justify-center items-center'>
          {page < 4 && (
            <div className='font-hanaBold text-3xl mt-10 mb-5'>
              나의 머니박스 {data.receiveName}
              {data.receiveName == '소비' ? '로' : '으로'}
            </div>
          )}
          {/* 2페이지 이상 고정값 */}
          {page >= 2 && page < 4 && (
            <p className='font-hanaMedium text-3xl text-hanaGreen mb-4'>
              {data.receiveAccount}
            </p>
          )}
          {/* 3페이지 이상 고정값 */}
          {page >= 3 && page < 4 && (
            <p className='font-hanaRegular text-4xl'>{price}원</p>
          )}
          {/* 1페이지 */}
          {page == 1 && (
            <div className='w-full mt-6'>
              <SelectAccount
                onClick={() => showModalHandler()}
                account={data.sendAccount}
              />
            </div>
          )}
          {/* 2페이지 */}
          {page == 2 && (
            <div className='flex flex-col items-center'>
              <div className='flex flex-row justify-center items-center text-3xl font-hanaLight'>
                <input
                  type='text'
                  className='border-b-2 h-28 w-3/5 text-[3rem] text-center font-hanaRegular'
                  placeholder='보낼 금액'
                  value={price}
                  onChange={(e) => priceChangeHandler(e)}
                  onBlur={() => blurInput()}
                  maxLength={13}
                />
                {price && '원'}
              </div>
              <p
                id='warning1'
                className={`${moneyCap ? 'hidden' : 'visible'} text-hanaRed text-xl font-hanaRegular mt-4`}
              ></p>
            </div>
          )}
          {/* 4페이지 */}
          {page === 4 && (
            <div className='flex flex-col justify-center items-center mt-16'>
              <PasswordForm
                title='계좌 비밀번호를 입력해주세요'
                inputRef={pwdRef}
                isCorrect={isPwdCorrect}
                re={re}
                checkPwdCondition={checkPwdCondition}
              />
            </div>
          )}
          {/* 5페이지 */}
          {page === 5 && <ConfirmCard text='송금 완료' />}
        </div>
        <div className='flex flex-row justify-center items-center'>
          <Button
            text={buttonText}
            onClick={() => moveHandler()}
            isActive={isActive}
          />
        </div>
      </div>
    </>
  );
};
