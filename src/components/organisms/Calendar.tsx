import React, { FC, useState } from 'react';
import { useCalender } from '../../hooks/calender';
import { addMonths, getDaysInMonth, subMonths } from 'date-fns';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { toLocale } from '../../utils/dateTimeformat';

const DAY_LIST = ['일', '월', '화', '수', '목', '금', '토'];

interface IProps {
  accountId: number;
  startDate: string;
  endDate: string;
  success: number;
  fail: number;
}

export const Calendar: FC<IProps> = ({
  accountId,
  startDate,
  endDate,
  success,
  fail,
}) => {
  const calender = useCalender();
  const today = new Date();
  const successList: number[] = [];
  const failList: number[] = [];

  const dateList = calender.weekCalendarList;
  const currentDate = calender.currentDate;

  const { data: transactionList, isSuccess } = useQuery({
    queryKey: [
      'saving100',
      accountId,
      calender.currentDate.getFullYear(),
      calender.currentDate.getMonth() + 1,
    ],
    queryFn: () => {
      const res = ApiClient.getInstance().getTransactionHistory(
        accountId,
        calender.currentDate.getFullYear(),
        calender.currentDate.getMonth() + 1
      );
      return res;
    },
  });

  if (isSuccess) {
    transactionList.transactionList.map((x) => {
      successList.push(new Date(x.dateTime).getDate());
    });

    if (currentDate.getMonth() === new Date(startDate).getMonth()) {
      if (currentDate.getMonth() === today.getMonth()) {
        for (
          let i = new Date(startDate).getDate();
          i <= today.getDate();
          i += 1
        ) {
          !successList.includes(i) && failList.push(i);
        }
      } else {
        for (
          let i = new Date(startDate).getDate();
          i <= getDaysInMonth(currentDate);
          i += 1
        ) {
          !successList.includes(i) && failList.push(i);
        }
      }
    } else if (currentDate.getMonth() === new Date(endDate).getMonth()) {
      if (currentDate.getMonth() === today.getMonth()) {
        for (let i = 1; i <= new Date(endDate).getDate(); i += 1) {
          !successList.includes(i) && failList.push(i);
        }
      } else {
        for (
          let i = new Date(startDate).getDate();
          i <= getDaysInMonth(currentDate);
          i += 1
        ) {
          !successList.includes(i) && failList.push(i);
        }
      }
    } else {
      if (currentDate.getMonth() === today.getMonth()) {
        for (let i = 1; i <= today.getDate(); i += 1) {
          !successList.includes(i) && failList.push(i);
        }
      } else {
        for (let i = 1; i <= getDaysInMonth(currentDate); i += 1) {
          !successList.includes(i) && failList.push(i);
        }
      }
    }
  }

  return (
    <>
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
          {subMonths(currentDate, 1) > new Date(startDate) ? (
            <button
              onClick={() => {
                calender.setCurrentDate(subMonths(currentDate, 1));
              }}
            >
              <GoChevronLeft />
            </button>
          ) : (
            <GoChevronLeft color={'#ffffff'} />
          )}
          <div className='mx-6 text-2xl'>
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
          </div>
          {addMonths(currentDate, 1) < today ? (
            <button
              onClick={() => {
                calender.setCurrentDate(addMonths(currentDate, 1));
              }}
            >
              <GoChevronRight />
            </button>
          ) : (
            <GoChevronRight color={'#ffffff'} />
          )}
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
                  {day === 0 ? (
                    ''
                  ) : successList.includes(day) ? (
                    <img src='images/happy.svg' className='w-12' />
                  ) : failList.includes(day) ? (
                    <img src='images/sad.svg' className='w-12' />
                  ) : (
                    day
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
