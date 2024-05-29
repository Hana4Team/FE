import { FC } from 'react';

interface Iprops {
  text: string;
  onClick: () => void;
  isActive?: boolean;
}

export const Button: FC<Iprops> = ({ text, onClick, isActive }) => {
  const clickHandler = () => {
    if (isActive == null || isActive) {
      onClick();
    }
  };

  return (
    <div
      className={`flex justify-center h-[4rem] w-5/6 rounded-2xl text-white font-hanaBold text-2xl bg-hanaGreen ${isActive == null || isActive ? 'cursor-pointer' : 'opacity-35'}`}
      onClick={() => clickHandler()}
    >
      <div className='my-auto'>{text}</div>
    </div>
  );
};
