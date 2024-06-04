import { useEffect, useState } from 'react';
import Topbar from '../../components/Topbar';
import { BudgetInfo } from '../../components/organisms/BudgetInfo';
import { dateMonth } from '../../utils/getDate';
import { CategoryEditItem } from '../../components/molecules/CategoryEditItem';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

type Request = {
  shopping: number;
  food: number;
  traffic: number;
  hospital: number;
  fee: number;
  education: number;
  leisure: number;
  society: number;
  daily: number;
  overseas: number;
};

export const ConsumeEdit = () => {
  const navigate = useNavigate();

  const initData = [
    {
      icon: 'icons/shopping.svg',
      name: '쇼핑',
      lastSpend: 10000,
      balance: 5000,
    },
    {
      icon: 'icons/food.svg',
      name: '요식',
      lastSpend: 20000,
      balance: 4000,
    },
    {
      icon: 'icons/traffic.svg',
      name: '교통',
      lastSpend: 30000,
      balance: 2000,
    },
    {
      icon: 'icons/hospital.svg',
      name: '의료',
      lastSpend: 20000,
      balance: 4000,
    },
    {
      icon: 'icons/fee.svg',
      name: '납부',
      lastSpend: 10000,
      balance: 1000,
    },
    {
      icon: 'icons/education.svg',
      name: '교육',
      lastSpend: 20000,
      balance: 5000,
    },
    {
      icon: 'icons/leisure.svg',
      name: '여유생활',
      lastSpend: 30000,
      balance: 7000,
    },
    {
      icon: 'icons/society.svg',
      name: '사교활동',
      lastSpend: 20000,
      balance: 3000,
    },
    {
      icon: 'icons/daily.svg',
      name: '일상생활',
      lastSpend: 10000,
      balance: 5000,
    },
    {
      icon: 'icons/overseas.svg',
      name: '해외',
      lastSpend: 20000,
      balance: 3000,
    },
  ];

  const [data, setData] = useState<Request>({
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

  const [totalSum, setTotalSum] = useState<number>(500000);

  const updateValue = (name: string, value: number) => {
    setData((cur) => {
      let newData: any = { ...cur };
      newData[name] = value;
      return newData;
    });
  };

  const onClickButton = () => {
    navigate('/consume');
  };

  useEffect(() => {
    setSum(Object.values(data).reduce((acc, val) => acc + val));
  }, [data]);

  return (
    <>
      <Topbar title='이번 달 예산' />
      <div className='flex flex-col gap-6'>
        {/* 예산 카드 영역 */}
        <BudgetInfo month={dateMonth} balance={500000} lastSpend={600000} />
        {/* 예산 입력 영역 */}
        <div className='flex flex-col w-full p-7 bg-white'>
          <div className='flex flex-row mt-4 justify-between'>
            <p className='font-hanaBold text-2xl text-gray-500'>
              카테고리별 예산
            </p>
            <div className='flex flex-col items-end gap-1'>
              <p className='font-hanaRegular text-3xl'>
                {sum.toLocaleString()}원
              </p>
              <p className='font-hanaRegular text-2xl text-gray-400'>
                전체 예산 {totalSum.toLocaleString()}원
              </p>
            </div>
          </div>
          <div className='w-full my-5 h-[0.12rem] bg-gray-200'></div>
          <div>
            {initData.map((item) => (
              <CategoryEditItem
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
