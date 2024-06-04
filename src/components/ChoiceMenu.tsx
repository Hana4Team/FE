import React, { FC, ReactNode } from 'react';
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
        className='absolute flex flex-col items-center justify-center bg-black bg-opacity-50 w-full h-full z-[60] top-0 left-0'
        onClick={onClose}
      ></div>
      <div className='absolute z-[60] bottom-0 left-0 bg-white w-full h-auto pt-3 pb-10 border border-none rounded-t-[3rem]'>
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
        <div className='px-7 mt-7 max-h-[30rem] overflow-y-auto'>
          {children}
        </div>
      </div>
    </>
  );
};
