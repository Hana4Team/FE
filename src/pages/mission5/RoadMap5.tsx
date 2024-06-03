import React from 'react';
import Topbar from '../../components/Topbar';
import { useNavigate } from 'react-router-dom';

export const RoadMap5 = () => {
  const navigate = useNavigate();

  const moveToTermination = () => {
    navigate('/termination', {
      state: {
        accountType: '정기예금',
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
      <Topbar title='청년도약예금' onClick={() => navigate('/mission')} />
      <div className='bg-hanaSky min-h-real-screen'>
        <img
          src='/images/pado.svg'
          className='w-full absolute top-[100px] z-10'
        />
        <div className='flex flex-col items-center font-hanaMedium py-20 relative z-10'>
          <div className='text-2xl'>예금 만기까지 167일 남았습니다!</div>
          <div className='font-hanaBold text-[32px]'>18,037,553원</div>
          <div className='text-xl'>해지일 | 2024.04.21</div>
        </div>

        <div className='relative top-[153px] flex flex-col items-center justify-center z-10'>
          <img
            src='/images/별돌이까꿍.svg'
            className='absolute left-[20%] -top-[70px] w-32 z-10 rotate-90 '
          />
          <div className='h-3 w-11/12 rounded-xl bg-blue-950'></div>
          <div className='flex w-11/12 font-hanaMedium text-lg justify-between m-1'>
            <div className='text-white'>2023.04.21 개설</div>
            <div className='text-white'>2024.04.21 만기</div>
          </div>
        </div>

        <div className='flex items-center justify-between font-hanaRegular bg-white rounded-3xl m-5 px-10 py-8 relative z-10 top-[180px]'>
          <div className='text-xl'>04.21</div>
          <div className='font-hanaMedium text-2xl'>예금 가입</div>
          <div className='flex flex-col items-end'>
            <div className='font-hanaBold text-2xl text-hanaGreen'>
              18,000,000원
            </div>
            <div className='font-hanaMedium text-xl text-gray-500'>
              18,000,000원
            </div>
          </div>
        </div>

        <button
          className='absolute bottom-28 right-10 z-20 cursor-pointer font-hanaMedium text-lg'
          onClick={moveToTermination}
        >
          해지하기
        </button>
      </div>
    </>
  );
};
