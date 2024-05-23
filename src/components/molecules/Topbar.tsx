import React, { FC } from 'react';
import { GoChevronLeft } from 'react-icons/go';

interface Irops {
  title: string;
}
const Topbar: FC<Irops> = ({ title }) => {
  return (
    <div className='sticky top-0 left-0 w-full flex justify-center items-center bg-white pt-20 pb-4'>
      <div className='absolute left-2'>
        <GoChevronLeft size={25} />
      </div>
      <div className='justify-center text-3xl font-hanaBold'>{title}</div>
    </div>
  );
};

export default Topbar;
