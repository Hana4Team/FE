import React, { useEffect, useRef, useState } from 'react';
import Topbar from '../../components/Topbar';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { differenceInDays, formatDate } from 'date-fns';
import { AlarmAnimation } from '../../components/organisms/AlarmAnimation';
import { AlertModal } from '../../components/AlertModal';

export const RoadMap5 = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showStepModal, setShowStepModal] = useState<boolean>(false);
  const [showAlarm, setShowAlarm] = useState<boolean>(false);
  const alarmMsgRef = useRef<string>('');

  const { data: roadmap, isSuccess } = useQuery({
    queryKey: ['roadMap5'],
    queryFn: () => {
      const res = ApiClient.getInstance().getDepositSaving('DEPOSIT');
      return res;
    },
  });

  const { data: userInfo } = useQuery({
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
    mutationKey: ['updateHanaMoney'],
    mutationFn: (isMission: boolean) => {
      const res = ApiClient.getInstance().updatePoint(isMission);
      return res;
    },
    onSuccess: (data) => {
      postAlarm(`하나머니 ${data.points}원 적립!`);
    },
  });

  const { mutate: postAlarm } = useMutation({
    mutationKey: ['updateHanaMoney'],
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

  useEffect(() => {
    if (!isSuccess0 && userInfo?.step === 5 && userInfo.stepStatus === 2) {
      setShowStepModal(true);
    }
  }, [userInfo]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['userInfo', 'roadMap5'],
    });
  }, []);

  const onCloseStepModal = async () => {
    try {
      updateHanaMoney(true);
      setShowStepModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  const moveToTermination = () => {
    isSuccess &&
      navigate('/termination', {
        state: {
          type: 'deposit',
          accountId: roadmap.accountId,
          accountName: roadmap.productName,
          sendAccount: roadmap.accountNumber,
          terminationDate: formatDate(Date.now(), 'yyyy-MM-dd'),
          endDate: roadmap.endDate,
          principal: roadmap.balance,
          totalAmount: Math.floor(
            roadmap.balance * (1 + roadmap.interest * 0.01)
          ),
        },
      });
  };

  return (
    <>
      {isSuccess && (
        <>
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
                  5단계 미션을 <span className='text-hanaDeepGreen'>완료</span>
                  했습니다!
                </p>
              </div>
            </AlertModal>
          )}
          <Topbar
            title={roadmap.productName}
            onClick={() => navigate('/mission')}
          />
          <div className='bg-hanaSky min-h-real-screen'>
            <img
              src='/images/pado.svg'
              className='w-full absolute top-[100px] z-10'
            />
            <div className='flex flex-col items-center font-hanaMedium py-[68px] relative z-10'>
              <div className='text-2xl'>
                예금 만기까지 {differenceInDays(roadmap.endDate, Date.now())}일
                남았습니다!
              </div>
              <div className='font-hanaBold text-[32px]'>
                {roadmap.balance.toLocaleString()}원
              </div>
              <div className='text-xl'>해지일 | {roadmap.endDate}</div>
            </div>

            <div className='relative ml-16 w-8/12 h-1 flex justify-center items-center text-center'>
              <img
                src='/images/별돌이까꿍.svg'
                className={`absolute top-[92px] w-20 z-10 rotate-90 `}
                style={{
                  left: `${Math.floor(
                    (differenceInDays(new Date(), roadmap.startDate) /
                      differenceInDays(roadmap.endDate, roadmap.startDate)) *
                      100
                  )}%`,
                }}
              />
            </div>
            <div className='relative top-[153px] flex flex-col items-center justify-center z-10'>
              <div className='h-3 w-11/12 rounded-xl bg-blue-950'></div>
              <div className='flex w-11/12 font-hanaMedium text-lg justify-between m-1'>
                <div className='text-white'>{roadmap.startDate} 개설</div>
                <div className='text-white'>{roadmap.endDate} 만기</div>
              </div>
            </div>

            <div className='flex items-center justify-between font-hanaRegular bg-white rounded-3xl m-5 px-10 py-6 relative z-10 top-[180px]'>
              <div className='text-xl'>{roadmap.startDate}</div>
              <div className='font-hanaMedium text-2xl'>예금 가입</div>
              <div className='flex flex-col items-end gap-1'>
                <div className='font-hanaBold text-2xl text-hanaGreen'>
                  {roadmap.initialAmount.toLocaleString()}
                </div>
                <div className='font-hanaMedium text-xl text-gray-500'>
                  {roadmap.balance.toLocaleString()}
                </div>
              </div>
            </div>

            <button
              className='absolute bottom-28 right-10 z-[60] cursor-pointer font-hanaMedium text-lg'
              onClick={moveToTermination}
            >
              해지하기
            </button>
          </div>
        </>
      )}
    </>
  );
};
