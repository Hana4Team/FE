import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  step: number;
  text: string;
  userStep: number;
}
export const MiniButton: FC<IProps> = ({ step, text, userStep }) => {
  const navigate = useNavigate();

  const onClick = () => {
    step === userStep && navigate(`/mission${step}`);
  };

  return (
    <div
      className={`bg-hanaGreen text-white text-xl font-hanaMedium px-6 py-3 rounded-3xl ${step === userStep ? 'cursor-pointer' : 'opacity-35'}`}
      onClick={() => onClick()}
    >
      {text}
    </div>
  );
};
