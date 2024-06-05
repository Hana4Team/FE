import Topbar from '../../components/Topbar';
import { MoneyBoxItem } from '../../components/molecules/MoneyBoxItem';
import { ChoiceMenu } from '../../components/ChoiceMenu';
import { useState } from 'react';
import { MoneyBoxMoveItem } from '../../components/molecules/MoneyBoxMoveItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertModal } from '../../components/AlertModal';

export const MoneyBox = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const locationState = location.state as {
    prev: boolean;
  };

  const moneyBoxAccount = '111-111-111111';

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showChoiceModal, setShowChoiceModal] = useState<boolean>(false);
  const [clickedName, setClickedName] = useState<string>('파킹');

  const openChoiceModalHandler = () => setShowChoiceModal(true);
  const closeChoiceModalHandler = () => {
    setShowChoiceModal(false);
    setClickedName('파킹');
  };
  const openModalHanlder = () => setShowModal(true);
  const closeModalHandler = () => {
    setShowModal(!showModal);
    if (clickedName == '저축') {
      openChoiceModalHandler();
    }
  };

  const clickMove = (name: string) => {
    setClickedName(name);

    if (name === '저축') {
      openModalHanlder();
      return;
    }

    setShowChoiceModal(!showChoiceModal);
  };

  const moveHandler = (receiveName: string, selectSend?: boolean) => {
    navigate('/sending', {
      state: {
        initialBalance: 1000000,
        sendName: clickedName,
        receiveName: receiveName,
        sendAccount: selectSend ? '' : moneyBoxAccount,
        receiveAccount: '111-111-111111',
      },
    });
  };

  const onClickBack = () => {
    if (locationState != null && locationState.prev) {
      navigate('/mission');
      return;
    }

    navigate(-1);
  };

  return (
    <>
      {showModal && (
        <AlertModal onClose={() => closeModalHandler()}>
          <div className='flex flex-col font-hanaMedium text-2xl text-center'>
            <p>
              <span className='text-hanaGreen'>저축</span>에서 출금 시
            </p>
            <p>
              <span className='text-hanaRed'>연간 최저 금리</span>가 적용됩니다.
            </p>
          </div>
        </AlertModal>
      )}

      {showChoiceModal && (
        <ChoiceMenu
          title={`${clickedName}에서`}
          onClose={() => closeChoiceModalHandler()}
        >
          <div className='flex flex-row justify-center gap-5'>
            <MoneyBoxMoveItem
              receiveName={clickedName === '파킹' ? '소비' : '파킹'}
              onClick={moveHandler}
            />
            <MoneyBoxMoveItem
              receiveName={clickedName === '저축' ? '소비' : '저축'}
              onClick={moveHandler}
            />
          </div>
        </ChoiceMenu>
      )}
      <Topbar title='머니박스' onClick={() => onClickBack()} />
      {/* 출금 계좌번호 공간 */}
      <div className='flex flex-col bg-white p-8 font-hanaMedium mb-4'>
        <div className='flex justify-between'>
          <p className='text-2xl'>머니박스 계좌번호</p>
          <div
            className='flex flex-col w-24 h-12 text-center justify-center align-middle bg-hanaGreen text-white rounded-[10rem] cursor-pointer'
            onClick={() => moveHandler('파킹', true)}
          >
            채우기
          </div>
        </div>
        <p className='text-2xl text-gray-500'>000-000000-00000</p>
        <div className='bg-gray-400 h-1'></div>
        <div className='flex justify-between text-xl mt-4'>
          <p className='font-hanaRegular text-gray-500'>전체 잔액</p>
          <p>20,000원</p>
        </div>
        {/* <div className='flex justify-between text-xl mt-2'>
          <p className='font-hanaRegular text-gray-500'>출금 가능 잔액</p>
          <p className='font-hanaRegular'>10,000원</p>
        </div> */}
      </div>
      {/* 머니박스 아이템 공간 */}
      <div className='flex flex-col bg-white p-8 gap-y-4'>
        <MoneyBoxItem
          title='파킹'
          balance={5000}
          color1='9BDEDF'
          color2='5CB6B7'
          onClick={() => clickMove('파킹')}
        />
        <MoneyBoxItem
          title='소비'
          balance={5000}
          color1='FFB2B7'
          color2='F2777E'
          onClick={() => clickMove('소비')}
        />
        <MoneyBoxItem
          title='저축'
          balance={10000}
          color1='9CDAB8'
          color2='74BE96'
          onClick={() => clickMove('저축')}
          onClickQuestion={openModalHanlder}
          isLimit
        />
      </div>
    </>
  );
};
