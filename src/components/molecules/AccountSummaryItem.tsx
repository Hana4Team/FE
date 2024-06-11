import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  title: string;
  totalMoney: number;
  icons: string;
  link: string;
}

export const AccountSummaryItem: FC<IProps> = ({
  title,
  totalMoney,
  icons,
  link,
}: IProps) => {
  const navigate = useNavigate();

  const movePageHandler = () => {
    if (title === '머니박스 통장') navigate('/moneyBox');
    else if (title === '하나머니') return;
    else navigate(link);
  };

  return (
    <div
      className={`w-11/12 h-36 ${title === '하나머니' ? 'bg-[#28B2A5]' : 'bg-[#9CDAB8] cursor-pointer'} flex justify-between items-center p-8 rounded-[2rem]`}
      onClick={movePageHandler}
    >
      <div className='text-white flex flex-col justify-center gap-3'>
        <p className='font-hanaMedium text-2xl'>{title}</p>
        <p className='font-hanaHeavy text-4xl'>
          {totalMoney.toLocaleString('ko-KR')} 원
        </p>
      </div>
      <img src={icons} alt='icon' className='w-16' />
    </div>
  );
};
