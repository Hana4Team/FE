import { FC, useEffect, useState } from 'react';
import { Alarm } from '../molecules/Alarm';

interface IProps {
  message: string;
  showAlarm: boolean;
  onClickShowAlarm: (status: boolean) => void;
}

export const AlarmAnimation: FC<IProps> = ({
  message,
  showAlarm,
  onClickShowAlarm,
}) => {
  const [activeAnimation, setActiveAnimation] = useState<boolean>(true);

  useEffect(() => {
    let timer;
    if (activeAnimation) {
      timer = setTimeout(() => {
        setActiveAnimation(false);
      }, 5000);
    } else {
      timer = setTimeout(() => {
        onClickShowAlarm(false);
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showAlarm]);

  return (
    <div
      className={`fixed max-w-[500px] w-full z-[60] ${activeAnimation ? 'animate-slidedown' : 'animate-slideup'}`}
    >
      <Alarm contents={message} createdAt={new Date()} isAlarm={true} />
    </div>
  );
};
