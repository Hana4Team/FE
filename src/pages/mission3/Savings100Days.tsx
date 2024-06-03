import React from 'react';
import { Calendar } from '../../components/organisms/Calendar';
import Topbar from '../../components/Topbar';
import { useNavigate } from 'react-router-dom';

export const Savings100Days = () => {
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
      <Topbar title='100일 적금 관리' onClick={() => navigate('/mission')} />
      <div className='bg-hanaAqua pb-[100px]'>
        <div className='bg-white font-hanaMedium p-8'>
          <div className='text-3xl mb-2'>생활비</div>
          <div className='text-4xl font-hanaBold'>
            총 <span className='text-hanaDeepGreen'>800,000원</span>
            모았어요
          </div>

          <div className='flex justify-between'>
            <div>
              <div className='h-28 py-5'>
                <div className='absolute w-1/2'>
                  <div className='font-hanaMedium text-lg mb-2 mr-4 text-end'>
                    D-24
                  </div>
                  <div className='absolute bg-gray-100 w-[100%] h-5 rounded-lg border-2'></div>
                  <div className='absolute bg-hanaGreen w-[60%] h-5 rounded-lg'></div>
                </div>
              </div>
              <div className='font-hanaMedium text-2xl pt-2'>
                <div className='flex gap-2'>
                  <div>신규일</div>
                  <div>2024.05.17</div>
                </div>
                <div className='flex gap-2'>
                  <div>만기일</div>
                  <div>2024.05.17</div>
                </div>
              </div>
            </div>
            <img src='/images/별돌이하트.svg' className='w-32 mr-12' />
          </div>
          <div className='flex w-full justify-center'>
            <button
              onClick={() => navigate('/account')}
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
          <Calendar success={76} fail={0} />
          <div className='w-[300px] bg-white rounded-2xl mt-10 mb-4 p-5 border border-black font-hanaMedium text-xl'>
            <div className='flex justify-between pb-4'>
              <div className='text-gray-400'>납입일 수</div>
              <div>76일/100일</div>
            </div>
            <div className='flex justify-between pb-4 border-b-2'>
              <div className='text-gray-400'>첫 납입 금액</div>
              <div>200,000원</div>
            </div>
            <div className='flex justify-between pt-4'>
              <div>나의 예상금리</div>
              <div className='text-hanaDeepGreen font-hanaBold text-3xl'>
                6.00%
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
  );
};
