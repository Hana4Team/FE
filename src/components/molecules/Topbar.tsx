import React, { FC } from 'react';
import { GoChevronLeft } from 'react-icons/go';

interface IProps {
  title: string;
  isModal?: boolean;
}
const Topbar: FC<Irops> = ({ title, isModal }) => {
  return (
    <div
      className={`sticky top-0 left-0 w-full flex justify-center items-center ${isModal ? 'bg-black bg-opacity-50' : 'bg-white'} pt-20 pb-4`}
    >
      <div className='absolute left-2'>
        <GoChevronLeft size={25} />
      </div>
      <div className='justify-center text-3xl font-hanaBold'>{title}</div>
    </div>
  );
};

export default Topbar;
