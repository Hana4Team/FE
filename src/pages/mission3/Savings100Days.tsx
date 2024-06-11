import React, { useEffect, useRef, useState } from 'react';
import { Calendar } from '../../components/organisms/Calendar';
import Topbar from '../../components/Topbar';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { differenceInDays, formatDate } from 'date-fns';
import { AlarmAnimation } from '../../components/organisms/AlarmAnimation';
import { AlertModal } from '../../components/AlertModal';

export const Savings100Days = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showStepModal, setShowStepModal] = useState<boolean>(false);
  const [showAlarm, setShowAlarm] = useState<boolean>(false);
  const alarmMsgRef = useRef<string>('');

  const { data: saving100, isSuccess } = useQuery({
    queryKey: ['saving100'],
    queryFn: () => {
      const res = ApiClient.getInstance().getDepositSaving('SAVING100');
      return res;
    },
  });

  const { data: saving100Check, isSuccess: isCheckSuccess } = useQuery({
    queryKey: ['saving100Check'],
    queryFn: () => {
      const res = ApiClient.getInstance().getSaving100Check();
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
    if (!isSuccess0 && userInfo?.step === 3 && userInfo.stepStatus === 2) {
      setShowStepModal(true);
    }
  }, [userInfo]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['userInfo', 'saving100', 'saving100Check'],
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
          type: 'saving100',
          accountId: saving100.accountId,
          accountName: saving100.productName,
          sendAccount: saving100.accountNumber,
          terminationDate: formatDate(Date.now(), 'yyyy-MM-dd'),
          endDate: saving100.endDate,
          principal: saving100.balance,
          totalAmount: Math.floor(
            saving100.balance * (1 + saving100.interest * 0.01)
          ),
        },
      });
  };

  return (
    <>
      {isSuccess && isCheckSuccess && (
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
                  3단계 미션을 <span className='text-hanaDeepGreen'>완료</span>
                  했습니다!
                </p>
              </div>
            </AlertModal>
          )}

          <Topbar
            title={saving100.productName}
            onClick={() => navigate('/mission')}
          />
          <div className='bg-hanaAqua pb-[100px]'>
            <div className='bg-white font-hanaMedium p-8'>
              <div className='text-3xl mb-2'>생활비</div>
              <div className='text-4xl font-hanaBold'>
                총{' '}
                <span className='text-hanaDeepGreen'>
                  {saving100.balance.toLocaleString()}원
                </span>
                모았어요
              </div>

              <div className='flex justify-between'>
                <div>
                  <div className='h-28 py-5'>
                    <div className='absolute w-1/2'>
                      <div className='font-hanaMedium text-lg mb-2 mr-4 text-end'>
                        {differenceInDays(saving100.endDate, new Date()) > 0
                          ? `D-${differenceInDays(saving100.endDate, new Date()) + 1}`
                          : differenceInDays(saving100.endDate, new Date()) < 0
                            ? `D+${Math.abs(differenceInDays(saving100.endDate, new Date()))}`
                            : 'D-Day'}
                      </div>
                      <div className='absolute bg-gray-100 w-[100%] h-5 rounded-lg border-2'></div>
                      <div
                        className={`absolute bg-hanaGreen h-5 rounded-lg`}
                        style={{
                          width: `${Math.floor(
                            (differenceInDays(new Date(), saving100.startDate) /
                              100) *
                              100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className='font-hanaMedium text-xl pt-2'>
                    <div className='flex gap-2'>
                      <div>신규일</div>
                      <div>{saving100.startDate}</div>
                    </div>
                    <div className='flex gap-2'>
                      <div>만기일</div>
                      <div>{saving100.endDate}</div>
                    </div>
                  </div>
                </div>
                <img src='/images/별돌이하트.svg' className='w-32 mr-12' />
              </div>
              <div className='flex w-full justify-center'>
                <button
                  onClick={() =>
                    navigate('/account', {
                      state: {
                        accountId: saving100.accountId,
                      },
                    })
                  }
                  className='absolute bg-white font-hanaMedium text-2xl rounded-xl py-5 px-20 border-2 cursor-pointer'
                >
                  상세조회
                </button>
              </div>
            </div>
            <div className='w-full flex flex-col justify-center items-center'>
              <div className='font-hanaMedium text-2xl w-full py-20 pb-3 pl-20'>
                나의 저축 현황
              </div>
              <Calendar
                accountId={saving100.accountId}
                startDate={saving100.startDate}
                endDate={saving100.endDate}
                success={saving100Check.successCount}
                fail={saving100Check.failCount}
              />
              <div className='w-[300px] bg-white rounded-2xl mt-10 mb-4 p-5 border border-black font-hanaMedium text-xl'>
                <div className='flex justify-between pb-4'>
                  <div className='text-gray-400'>납입일 수</div>
                  <div>{saving100Check.successCount}일/100일</div>
                </div>
                <div className='flex justify-between pb-4 border-b-2'>
                  <div className='text-gray-400'>첫 납입 금액</div>
                  <div>{saving100.initialAmount.toLocaleString()}원</div>
                </div>
                <div className='flex justify-between pt-4'>
                  <div>나의 예상금리</div>
                  <div className='text-hanaDeepGreen font-hanaBold text-3xl'>
                    {saving100.interest}%
                  </div>
                </div>
              </div>
              <div className='w-[300px] flex justify-end mr-10'>
                <button
                  className='font-hanaMedium text-lg cursor-pointer z-20'
                  onClick={moveToTermination}
                >
                  해지하기
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
