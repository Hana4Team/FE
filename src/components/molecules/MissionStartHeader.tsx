import { FC } from 'react';

interface IProps {
  icon: string;
  title: string;
}

export const MissionStartHeader: FC<IProps> = ({ icon, title }) => {
  return (
    <div className='w-11/12 mt-8 flex items-center gap-5 m-auto mb-8'>
      <img src={icon} alt='icon' className='w-16 mb-3' />
      <p className='font-hanaMedium text-3xl whitespace-pre-line leading-snug'>
        {title}
      </p>
    </div>
  );
};
