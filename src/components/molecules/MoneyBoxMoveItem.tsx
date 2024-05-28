import { FC } from 'react';

interface Iprops {
  text: string;
  color: string;
  imageSrc: string;
  onClick: (receiveName: string, receiveAccount?: string) => void;
}

export const MoneyBoxMoveItem: FC<Iprops> = ({
  text,
  color,
  imageSrc,
  onClick,
}) => {
  return (
    <div
      className={`flex flex-col justify-center items-center w-2/5 h-52 bg-[#${color}] rounded-2xl text-2xl font-hanaRegular cursor-pointer`}
      onClick={() => onClick(text, '111-111-111111')}
    >
      <p>
        <span className='font-hanaMedium'>{text}</span>
        {text == '소비' ? '로' : '으로'}
      </p>
      이동
      <img
        src={imageSrc}
        alt='piggybank2'
        className='w-[4.5rem] h-[4.5rem] mt-2'
      />
    </div>
  );
};
