import { MissionStartHeader } from '../../components/molecules/MissionStartHeader';
import Topbar from '../../components/Topbar';
import { BudgetInfo } from '../../components/organisms/BudgetInfo';
import { dateMonth, dateYear } from '../../utils/getDate';
import { CategorySpendCard } from '../../components/organisms/CategorySpendCard';

export const Mission1StartPage = () => {
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

  return (
    <>
      <Topbar title='이사미션' />
      <MissionStartHeader
        icon='icons/blub.svg'
        title={`지난 달 지출을 확인하고\n이번 달 예산을 입력해보아요`}
      />
      <div className='flex flex-col gap-6'>
        <BudgetInfo month={dateMonth} balance={500000} />
        <CategorySpendCard
          datas={datas}
          year={dateYear}
          month={dateMonth}
          balance={500000}
          isMission
        />
      </div>
    </>
  );
};
