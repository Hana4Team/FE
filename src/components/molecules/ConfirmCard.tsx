import { FC } from 'react';
import { FaCheck } from 'react-icons/fa';

interface Iprops {
  text: string;
}

export const ConfirmCard: FC<Iprops> = ({ text }) => {
  return (
    <div className='flex flex-col mt-36 justify-center items-center'>
      <div className='flex justify-center w-44 h-44 items-center rounded-full bg-hanaGreen'>
        <FaCheck size='5.5rem' color='#FFFFFF' />
      </div>
      <p className='mt-8 font-hanaBold text-3xl text-center whitespace-pre-line'>
        {text}
      </p>
    </div>
  );
};
