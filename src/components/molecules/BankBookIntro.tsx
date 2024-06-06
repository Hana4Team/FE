import { FC } from 'react';
import { BsArrowRightCircleFill } from 'react-icons/bs';

interface IProps {
  type: '머니박스' | '100일 적금' | '예금';
  name: string;
  title: string;
  minInterest: number;
  maxInterest: number;
  content: string;
  className?: string;
  onClick: () => void;
}

export const BankBookIntro: FC<IProps> = ({
  type,
  name,
  title,
  maxInterest,
  minInterest,
  content,
  className,
  onClick,
}) => {
  return (
    <div
      className={`w-11/12 bg-white py-10 px-10 rounded-3xl m-auto flex flex-col justify-center ${className}`}
      onClick={() => onClick()}
    >
      <p className='font-hanaRegular text-2xl'>{title}</p>
      <h1 className='font-hanaBold text-[2.7rem]'>{name}</h1>
      <div className='flex justify-between'>
        <div className='flex flex-col justify-between items-start'>
          <BsArrowRightCircleFill
            color={'#D9D9D9'}
            size={24}
            className='mb-16 mt-1 cursor-pointer'
          />
          <div className='flex flex-col justify-center gap-1 font-hanaRegular text-xl whitespace-pre-line'>
            <p className='font-hanaBold text-[#008485] text-2xl'>
              {type === '머니박스' ? '저축 ' : '최고 '}
              {type !== '100일 적금' && '연 '}
              {maxInterest.toFixed(2)}%
            </p>
            {type === '머니박스' ? '파킹 ' : '기본 '}
            {minInterest.toFixed(2)}%
            <p className='text-[#666666] text-lg'>{content}</p>
          </div>
        </div>
        <img src='/public/images/별돌이2.svg' alt='별돌이' className='h-64' />
      </div>
    </div>
  );
};
