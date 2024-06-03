import { getDay, getDaysInMonth, startOfMonth } from 'date-fns';
import { Dispatch, SetStateAction, useState } from 'react';

const DATE_MONTH_FIXER = 1;
const CALENDER_LENGTH = 42;
const DEFAULT_TRASH_VALUE = 0;
const DAY_OF_WEEK = 7;

interface ReturnProps {
  weekCalendarList: number[][];
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
}

export const useCalender = (): ReturnProps => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const totalMonthDays = getDaysInMonth(currentDate);
  const startDay = getDay(startOfMonth(currentDate));

  const prevDayList = Array.from({ length: startDay }).map(
    () => DEFAULT_TRASH_VALUE
  );

  const currentDayList = Array.from({ length: totalMonthDays }).map(
    (_, i) => i + 1
  );
  const nextDayList = Array.from({
    length: CALENDER_LENGTH - currentDayList.length - prevDayList.length,
  }).map(() => DEFAULT_TRASH_VALUE);

  const currentCalendarList = prevDayList.concat(currentDayList, nextDayList);

  let weekCalendarList = currentCalendarList.reduce(
    (acc: number[][], cur, idx) => {
      const chunkIndex = Math.floor(idx / DAY_OF_WEEK);
      if (!acc[chunkIndex]) {
        acc[chunkIndex] = [];
      }
      acc[chunkIndex].push(cur);
      return acc;
    },
    [] as number[][]
  );

  let isDay = false;
  for (let day of weekCalendarList[5]) {
    if (day !== 0) {
      isDay = true;
    }
  }
  if (isDay === false) weekCalendarList.pop();

  return {
    weekCalendarList,
    currentDate,
    setCurrentDate,
  };
};
