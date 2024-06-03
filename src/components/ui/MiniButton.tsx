import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  step: number;
  text: string;
}
export const MiniButton: FC<IProps> = ({ step, text }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/mission${step}`);
  };

  return (
    <div
      className='bg-hanaGreen text-white text-xl font-hanaMedium px-6 py-3 rounded-3xl cursor-pointer'
      onClick={() => onClick()}
    >
      {text}
    </div>
  );
};
