import { FC, ReactNode } from 'react';

interface IProps {
  id: number;
  title: string;
  icon: string;
  children: ReactNode;
}

export const MoneyBoxIntroItem: FC<IProps> = ({
  id,
  title,
  icon,
  children,
}) => {
  return (
    <div
      className={`w-11/12 bg-white py-7 px-10 rounded-3xl m-auto flex items-center gap-10 animate-fadein`}
    >
      <img src={`icons/${icon}`} alt='icon' className='w-20' />
      <div className='flex flex-col justify-center'>
        <h1 className='font-hanaBold text-[2.7rem]'>{title}</h1>
        {children}
      </div>
    </div>
  );
};
