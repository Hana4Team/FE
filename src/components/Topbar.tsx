import React, { FC } from 'react';
import { GoChevronLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

interface IProps {
  title: string;
  isModal?: boolean;
}

const Topbar: FC<IProps> = ({ title, isModal }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`sticky top-0 left-0 w-full flex justify-center items-center ${isModal ? 'bg-black bg-opacity-50' : 'bg-white'} pt-20 pb-4`}
    >
      <div
        className='absolute left-2 cursor-pointer'
        onClick={() => navigate(-1)}
      >
        <GoChevronLeft size={25} />
      </div>
      <div className='justify-center text-3xl font-hanaBold'>{title}</div>
    </div>
  );
};

export default Topbar;
