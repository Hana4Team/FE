import { FC } from 'react';

interface Iprops {
  text: string;
  onClick: () => void;
}

export const Button: FC<Iprops> = ({ text, onClick }) => {
  return (
    <div
      className='flex justify-center h-[4rem] w-5/6 rounded-2xl bg-hanaGreen text-white font-hanaBold text-2xl cursor-pointer'
      onClick={() => {
        onClick();
      }}
    >
      <div className='my-auto'>{text}</div>
    </div>
  );
};
