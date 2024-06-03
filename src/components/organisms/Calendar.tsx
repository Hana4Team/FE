import React, { FC } from 'react';
import { useCalender } from '../../hooks/calender';
import { addMonths, subMonths } from 'date-fns';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

const DAY_LIST = ['일', '월', '화', '수', '목', '금', '토'];

interface IProps {
  success: number;
  fail: number;
}

export const Calendar: FC<IProps> = ({ success, fail }) => {
  const calender = useCalender();

  const dateList = calender.weekCalendarList;
  const currentDate = calender.currentDate;

  return (
    <div className='flex flex-col justify-center items-center w-fit bg-white rounded-2xl border border-black p-4'>
      <div className='flex justify-center items-center font-hanaCM text-center text-xl border-b-2 w-full pb-2'>
        <div className='w-1/2 border-r-2'>
          저축성공!{' '}
          <span className='text-hanaDeepGreen font-hanaBold text-2xl'>
            {success}일
          </span>
        </div>
        <div className='w-1/2'>
          다음엔 꼭!ㅠ{' '}
          <span className='text-hanaDeepGreen font-hanaBold text-2xl'>
            {fail}일
          </span>
        </div>
      </div>
      <div className='flex justify-center items-center font-hanaBold text-2xl py-7'>
        <button
          onClick={() => {
            calender.setCurrentDate(subMonths(currentDate, 1));
          }}
        >
          <GoChevronLeft />
        </button>
        <div className='mx-6 text-2xl'>
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </div>
        <button
          onClick={() => {
            calender.setCurrentDate(addMonths(currentDate, 1));
          }}
        >
          <GoChevronRight />
        </button>
      </div>
      <div className='flex'>
        {DAY_LIST.map((day, index) => (
          <div key={index}>
            <div
              className={`flex justify-center items-center w-16 h-16 font-hanaMedium text-xl ${day === '일' ? 'text-red-600' : day === '토' ? 'text-blue-600' : 'text-black'}`}
            >
              {day}
            </div>
          </div>
        ))}
      </div>
      {dateList.map((item, index) => (
        <div key={index} className='flex '>
          {item.map((day, index) => (
            <div key={index} className='flex justify-center items-center'>
              <div className='flex justify-center items-center w-16 h-16 font-hanaMedium text-xl'>
                {day !== 0 ? day : ''}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
