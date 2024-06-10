import { useMutation } from '@tanstack/react-query';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiClient } from '../../apis/apiClient';

interface IProps {
  step: number;
  text: string;
  userStep: number;
  userStepStatus: number;
}
export const MiniButton: FC<IProps> = ({
  step,
  text,
  userStep,
  userStepStatus,
}) => {
  const navigate = useNavigate();

  const { mutate: missionStart } = useMutation({
    mutationKey: ['missionStart'],
    mutationFn: () => {
      const res = ApiClient.getInstance().updateMissionStart();
      return res;
    },
  });

  const onClick = () => {
    userStepStatus == 0 && missionStart();
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
