import React, { useRef } from 'react';
import Topbar from '../../components/Topbar';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { differenceInDays, formatDate } from 'date-fns';
import { IoLocationSharp } from 'react-icons/io5';

export const RoadMap4 = () => {
  const navigate = useNavigate();
  const percent = useRef<number>(0);

  const { data: roadmap, isSuccess } = useQuery({
    queryKey: ['roadMap4'],
    queryFn: () => {
      const res = ApiClient.getInstance().getDepositSaving('SAVING');
      return res;
    },
  });

  if (isSuccess) {
    percent.current = Math.floor(
      (roadmap.balance / roadmap.targetAmount) * 100
    );
  }

  console.log(roadmap);

  const moveToTermination = () => {
    isSuccess &&
      navigate('/termination', {
        state: {
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
          <Topbar
            title={roadmap.productName}
            onClick={() => navigate('/mission')}
          />
          <div className='bg-hanaSky min-h-real-screen2'>
            <div className='absolute top-[100px] left-[15px] w-[150px]'>
              <div className='font-hanaMedium text-lg mb-2'>
                정상까지{' '}
                <span className='text-hanaRed'>
                  {differenceInDays(roadmap.endDate, Date.now())}
                </span>
                걸음
              </div>
              <div className='absolute bg-gray-100 w-[100%] h-5 rounded-lg'></div>
              <div
                className={`absolute bg-hanaGreen w-[${Math.floor(
                  (differenceInDays(new Date(), roadmap.startDate) /
                    differenceInDays(roadmap.endDate, roadmap.startDate)) *
                    100
                )}%] h-5 rounded-lg`}
              ></div>
            </div>

            <img
              src='/images/cloud.svg'
              className='absolute top-[90px] w-80 right-0'
            />
            <img
              src='/images/cloud.svg'
              className='absolute top-[200px] w-80 -left-44'
            />

            <div className='absolute top-[150px] right-14 text-xl font-hanaMedium'>
              <div className='flex justify-between gap-4'>
                <span>목표금액</span>
                <span>{roadmap.targetAmount.toLocaleString()}원</span>
              </div>
              <div className='flex justify-between gap-4'>
                <span>현재금액</span>
                <span>{roadmap.balance.toLocaleString()}원</span>
              </div>
            </div>

            <div className='relative bg-roadmap4 bg-contain bg-no-repeat w-screen min-h-real-screen3 top-40'>
              <button
                className='font-hanaMedium absolute bottom-[80px] right-5 text-end  text-lg cursor-pointer z-30'
                onClick={moveToTermination}
              >
                해지하기
              </button>
              <div className='absolute'>
                <IoLocationSharp
                  size={55}
                  color={`${percent.current >= 100 ? '#28B2A5' : percent.current >= 80 ? '#F2777E' : '#C7C7C7'}`}
                  className='absolute top-[145px] left-[128px]'
                />
                <IoLocationSharp
                  size={55}
                  color={`${percent.current > 80 ? '#28B2A5' : percent.current >= 60 ? '#F2777E' : '#C7C7C7'}`}
                  className='absolute top-[230px] left-[242px]'
                />
                <IoLocationSharp
                  size={55}
                  color={`${percent.current > 60 ? '#28B2A5' : percent.current >= 40 ? '#F2777E' : '#C7C7C7'}`}
                  className='absolute top-[328px] left-[76px]'
                />
                <IoLocationSharp
                  size={55}
                  color={`${percent.current > 40 ? '#28B2A5' : percent.current >= 20 ? '#F2777E' : '#C7C7C7'}`}
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
              className='absolute top-[210px] right-[10px] font-hanaCM text-lg border px-10 py-2 bg-white rounded-2xl'
              onClick={() => navigate('/account')}
            >
              상세조회
            </button>
          </div>
        </>
      )}
    </>
  );
};
