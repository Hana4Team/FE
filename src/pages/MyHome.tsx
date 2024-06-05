import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ApiClient } from '../apis/apiClient';
import { setCookie } from '../utils/cookie';

export const MyHome = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { data: home, isSuccess } = useQuery({
    queryKey: ['home'],
    queryFn: () => {
      const res = ApiClient.getInstance().getHome();
      return res;
    },
  });

  console.log(home);

  return (
    <>
      {isSuccess && (
        <>
          <img
            src={home.background}
            className='absolute top-0 left-0 w-full h-full'
          />
          <img src={home.image} className='absolute w-24' />

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
      )}
    </>
  );
};
