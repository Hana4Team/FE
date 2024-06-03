import { FC, ReactNode } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { Button } from './ui/Button';
import { getCookie, setCookie } from '../utils/cookie';

interface IProps {
  balance: string;
  sendName: string;
  receiveName: string;
  sendAccount: string;
  receiveAccount: string;
  onClose: () => void;
  onButton: () => void;
}

export const SendingModal: FC<IProps> = ({
  balance,
  sendName,
  receiveName,
  sendAccount,
  receiveAccount,
  onClose,
  onButton,
}) => {
  return (
    <>
      <div
        className='fixed flex flex-col items-center justify-center bg-black bg-opacity-50 w-[500px] h-full z-10'
        onClick={onClose}
      ></div>
      <div className='absolute z-20 bottom-0 bg-white w-full h-auto pb-10 rounded-t-[3rem]'>
        <div className='flex flex-row w-full h-20 justify-end items-end px-7'>
          <IoCloseOutline
            size={28}
            className='cursor-pointer'
            onClick={onClose}
          />
        </div>
        <div className='flex flex-col px-10 mt-2 h-full justify-between'>
          <div className='flex flex-col justify-center items-center'>
            <p className='font-hanaMedium text-center text-4xl mb-16'>
              {receiveName}통장으로 <br />
              {balance}원을 보냅니다.
            </p>
            <div className='flex flex-row justify-between w-full mb-2 px-3 text-2xl font-hanaRegular text-gray-400'>
              <p>받는분</p>
              <p className='flex flex-row'>
                하나 {receiveAccount}
                <span className='text-black whitespace-pre'>
                  {' '}
                  {receiveName}
                </span>
              </p>
            </div>
            <div className='flex flex-row justify-between w-full mb-10 px-3 text-2xl font-hanaRegular text-gray-400'>
              <p>보내는분</p>
              <p className='flex flex-row'>
                하나 {sendAccount}
                <span className='text-black whitespace-pre'>
                  {' '}
                  {sendName != '' ? sendName : getCookie('name')}
                </span>
              </p>
            </div>
            <Button text='완료' onClick={() => onButton()} />
          </div>
        </div>
      </div>
    </>
  );
};
