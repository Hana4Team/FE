import React, { FC, useMemo, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { ArcElement, Chart } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { CategoryItem } from '../molecules/CategoryItem';
import { dateMonth, dateYear } from '../../utils/getDate';

type DataType = {
  name: string;
  balance: number;
};

interface Iprops {
  datas: DataType[];
  year: number;
  month: number;
  balance: number;
  isMission?: boolean;
  setYearFunc?: (year: number) => void;
  setMonthFunc?: (month: number) => void;
}

export const CategorySpendCard: FC<Iprops> = ({
  datas,
  year,
  month,
  balance,
  isMission,
  setYearFunc,
  setMonthFunc,
}) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [text, setText] = useState<string>('전체보기');

  Chart.register(ArcElement);

  const extra = useMemo(() => {
    return datas.length <= 4
      ? null
      : datas.slice(5).reduce((acc, val) => acc + val.balance, 0);
  }, []);

  const colors = useMemo(() => {
    return ['#28B2A5', '#E90061', '#FFC700', '#AD9A5F', '#B5B5B5'];
  }, []);

  const data = {
    labels: [
      ...datas.slice(0, Math.min(datas.length, 4)).map((item) => item.name),
      '기타',
    ],
    datasets: [
      {
        data: [
          ...datas
            .slice(0, Math.min(datas.length, 4))
            .map((item) => item.balance),
          extra,
        ],
        borderWidth: 2,
        hoverBorderWidth: 3,
        backgroundColor: colors,
        fill: true,
      },
    ],
  };

  const onClickButton = () => {
    if (text === '전체보기') {
      setText('간단히보기');
    } else if (text === '간단히보기') {
      setText('전체보기');
    }

    setShowAll(!showAll);
  };

  const onClickArrow = (value: number) => {
    if (year === dateYear && month === dateMonth && value === 1) return;
    if (year === 2000 && month === 1 && value === -1) return;

    if (month + value == 0) {
      setMonthFunc!(12);
      setYearFunc!(year - 1);
    } else if (month + value == 13) {
      setMonthFunc!(1);
      setYearFunc!(year + 1);
    } else {
      setMonthFunc!(month + value);
    }
  };

  return (
    <div className='flex flex-col w-full p-8 bg-white gap-6'>
      <div className='flex flex-row justify-between'>
        <p className='font-hanaBold text-4xl'>카테고리별 지출</p>
        <p className='font-hanaMedium text-3xl'>
          총 {balance.toLocaleString()}원
        </p>
      </div>
      <div className='flex flex-row px-2 w-full h-12 bg-hanaGray justify-center items-center rounded-md'>
        {!isMission && (
          <IoIosArrowBack
            size={20}
            className={`${year === 2000 && month === 1 ? 'text-gray-400' : 'cursor-pointer'}`}
            onClick={() => onClickArrow(-1)}
          />
        )}
        <p className='w-full font-hanaBold text-2xl text-center'>
          {year}년 {month}월
        </p>
        {!isMission && (
          <IoIosArrowForward
            size={20}
            className={`my-auto ${year === dateYear && month === dateMonth ? 'text-gray-400' : 'cursor-pointer'}`}
            onClick={() => onClickArrow(1)}
          />
        )}
      </div>
      {/* 차트  */}
      <div className='flex flex-col w-full justify-center items-center'>
        {/* 차트 영역 */}
        <div className='z-10'>
          <Doughnut
            data={data}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: 'right',
                },
              },
            }}
            style={{
              position: 'relative',
              right: '0px',
            }}
            className='mb-6'
          />
        </div>
        {datas.slice(0, Math.min(datas.length, 4)).map((item, idx) => (
          <CategoryItem
            color={colors[idx]}
            name={item.name}
            balance={item.balance}
          />
        ))}
        {extra && (
          <>
            {!showAll && (
              <CategoryItem color={colors[4]} name='기타' balance={extra} />
            )}
            {showAll &&
              datas
                .slice(5)
                .map((item) => (
                  <CategoryItem
                    color={colors[4]}
                    name={item.name}
                    balance={item.balance}
                  />
                ))}
            <div
              className='flex w-full mt-4 h-14 justify-center items-center border font-hanaRegular text-2xl rounded-xl'
              onClick={() => onClickButton()}
            >
              {text}
            </div>
          </>
        )}
      </div>
    </div>
  );
};