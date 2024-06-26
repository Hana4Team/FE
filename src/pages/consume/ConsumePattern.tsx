import { useEffect, useState } from 'react';
import Topbar from '../../components/Topbar';
import { dateMonth, dateYear } from '../../utils/getDate';
import { RiPencilFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { CategoryItem } from '../../components/molecules/CategoryItem';
import { CategorySpendCard } from '../../components/organisms/CategorySpendCard';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { SpendType } from '../../types/spend';

const Category = {
  SHOPPING: '쇼핑',
  FOOD: '요식',
  TRAFFIC: '교통',
  HOSPITAL: '의료',
  FEE: '납부',
  EDUCATION: '교육',
  LEISURE: '여유생활',
  SOCIETY: '사교활동',
  DAILY: '일상생활',
  OVERSEAS: '해외',
} as const;

export const ConsumePattern = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [year, setYear] = useState<number>(dateYear);
  const [month, setMonth] = useState<number>(dateMonth);
  const [spend, setSpend] = useState<number>(0);
  const [budget, setBudget] = useState<number>(0);
  const [percent, setPercent] = useState<number>(0);

  const spendQuery = useQuery({
    queryKey: ['category', year, month],
    queryFn: () => {
      const res = ApiClient.getInstance().getSpendList(year, month);
      return res;
    },
    staleTime: 100,
  });

  const budgetQuery = useQuery({
    queryKey: ['budget'],
    queryFn: () => {
      const res = ApiClient.getInstance().getTotalBudget();
      return res;
    },
    staleTime: 100,
  });

  const [datas, setDatas] = useState<SpendType[]>([]);

  useEffect(() => {
    if (spendQuery.data) {
      setDatas(
        spendQuery.data.spendFindByTypeResList
          .map((item) => {
            return {
              type: Category[item.type as keyof typeof Category],
              amount: item.amount,
            };
          })
          .filter((item) => item.amount > 0)
      );
    }
  }, [spendQuery.data]);

  useEffect(() => {
    try {
      ApiClient.getInstance()
        .getSpendList(dateYear, dateMonth)
        .then((res) => {
          setSpend(res.sum);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (budgetQuery.data) {
      setBudget(budgetQuery.data.sum);
    }
  }, [budgetQuery.data]);

  useEffect(() => {
    if (spendQuery.data?.sum && budgetQuery.data?.sum)
      setPercent(
        Math.min(
          100,
          Math.round((spendQuery.data.sum / budgetQuery.data.sum) * 100)
        )
      );
  }, [budgetQuery.data, spendQuery.data]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['budget'] });
  }, []);

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
          <p className='font-hanaRegular text-2xl mb-3'>{dateMonth}월 지출</p>
          <div className='flex flex-row mt-2 mb-3 items-center gap-2'>
            <p className='font-hanaHeavy text-5xl'>
              {spend.toLocaleString()}원
            </p>
          </div>
        </div>
        {/* 예산 영역 */}
        <div className='flex flex-col w-full p-7 bg-white'>
          <div className='flex flex-row w-full justify-between'>
            <p className='flex items-center font-hanaBold text-3xl'>예산</p>
            <div className='flex flex-row gap-3 items-center'>
              <p className='font-hanaMedium text-3xl'>
                {budgetQuery.data?.sum.toLocaleString()}원
              </p>
              <RiPencilFill
                size={20}
                color='545454'
                onClick={() => onClickButton()}
                className='cursor-pointer'
              />
            </div>
          </div>
          {/* 프로그래스바 */}
          {!budgetQuery.isLoading && !spendQuery.isLoading && (
            <div className='flex flex-row h-8 w-full my-6'>
              <div
                className={`${percent >= 90 ? 'bg-hanaRed rounded-r-lg' : 'bg-hanaGreen'} rounded-l-lg h-full flex items-center justify-end text-end`}
                style={{ width: `${percent}%` }}
              >
                {percent > 75 && (
                  <p className='mr-1 font-hanaMedium text-xl text-white'>
                    {percent}%
                  </p>
                )}
              </div>
              <div
                className={`${percent !== 100 && 'rounded-r-lg'} bg-gray-200 h-full border-2 flex items-center`}
                style={{ width: `${100 - percent}%` }}
              >
                {percent <= 75 && (
                  <p className='ml-1 font-hanaMedium text-xl'>{percent}%</p>
                )}
              </div>
            </div>
          )}
          <CategoryItem
            color={`${percent >= 90 ? '#E90061' : '#28B2A5'}`}
            name='지출'
            balance={spend}
          />
          <CategoryItem
            color='#B5B5B5'
            name='남은 예산'
            balance={budget - spend}
          />
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
          balance={datas.reduce((acc, data) => acc + data.amount, 0)}
          setYearFunc={setYearFunc}
          setMonthFunc={setMonthFunc}
        />
      </div>
    </>
  );
};
