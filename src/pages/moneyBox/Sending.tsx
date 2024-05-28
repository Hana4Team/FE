import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { SelectAccount } from '../../components/molecules/SelectAccount';
import Topbar from '../../components/Topbar';
import { ChoiceMenu } from '../../components/ChoiceMenu';
import { AccountDetailItem } from '../../components/molecules/AccountDetailItem';

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
    sendName: string;
    receiveName: string;
    sendAccount: string;
    receiveAccount: string;
  };

  const [data, SetData] = useState<RequestType>({
    balance: 0,
    sendName: locationState.sendName,
    receiveName: locationState.receiveName,
    sendAccount: locationState.sendAccount,
    receiveAccount: locationState.receiveAccount,
  });
  const [page, setPage] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  const navigate = useNavigate();

  const showModalHandler = () => setShowModal(!showModal);
  const clickAccount = (clickedAccount: string) => {
    SetData({ ...data, sendAccount: clickedAccount });
    setIsActive(true);
    showModalHandler();
  };

  const moveHandler = () => {
    if (page == 1) {
      setPage(page + 1);
      setIsActive(false);
      return;
    }

    navigate('/moneyBox');
  };

  useEffect(() => {
    data.sendAccount && setPage(2);
  }, []);

  return (
    <>
      {showModal && (
        <ChoiceMenu title='출금계좌선택' onClose={() => showModalHandler()}>
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
      <Topbar title='머니박스 송금' />
      <div className='flex flex-col p-10 justify-between min-h-real-screen2 bg-white'>
        <div className='flex flex-col justify-center items-center'>
          <div className='font-hanaBold text-3xl mt-10 mb-5'>
            나의 머니박스 {data.receiveName}
            {data.receiveName == '소비' ? '로' : '으로'}
          </div>
          {/* 1페이지 */}
          {page == 1 && (
            <SelectAccount
              onClick={() => showModalHandler()}
              account={data.sendAccount}
            />
          )}
          {page == 2 && (
            <div className='flex flex-col items-center'>
              <p className='font-hanaMedium text-2xl text-hanaGreen mb-4'>
                {data.receiveAccount}
              </p>
              <input
                type='number'
                className='border-b-2 h-28 w-3/5 text-[3rem] text-center font-hanaRegular'
                placeholder='보낼 금액'
              />
            </div>
          )}
        </div>
        <div className='flex flex-row justify-center items-center'>
          <Button
            text='다음'
            onClick={() => moveHandler()}
            isActive={isActive}
          />
        </div>
      </div>
    </>
  );
};
