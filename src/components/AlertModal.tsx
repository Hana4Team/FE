import React, { FC, ReactNode } from 'react';
import { IoMdClose } from 'react-icons/io';

interface Iprops {
  children: ReactNode;
  onClose: () => void;
}

export const AlertModal: FC<Iprops> = ({ children, onClose }) => {
  return (
    <>
      <div
        className='absolute left-0 top-0 flex flex-col justify-center items-center w-full h-full bg-black bg-opacity-50 z-10'
        onClick={() => onClose()}
      ></div>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center rounded-2xl gap-4 bg-white z-20 min-w-[80%]'>
        <div className='w-full flex justify-end p-4' onClick={() => onClose()}>
          <IoMdClose size={15} />
        </div>
        <div className='px-8 py-6'>{children}</div>

        <button
          className='p-2 w-full rounded-b-xl text-white bg-hanaGreen font-hanaMedium text-xl'
          onClick={() => onClose()}
        >
          확인
        </button>
      </div>
    </>
  );
};
