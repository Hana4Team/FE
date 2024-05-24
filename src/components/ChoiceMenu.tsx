import React, { FC, ReactNode, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

interface IProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export const ChoiceMenu: FC<IProps> = ({ title, children, onClose }) => {
  return (
    <>
      <div
        className='fixed flex flex-col items-center justify-center bg-black bg-opacity-50 w-[500px] h-full z-10'
        onClick={onClose}
      ></div>
      <div className='absolute z-20 bottom-0 bg-white w-full h-auto pt-3 pb-10 border border-none rounded-t-[3rem]'>
        <div className='flex h-20 items-center px-7'>
          <p className='font-hanaRegular text-[1.8rem] w-full text-center ml-10'>
            {title}
          </p>
          <IoCloseOutline
            size={28}
            className='cursor-pointer'
            onClick={onClose}
          />
        </div>
        <hr className='mt-0.5 divide-hanaGray' />
        <div className='px-7 mt-7 h-full'>{children}</div>
      </div>
    </>
  );
};
