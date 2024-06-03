import React from 'react';
import Topbar from '../../components/Topbar';
import { useNavigate } from 'react-router-dom';
import Termination from './Termination';

export const RoadMap4 = () => {
  const navigate = useNavigate();

  const moveToTermination = () => {
    navigate('/termination', {
      state: {
        accountType: '정기적금',
        sendAccount: '0000-000-000000',
        terminationDate: '2024.05.20',
        terminationType: '만기해지',
        principal: 1000000,
        totalAmount: 1023366,
      },
    });
  };

  return (
    <>
      <Topbar title='청년도약계좌' />
      <div className='bg-hanaSky min-h-real-screen'>
        <div>
          <div className='absolute top-[100px] left-[15px] w-[150px]'>
            <div className='font-hanaMedium text-lg mb-2'>
              정상까지 <span className='text-hanaRed'>24</span>걸음
            </div>
            <div className='absolute bg-gray-100 w-[100%] h-5 rounded-lg'></div>
            <div className='absolute bg-hanaGreen w-[60%] h-5 rounded-lg'></div>
          </div>

          <img
            src='/images/cloud.png'
            className='absolute top-[90px] w-80 right-0'
          />
          <img
            src='/images/cloud.png'
            className='absolute top-[200px] w-80 -left-44'
          />

          <div className='absolute top-[150px] right-14 text-xl font-hanaMedium'>
            <div className='flex justify-between gap-4'>
              <span>목표금액</span>
              <span>1,000,000원</span>
            </div>
            <div className='flex justify-between gap-4'>
              <span>현재금액</span>
              <span>800,000원</span>
            </div>
          </div>

          <img
            src='/images/roadmap.png'
            className='absolute top-[180px] w-full right-0'
          />

          <button className='absolute top-[210px] right-[10px] font-hanaCM text-lg border px-10 py-2 bg-white rounded-2xl'>
            상세조회
          </button>
          <button
            className='font-hanaMedium absolute top-[730px] right-10 text-lg cursor-pointer p-2 z-20'
            onClick={moveToTermination}
          >
            해지하기
          </button>

          <div>
            <img
              src='/images/pin_gray.png'
              className='absolute w-24 top-[315px] left-[125px]'
            />
            <img
              src='/images/pin_red.png'
              className='absolute w-24 top-[400px] right-[90px]'
            />
            <img
              src='/images/pin_green.png'
              className='absolute w-24 top-[500px] left-[72px]'
            />
            <img
              src='/images/pin_green.png'
              className='absolute w-24 top-[578px] right-[34px]'
            />
            <img
              src='/images/pin_green.png'
              className='absolute w-24 top-[640px] left-[42px]'
            />
          </div>
        </div>
      </div>
    </>
  );
};
