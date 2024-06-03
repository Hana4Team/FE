import Topbar from '../../components/Topbar';
import { MoneyBoxItem } from '../../components/molecules/MoneyBoxItem';
import { ChoiceMenu } from '../../components/ChoiceMenu';
import { useState } from 'react';
import { MoneyBoxMoveItem } from '../../components/molecules/MoneyBoxMoveItem';
import { useNavigate } from 'react-router-dom';

export const MoneyBox = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [clickedName, setClickedName] = useState<string>();

  const showModalHandler = () => setShowModal(!showModal);

  const clickMove = (name: string) => {
    setClickedName(name);
    setShowModal(!showModal);
  };

  const moveHandler = (receiveName: string, sendAccountNumber?: string) => {
    const sendAccount = sendAccountNumber ? sendAccountNumber : '';
    navigate('/sending', {
      state: {
        initialBalance: 1000000,
        sendName: clickedName,
        receiveName: receiveName,
        sendAccount: sendAccount,
        receiveAccount: '111-111-111111',
      },
    });
  };

  const navigate = useNavigate();

  return (
    <>
      {showModal && (
        <ChoiceMenu
          title={`${clickedName}에서`}
          onClose={() => showModalHandler()}
        >
          <div className='flex flex-row justify-center gap-5'>
            <MoneyBoxMoveItem
              color={clickedName == '파킹' ? 'FFB2B7' : '9BDEDF'}
              text={clickedName == '파킹' ? '소비' : '파킹'}
              imageSrc={
                clickedName == '파킹' ? 'icons/wallet.svg' : 'icons/safebox.svg'
              }
              onClick={() => {
                clickedName == '파킹'
                  ? moveHandler('소비', '111-111-111111')
                  : moveHandler('파킹', '111-111-111111');
              }}
            />
            <MoneyBoxMoveItem
              color='9CDAB8'
              text='저축'
              imageSrc='icons/piggybank2.svg'
              onClick={() => moveHandler('저축', '111-111-111111')}
            />
          </div>
        </ChoiceMenu>
      )}
      <Topbar title='머니박스' />
      {/* 출금 계좌번호 공간 */}
      <div className='flex flex-col bg-white p-8 font-hanaMedium mb-4'>
        <div className='flex justify-between'>
          <p className='text-2xl'>출금계좌번호</p>
          <div
            className='flex flex-col w-24 h-12 text-center justify-center align-middle bg-hanaGreen text-white rounded-[10rem] cursor-pointer'
            onClick={() => moveHandler('파킹')}
          >
            이체
          </div>
        </div>
        <p className='text-2xl text-gray-500'>000-000000-00000</p>
        <div className='bg-gray-400 h-1'></div>
        <div className='flex justify-between text-xl mt-4'>
          <p className='font-hanaRegular text-gray-500'>전체 잔액</p>
          <p>20,000원</p>
        </div>
        <div className='flex justify-between text-xl mt-2'>
          <p className='font-hanaRegular text-gray-500'>출금 가능 잔액</p>
          <p className='font-hanaRegular'>10,000원</p>
        </div>
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
          isLimit
        />
      </div>
    </>
  );
};
