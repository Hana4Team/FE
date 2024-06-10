import { MissionStartHeader } from '../../components/molecules/MissionStartHeader';
import Topbar from '../../components/Topbar';
import { BudgetInfo } from '../../components/organisms/BudgetInfo';
import { dateMonth, dateYear } from '../../utils/getDate';
import { CategorySpendCard } from '../../components/organisms/CategorySpendCard';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { useEffect, useState } from 'react';
import { SpendType } from '../../types/spend';
import { AlertModal } from '../../components/AlertModal';

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

export const Mission1StartPage = () => {
  const { data: spendList, isSuccess: isSuccessSpend } = useQuery({
    queryKey: ['budget'],
    queryFn: () => {
      const res = ApiClient.getInstance().getSpendList(dateYear, dateMonth);
      return res;
    },
    staleTime: 500,
  });

  const { data: budgetData } = useQuery({
    queryKey: ['budget13'],
    queryFn: () => {
      const res = ApiClient.getInstance().getTotalBudget();
      return res;
    },
    staleTime: 100,
  });

  const userQuery = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => {
      const res = ApiClient.getInstance().getUser();
      return res;
    },
    enabled: false,
  });

  const { mutate: checkMission, isSuccess: isSuccess0 } = useMutation({
    mutationKey: ['checkMission'],
    mutationFn: () => {
      const res = ApiClient.getInstance().updateMissionCheck();
      return res;
    },
  });

  const {
    mutate: updateHanaMoney,
    isSuccess: isSuccess1,
    data: hanaMoney,
  } = useMutation({
    mutationKey: ['updateHanaMoney2'],
    mutationFn: (isMission: boolean) => {
      const res = ApiClient.getInstance().updatePoint(isMission);
      return res;
    },
  });

  const { mutate: postAlarm, isSuccess: isSuccess2 } = useMutation({
    mutationKey: ['updateHanaMoney3'],
    mutationFn: (contents: string) => {
      const res = ApiClient.getInstance().postAlarm(contents);
      return res;
    },
  });

  const [datas, setDatas] = useState<SpendType[]>([]);
  const [showStepModal, setShowStepModal] = useState<boolean>(false);
  const [initial, setInitial] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccessSpend) {
      setDatas(
        spendList.spendFindByTypeResList
          .map((item) => {
            return {
              type: Category[item.type as keyof typeof Category],
              amount: item.amount,
            };
          })
          .filter((item) => item.amount > 0)
      );
    }
  }, [isSuccessSpend]);

  useEffect(() => {
    if (
      !isSuccess0 &&
      userQuery.data?.step === 1 &&
      userQuery.data.stepStatus === 2
    ) {
      checkMission();
      setShowStepModal(true);
    }
  }, [userQuery.data]);

  useEffect(() => {
    if (isSuccess1 && !isSuccess2) {
      postAlarm(`하나머니 ${hanaMoney?.points}원 적립!`);
    }
  }, [isSuccess1]);

  useEffect(() => {
    if (initial) {
      userQuery.refetch();
      setInitial(false);
    }
  }, [initial]);

  const onCloseStepModal = async () => {
    try {
      updateHanaMoney(true);
      setShowStepModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(budgetData);

  return (
    <>
      {showStepModal && (
        <AlertModal onClose={() => onCloseStepModal()}>
          <div className='flex flex-col font-hanaMedium text-2xl text-center'>
            <p>
              1단계 미션을 <span className='text-hanaDeepGreen'>완료</span>
              했습니다!
            </p>
          </div>
        </AlertModal>
      )}
      <Topbar title='이사미션' />
      <MissionStartHeader
        icon='icons/blub.svg'
        title={`지난 달 지출을 확인하고\n이번 달 예산을 입력해보아요`}
      />
      <div className='flex flex-col gap-6'>
        <BudgetInfo
          month={dateMonth}
          balance={budgetData?.sum}
          initialFunc={() => setInitial(true)}
        />
        <CategorySpendCard
          datas={datas}
          year={dateYear}
          month={dateMonth}
          balance={datas.reduce((acc, data) => acc + data.amount, 0)}
          isMission
        />
      </div>
    </>
  );
};
