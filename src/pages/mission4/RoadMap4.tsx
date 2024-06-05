import React from 'react';
import Topbar from '../../components/Topbar';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { differenceInDays } from 'date-fns';
import { IoLocationSharp } from 'react-icons/io5';

export const RoadMap4 = () => {
  const navigate = useNavigate();

  const { data: roadmap, isSuccess } = useQuery({
    queryKey: ['roadMap4'],
    queryFn: () => {
      const res = ApiClient.getInstance().getDepositSaving('SAVING');
      return res;
    },
  });

  console.log(roadmap);

  const moveToTermination = () => {
    isSuccess &&
      navigate('/termination', {
        state: {
          accountType: roadmap?.productName,
          sendAccount: '0000-000-000000',
          terminationDate: Date.now(),
          endDate: roadmap.endDate,
          principal: roadmap.balance,
          totalAmount: roadmap.balance * (roadmap.interest * 0.01 + 1),
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
          <div className='bg-hanaSky min-h-real-screen'>
            <div>
              <div className='absolute top-[100px] left-[15px] w-[150px]'>
                <div className='font-hanaMedium text-lg mb-2'>
                  정상까지{' '}
                  <span className='text-hanaRed'>
                    {differenceInDays(roadmap.endDate, roadmap.startDate)}
                  </span>
                  걸음
                </div>
                <div className='absolute bg-gray-100 w-[100%] h-5 rounded-lg'></div>
                <div className='absolute bg-hanaGreen w-[60%] h-5 rounded-lg'></div>
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
                  <span>{roadmap.targetAmount}원</span>
                </div>
                <div className='flex justify-between gap-4'>
                  <span>현재금액</span>
                  <span>{roadmap.initialAmount}원</span>
                </div>
              </div>

              <img
                src='/images/roadmap.svg'
                className='absolute top-[180px] w-full right-0'
              />

              <button
                className='absolute top-[210px] right-[10px] font-hanaCM text-lg border px-10 py-2 bg-white rounded-2xl'
                onClick={() => navigate('/account')}
              >
                상세조회
              </button>
              <button
                className='font-hanaMedium absolute top-[730px] right-10 text-lg cursor-pointer p-2 z-30'
                onClick={moveToTermination}
              >
                해지하기
              </button>

              <div>
                <IoLocationSharp className='absolute w-24 top-[315px] left-[125px]' />
                <IoLocationSharp className='absolute w-24 top-[400px] right-[90px]' />
                <IoLocationSharp className='absolute w-24 top-[500px] left-[72px]' />
                <IoLocationSharp className='absolute w-24 top-[578px] right-[34px]' />
                <IoLocationSharp className='absolute w-24 top-[640px] left-[42px]' />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
