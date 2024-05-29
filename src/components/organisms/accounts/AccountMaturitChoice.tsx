import { FC, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { ChoiceMenu } from '../../ChoiceMenu';
import { ChoiceItem } from '../../molecules/ChoiceItem';

export const AccountMaturitChoice: FC = () => {
  const [showChoiceTerminationModal, setShowChoiceTerminationModal] =
    useState<boolean>(false);
  const [showChoiceAlarmModal, setShowChoiceAlarmModal] =
    useState<boolean>(false);
  const [termination, setTermination] = useState<string>('자동 해지');
  const [alarm, setAlarm] = useState<string>('카카오 알림톡');

  const choiceTermination = (name: string) => {
    setTermination(name);
    setShowChoiceTerminationModal(false);
  };

  const choiceAlarm = (name: string) => {
    setAlarm(name);
    setShowChoiceAlarmModal(false);
  };
  return (
    <>
      {showChoiceTerminationModal && (
        <ChoiceMenu
          title='만기설정'
          onClose={() => {
            setShowChoiceTerminationModal(!showChoiceTerminationModal);
          }}
        >
          <div className='flex flex-col justify-center gap-5'>
            <ChoiceItem
              name='자동 해지'
              onClick={() => choiceTermination('자동 해지')}
            />
            <ChoiceItem
              name='직접 해지'
              onClick={() => choiceTermination('직접 해지')}
            />
            <ChoiceItem
              name='자동재예치'
              onClick={() => choiceTermination('자동재예치')}
            />
          </div>
        </ChoiceMenu>
      )}
      {showChoiceAlarmModal && (
        <ChoiceMenu
          title='만기 안내방법 선택'
          onClose={() => {
            setShowChoiceAlarmModal(!showChoiceAlarmModal);
          }}
        >
          <div className='flex flex-col justify-center gap-5'>
            <ChoiceItem
              name='카카오 알림톡'
              onClick={() => choiceAlarm('카카오 알림톡')}
            />
            <ChoiceItem
              name='받지 않음'
              onClick={() => choiceAlarm('받지 않음')}
            />
          </div>
        </ChoiceMenu>
      )}

      <div>
        <div
          className='flex items-center font-hanaMedium text-[1.8rem] gap-4 mb-5'
          onClick={() => {
            setShowChoiceTerminationModal(!showChoiceTerminationModal);
          }}
        >
          <p className='w-40 flex justify-between items-center px-1 pt-1 pb-2 border-b-[0.1rem] border-black cursor-pointer text-hanaGreen font-hanaBold text-2xl'>
            {termination}
            <IoIosArrowDown color='#545454' size={15} />
          </p>
          하기
        </div>
        <span className='font-hanaMedium text-[#838383] text-lg'>
          만기 안내 받기
        </span>
        <p
          className='w-full flex justify-between items-center px-1 pt-1 pb-2 border-b-[0.1rem] border-black cursor-pointer text-hanaGreen font-hanaBold text-2xl mt-1'
          onClick={() => {
            setShowChoiceAlarmModal(!showChoiceAlarmModal);
          }}
        >
          {alarm}
          <IoIosArrowDown color='#545454' size={15} />
        </p>
      </div>
    </>
  );
};
