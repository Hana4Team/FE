import React, { useEffect, useRef, useState } from 'react';
import Topbar from '../../components/Topbar';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { differenceInDays, formatDate } from 'date-fns';
import { IoLocationSharp } from 'react-icons/io5';
import { AlarmAnimation } from '../../components/organisms/AlarmAnimation';
import { AlertModal } from '../../components/AlertModal';

export const RoadMap4 = () => {
  const navigate = useNavigate();
  const percent = useRef<number>(0);
  const queryClient = useQueryClient();
  const [showStepModal, setShowStepModal] = useState<boolean>(false);
  const [showAlarm, setShowAlarm] = useState<boolean>(false);
  const alarmMsgRef = useRef<string>('');

  const { data: roadmap, isSuccess } = useQuery({
    queryKey: ['roadMap4'],
    queryFn: () => {
      const res = ApiClient.getInstance().getDepositSaving('SAVING');
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
    if (!isSuccess0 && userInfo?.step === 4 && userInfo.stepStatus === 2) {
      setShowStepModal(true);
    }
  }, [userInfo]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['userInfo', 'roadMap4'],
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

  if (isSuccess) {
    percent.current = Math.floor(
      (differenceInDays(new Date(), roadmap.startDate) /
        differenceInDays(roadmap.endDate, roadmap.startDate)) *
        100
    );
  }

  const moveToTermination = () => {
    isSuccess &&
      navigate('/termination', {
        state: {
          type: 'savings',
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
                  4단계 미션을 <span className='text-hanaDeepGreen'>완료</span>
                  했습니다!
                </p>
              </div>
            </AlertModal>
          )}
          <Topbar
            title={roadmap.productName}
            onClick={() => navigate('/mission')}
          />
          <div className='bg-hanaSky min-h-real-screen2'>
            <div className='absolute top-[70px] left-[15px] w-[150px]'>
              <div className='font-hanaMedium text-lg mb-2'>
                정상까지{' '}
                <span className='text-hanaRed'>
                  {differenceInDays(roadmap.endDate, Date.now())}
                </span>
                걸음
              </div>
              <div className='absolute bg-gray-100 w-[100%] h-5 rounded-lg'></div>
              <div
                className={`absolute bg-hanaGreen h-5 rounded-lg`}
                style={{
                  width: `${Math.floor(
                    (differenceInDays(new Date(), roadmap.startDate) /
                      differenceInDays(roadmap.endDate, roadmap.startDate)) *
                      100
                  )}%`,
                }}
              ></div>
            </div>

            <img
              src='/images/cloud.svg'
              className='absolute top-[60px] w-80 right-0'
            />
            <img
              src='/images/cloud.svg'
              className='absolute top-[180px] w-80 -left-44'
            />

            <div className='absolute top-[120px] right-14 text-xl font-hanaMedium'>
              <div className='flex justify-between gap-4'>
                <span>목표금액</span>
                <span>{roadmap.targetAmount.toLocaleString()}원</span>
              </div>
              <div className='flex justify-between gap-4'>
                <span>현재금액</span>
                <span>{roadmap.balance.toLocaleString()}원</span>
              </div>
            </div>

            <div className='relative bg-roadmap4 bg-contain bg-no-repeat w-screen min-h-real-screen3 top-[115px]'>
              <button
                className='font-hanaMedium absolute bottom-[90px] right-5 text-end  text-lg cursor-pointer z-30'
                onClick={moveToTermination}
              >
                해지하기
              </button>
              <div className='absolute'>
                <IoLocationSharp
                  size={55}
                  color={`${percent.current >= 100 ? '#28B2A5' : percent.current > 80 ? '#F2777E' : '#C7C7C7'}`}
                  className='absolute top-[145px] left-[128px]'
                />
                <IoLocationSharp
                  size={55}
                  color={`${percent.current > 80 ? '#28B2A5' : percent.current > 60 ? '#F2777E' : '#C7C7C7'}`}
                  className='absolute top-[230px] left-[242px]'
                />
                <IoLocationSharp
                  size={55}
                  color={`${percent.current > 60 ? '#28B2A5' : percent.current > 40 ? '#F2777E' : '#C7C7C7'}`}
                  className='absolute top-[328px] left-[76px]'
                />
                <IoLocationSharp
                  size={55}
                  color={`${percent.current > 40 ? '#28B2A5' : percent.current > 20 ? '#F2777E' : '#C7C7C7'}`}
                  className='absolute top-[404px] left-[298px]'
                />
                <IoLocationSharp
                  size={55}
                  color={`${percent.current > 20 ? '#28B2A5' : percent.current >= 0 ? '#F2777E' : '#C7C7C7'}`}
                  className='absolute top-[470px] left-[44px]'
                />
              </div>
            </div>

            <button
              className='absolute top-[180px] right-[10px] font-hanaCM text-lg border px-10 py-2 bg-white rounded-2xl'
              onClick={() =>
                navigate('/account', {
                  state: {
                    accountId: roadmap.accountId,
                  },
                })
              }
            >
              상세조회
            </button>
          </div>
        </>
      )}
    </>
  );
};
