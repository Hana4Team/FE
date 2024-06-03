import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function MyHome() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      {!pathname.includes('capture') ? (
        <div className='w-full flex flex-col items-end pt-20 gap-6 pr-5'>
          <div>
            <img src='/images/kakao.svg' className='w-20' />
            <div className='font-hanaBold text-lg text-center -m-2'>
              카톡공유
            </div>
          </div>

          <div>
            <img src='/images/link.svg' className='w-20' />
            <div className='font-hanaBold text-lg text-center -m-2'>
              링크공유
            </div>
          </div>

          <div onClick={() => navigate('/myhome/capture')}>
            <img src='/images/capture.svg' className='w-20' />
            <div className='font-hanaBold text-lg text-center -m-2'>
              캡처하기
            </div>
          </div>
        </div>
      ) : (
        <div
          className='w-screen h-screen'
          onClick={() => navigate('/myhome')}
        ></div>
      )}
    </>
  );
}
