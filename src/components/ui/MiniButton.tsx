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
    if (step === 1 && userStep === 1 && userStepStatus === 0) {
      missionStart();
    } else if (step === 2 && userStep === 2 && userStepStatus !== 0) {
      navigate('/moneyBox');
      return;
    } else if (step === 3 && userStep === 3 && userStepStatus !== 0) {
      navigate('/savings100Days');
      return;
    } else if (step === 4 && userStep === 4 && userStepStatus !== 0) {
      navigate('/roadmap4');
      return;
    } else if (step === 5 && userStep === 5 && userStepStatus !== 0) {
      navigate('/roadmap5');
      return;
    }

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
