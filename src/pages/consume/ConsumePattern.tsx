import { useState } from 'react';
import Topbar from '../../components/Topbar';
import { dateMonth, dateYear } from '../../utils/getDate';
import { RiPencilFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { CategoryItem } from '../../components/molecules/CategoryItem';
import { CategorySpendCard } from '../../components/organisms/CategorySpendCard';

export const ConsumePattern = () => {
  const datas = [
    { name: '교통', balance: 70000 },
    { name: '요식', balance: 20000 },
    { name: '납부', balance: 5000 },
    { name: '쇼핑', balance: 3000 },
    { name: '여유생활', balance: 3000 },
    { name: '사교생활', balance: 3000 },
    { name: '일상생활', balance: 3000 },
    { name: '해외', balance: 2000 },
    { name: '사교생활', balance: 2000 },
    { name: '일상생활', balance: 1000 },
    { name: '해외', balance: 1000 },
  ];

  const navigate = useNavigate();

  const [year, setYear] = useState<number>(dateYear);
  const [month, setMonth] = useState<number>(dateMonth);

  const onClickButton = () => {
    navigate('/consumeEdit');
  };

  const setYearFunc = (year: number) => {
    setYear(year);
  };

  const setMonthFunc = (month: number) => {
    setMonth(month);
  };

  return (
    <>
      <Topbar title='이번 달 소비' />
      <div className='flex flex-col gap-6'>
        {/* 지출 카드 영역 */}
        <div className='flex flex-col w-full mt-6 p-7 bg-white'>
          <p className='font-hanaRegular text-2xl mb-3'>{month}월 지출</p>
          <div className='flex flex-row mt-2 mb-3 items-center gap-2'>
            <p className='font-hanaHeavy text-5xl'>500,000원</p>
          </div>
        </div>
        {/* 예산 영역 */}
        <div className='flex flex-col w-full p-7 bg-white'>
          <div className='flex flex-row w-full justify-between'>
            <p className='flex items-center font-hanaBold text-3xl'>예산</p>
            <div className='flex flex-row gap-3 items-center'>
              <p className='font-hanaMedium text-3xl'>500,000원</p>
              <RiPencilFill
                size={20}
                color='545454'
                onClick={() => onClickButton()}
                className='cursor-pointer'
              />
            </div>
          </div>
          {/* 프로그래스바 */}
          <div className='flex flex-row h-8 w-full my-6'>
            <div className='bg-hanaGreen w-[22%] h-full rounded-l-lg'></div>
            <div className='bg-gray-200 w-[78%] h-full rounded-r-lg border-2 flex items-center'>
              <p className='ml-1 font-hanaMedium text-xl'>22%</p>
            </div>
          </div>
          <CategoryItem color='#28B2A5' name='지출' balance={100000} />
          <CategoryItem color='#B5B5B5' name='남은 예산' balance={400000} />
          <div
            className='flex w-full mt-7 h-14 justify-center items-center border font-hanaRegular text-2xl rounded-xl'
            onClick={() => onClickButton()}
          >
            카테고리별 예산 설정
          </div>
        </div>
        {/* 카테고리별 지출 영역 */}
        <CategorySpendCard
          datas={datas}
          year={year}
          month={month}
          balance={500000}
          setYearFunc={setYearFunc}
          setMonthFunc={setMonthFunc}
        />
      </div>
    </>
  );
};
