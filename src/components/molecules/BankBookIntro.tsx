import { FC } from 'react';
import { BsArrowRightCircleFill } from 'react-icons/bs';

interface IProps {
  subTitle: string;
  title: string;
  content1: string;
  content2: string;
  content3: string;
  className?: string;
  onClick: () => void;
}

export const BankBookIntro: FC<IProps> = ({
  subTitle,
  title,
  content1,
  content2,
  content3,
  className,
  onClick,
}) => {
  return (
    <div
      className={`w-11/12 bg-white py-10 px-10 rounded-3xl m-auto flex flex-col justify-center ${className}`}
    >
      <p className='font-hanaRegular text-2xl'>{subTitle}</p>
      <h1 className='font-hanaBold text-[2.7rem]'>{title}</h1>
      <div className='flex justify-between'>
        <div className='flex flex-col justify-between items-start'>
          <BsArrowRightCircleFill
            color={'#D9D9D9'}
            size={24}
            onClick={onClick}
            className='mb-16 mt-1 cursor-pointer'
          />
          <div className='font-hanaRegular text-2xl  whitespace-pre-line'>
            <p className='font-hanaBold text-[#008485]'>{content1}</p>
            {content2}
            <p className='text-[#666666] text-xl'>{content3}</p>
          </div>
        </div>
        <img src='/public/images/별돌이2.svg' alt='별돌이' className='h-64' />
      </div>
    </div>
  );
};
