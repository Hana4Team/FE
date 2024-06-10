import { MissionStartHeader } from '../../components/molecules/MissionStartHeader';
import Topbar from '../../components/Topbar';
import { BudgetInfo } from '../../components/organisms/BudgetInfo';
import { dateMonth, dateYear } from '../../utils/getDate';
import { CategorySpendCard } from '../../components/organisms/CategorySpendCard';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { useEffect, useRef, useState } from 'react';
import { SpendType } from '../../types/spend';
import { AlertModal } from '../../components/AlertModal';
import { AlarmAnimation } from '../../components/organisms/AlarmAnimation';

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
  const queryClient = useQueryClient();

  const { data: spendList, isSuccess: isSuccessSpend } = useQuery({
    queryKey: ['budget'],
    queryFn: () => {
      const res = ApiClient.getInstance().getSpendList(dateYear, dateMonth);
      return res;
    },
    staleTime: 500,
  });

  const { data: budgetData } = useQuery({
    queryKey: ['budget2'],
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
  });

  const { mutate: checkMission, isSuccess: isSuccess0 } = useMutation({
    mutationKey: ['checkMission'],
    mutationFn: () => {
      const res = ApiClient.getInstance().updateMissionCheck();
      return res;
    },
  });

  const { mutate: updateHanaMoney } = useMutation({
    mutationKey: ['updateHanaMoney2'],
    mutationFn: (isMission: boolean) => {
      const res = ApiClient.getInstance().updatePoint(isMission);
      return res;
    },
    onSuccess: (data) => {
      postAlarm(`하나머니 ${data.points}원 적립!`);
    },
  });

  const { mutate: postAlarm } = useMutation({
    mutationKey: ['updateHanaMoney3'],
    mutationFn: (contents: string) => {
      const res = ApiClient.getInstance().postAlarm(contents);
      return res;
    },
    onSuccess: (_, variables) => {
      checkMission();
      setShowAlarm(true);
      alarmMsgRef.current = variables;
    },
  });

  const [datas, setDatas] = useState<SpendType[]>([]);
  const [showStepModal, setShowStepModal] = useState<boolean>(false);
  const [initial, setInitial] = useState<boolean>(false);
  const [showAlarm, setShowAlarm] = useState<boolean>(false);
  const alarmMsgRef = useRef<string>('');

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
    if (userQuery.data?.step === 1 && userQuery.data.stepStatus === 2) {
      setShowStepModal(true);
    }
  }, [userQuery.data]);

  const onCloseStepModal = async () => {
    try {
      updateHanaMoney(true);
      setShowStepModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['budget', 'budget2', 'userInfo'],
    });
  }, []);

  useEffect(() => {
    if (initial) {
      queryClient.invalidateQueries({
        queryKey: ['userInfo'],
      });
      setInitial(false);
    }
  }, [initial]);

  return (
    <div className='relative w-full'>
      {showAlarm && (
        <AlarmAnimation
          message={alarmMsgRef.current}
          showAlarm={showAlarm}
          onClickShowAlarm={(status: boolean) => setShowAlarm(status)}
        />
      )}
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
    </div>
  );
};
