import React, { FC, useState } from 'react';
import { MiniButton } from '../ui/MiniButton';
import { AlertModal } from '../AlertModal';
import { GoQuestion } from 'react-icons/go';
import { IntroduceStep } from './IntroduceStep';

interface IProps {
  step: number;
  title: string;
  text: string;
  status: string;
}

export const MissionStep: FC<IProps> = ({ step, title, text, status }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const showModalHandler = () => setShowModal(!showModal);

  return (
    <div className='w-full'>
      {showModal && (
        <AlertModal
          onClose={showModalHandler}
          children={<IntroduceStep step={step - 1} />}
        />
      )}
      <div className='relative bg-white w-full flex items-center justify-between p-5 rounded-2xl'>
        <div className='font-hanaMedium text-xl'>
          <div className='flex gap-4 text-2xl'>
            <div>Step {step}</div>
            <div className='font-hanaBold'>{title}</div>
            <button onClick={showModalHandler}>
              <GoQuestion />
            </button>
          </div>
          <div className='mt-2 text-gray-600'>{text}</div>
        </div>
        <MiniButton step={step} text={status} />
        {/* <div className='absolute left-0 top-0 w-full h-full '>
          <div className='absolute top-1/4 left-1/3 -rotate-12 z-10 font-hanaHeavy text-hanaRed text-5xl'>
            미션 성공
          </div>
          <div className='absolute bg-white opacity-50 w-full h-full  rounded-2xl text-black'></div>
        </div> */}
      </div>
    </div>
  );
};
