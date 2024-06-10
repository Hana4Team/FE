import { useEffect, useState } from 'react';
import Topbar from '../../components/Topbar';
import { BudgetInfo } from '../../components/organisms/BudgetInfo';
import { dateMonth, dateYear } from '../../utils/getDate';
import { CategoryEditItem } from '../../components/molecules/CategoryEditItem';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { BudgetReqType } from '../../types/budget';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';

type BudgetEditType = {
  icon: string;
  name: string;
  lastSpend: number;
  balance: number;
};

const CategoryConvert = {
  쇼핑: 'shopping',
  요식: 'food',
  교통: 'traffic',
  의료: 'hospital',
  납부: 'fee',
  교육: 'education',
  여유생활: 'leisure',
  사교활동: 'society',
  일상생활: 'daily',
  해외: 'overseas',
} as const;

export const ConsumeEdit = () => {
  const navigate = useNavigate();

  const { data: spendData, isSuccess: successSpend } = useQuery({
    queryKey: ['spend3'],
    queryFn: () => {
      let lastYear = dateYear;
      let lastMonth = dateMonth - 1;
      if (lastMonth == 0) {
        lastMonth = 12;
        lastYear--;
      }
      const res = ApiClient.getInstance().getSpendList(lastYear, lastMonth);
      return res;
    },
  });

  const { data: budgetData, isSuccess: successBudget } = useQuery({
    queryKey: ['budget2'],
    queryFn: () => {
      const res = ApiClient.getInstance().getCategoryBudget();
      return res;
    },
  });

  const { mutate: setBudget } = useMutation({
    mutationKey: ['setBudget'],
    mutationFn: () => {
      const res = ApiClient.getInstance().updateCategoryBudget(data);
      return res;
    },
  });

  const [initData, setInitData] = useState<BudgetEditType[]>([
    {
      icon: 'icons/shopping.svg',
      name: '쇼핑',
      lastSpend: 0,
      balance: 0,
    },
    {
      icon: 'icons/food.svg',
      name: '요식',
      lastSpend: 0,
      balance: 0,
    },
    {
      icon: 'icons/traffic.svg',
      name: '교통',
      lastSpend: 0,
      balance: 0,
    },
    {
      icon: 'icons/hospital.svg',
      name: '의료',
      lastSpend: 0,
      balance: 0,
    },
    {
      icon: 'icons/fee.svg',
      name: '납부',
      lastSpend: 0,
      balance: 0,
    },
    {
      icon: 'icons/education.svg',
      name: '교육',
      lastSpend: 0,
      balance: 0,
    },
    {
      icon: 'icons/leisure.svg',
      name: '여유생활',
      lastSpend: 0,
      balance: 0,
    },
    {
      icon: 'icons/society.svg',
      name: '사교활동',
      lastSpend: 0,
      balance: 0,
    },
    {
      icon: 'icons/daily.svg',
      name: '일상생활',
      lastSpend: 0,
      balance: 0,
    },
    {
      icon: 'icons/overseas.svg',
      name: '해외',
      lastSpend: 0,
      balance: 0,
    },
  ]);

  const [data, setData] = useState<BudgetReqType>({
    shopping: initData[0].balance,
    food: initData[1].balance,
    traffic: initData[2].balance,
    hospital: initData[3].balance,
    fee: initData[4].balance,
    education: initData[5].balance,
    leisure: initData[6].balance,
    society: initData[7].balance,
    daily: initData[8].balance,
    overseas: initData[9].balance,
  });

  const [sum, setSum] = useState<number>(
    Object.values(data).reduce((acc, val) => acc + val)
  );

  const updateValue = (name: string, value: number) => {
    setData((cur) => {
      let newData: any = { ...cur };
      newData[CategoryConvert[name as keyof typeof CategoryConvert]] = value;
      return newData;
    });
    setSum(Object.values(data).reduce((acc, val) => acc + val));
  };

  const onClickButton = () => {
    setBudget();
    navigate('/consume');
  };

  useEffect(() => {
    setSum(Object.values(data).reduce((acc, val) => acc + val));
  }, [data]);

  useEffect(() => {
    if (successBudget) {
      setInitData([
        { ...initData[0], balance: budgetData.shopping },
        { ...initData[1], balance: budgetData.food },
        { ...initData[2], balance: budgetData.traffic },
        { ...initData[3], balance: budgetData.hospital },
        { ...initData[4], balance: budgetData.fee },
        { ...initData[5], balance: budgetData.education },
        { ...initData[6], balance: budgetData.leisure },
        { ...initData[7], balance: budgetData.society },
        { ...initData[8], balance: budgetData.daily },
        { ...initData[9], balance: budgetData.overseas },
      ]);
    }
  }, [successBudget]);

  useEffect(() => {
    if (successBudget) {
      setData({
        shopping: initData[0].balance,
        food: initData[1].balance,
        traffic: initData[2].balance,
        hospital: initData[3].balance,
        fee: initData[4].balance,
        education: initData[5].balance,
        leisure: initData[6].balance,
        society: initData[7].balance,
        daily: initData[8].balance,
        overseas: initData[9].balance,
      });
    }
  }, [initData]);

  useEffect(() => {
    if (successSpend) {
      let tmp = new Array(10);
      spendData.spendFindByTypeResList.forEach((data) => {
        switch (data.type) {
          case 'SHOPPING':
            tmp[0] = data.amount;
            break;
          case 'FOOD':
            tmp[1] = data.amount;
            break;
          case 'TRAFFIC':
            tmp[2] = data.amount;
            break;
          case 'HOSPITAL':
            tmp[3] = data.amount;
            break;
          case 'FEE':
            tmp[4] = data.amount;
            break;
          case 'EDUCATION':
            tmp[5] = data.amount;
            break;
          case 'LEISURE':
            tmp[6] = data.amount;
            break;
          case 'SOCIETY':
            tmp[7] = data.amount;
            break;
          case 'DAILY':
            tmp[8] = data.amount;
            break;
          case 'OVERSEAS':
            tmp[9] = data.amount;
            break;
        }
      });
      setInitData([
        { ...initData[0], lastSpend: tmp[0] },
        { ...initData[1], lastSpend: tmp[1] },
        { ...initData[2], lastSpend: tmp[2] },
        { ...initData[3], lastSpend: tmp[3] },
        { ...initData[4], lastSpend: tmp[4] },
        { ...initData[5], lastSpend: tmp[5] },
        { ...initData[6], lastSpend: tmp[6] },
        { ...initData[7], lastSpend: tmp[7] },
        { ...initData[8], lastSpend: tmp[8] },
        { ...initData[9], lastSpend: tmp[9] },
      ]);
    }
  }, [successSpend]);

  return (
    <>
      <Topbar title='이번 달 예산' />
      <div className='flex flex-col gap-6'>
        {/* 예산 카드 영역 */}
        <BudgetInfo
          month={dateMonth}
          balance={budgetData?.sum}
          lastSpend={spendData?.sum}
        />
        {/* 예산 입력 영역 */}
        <div className='flex flex-col w-full p-7 bg-white'>
          <div className='flex flex-row mt-4 justify-between'>
            <p className='font-hanaBold text-2xl text-gray-500'>
              카테고리별 예산
            </p>
            <div className='flex flex-col items-end gap-1'>
              <p
                className={`font-hanaRegular text-3xl ${sum > budgetData?.sum! && 'text-hanaRed'}`}
              >
                {sum.toLocaleString()}원
              </p>
              <p className='font-hanaRegular text-2xl text-gray-400'>
                전체 예산 {budgetData?.sum.toLocaleString()}원
              </p>
            </div>
          </div>
          <div className='w-full my-5 h-[0.12rem] bg-gray-200'></div>
          <div>
            {initData.map((item, idx) => (
              <CategoryEditItem
                key={idx}
                icon={item.icon}
                name={item.name}
                lastSpend={item.lastSpend}
                balance={item.balance}
                updateValue={updateValue}
              />
            ))}
          </div>
        </div>
        <div className='mt-2 flex justify-center'>
          <Button text='설정' onClick={onClickButton} />
        </div>
      </div>
    </>
  );
};
