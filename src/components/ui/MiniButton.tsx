import React, { FC } from 'react';

interface IProps {
  text: string;
}
export const MiniButton: FC<IProps> = ({ text }) => {
  return (
    <div className='bg-hanaGreen text-white text-xl font-hanaMedium px-6 py-3 rounded-3xl'>
      {text}
    </div>
  );
};
