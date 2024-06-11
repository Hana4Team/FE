import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ApiClient } from '../apis/apiClient';
import { Shopping } from '../components/organisms/Shopping';

export const MyHome = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const [isOpenModal, setIsModalOpen] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const { data: home, isSuccess } = useQuery({
    queryKey: ['home'],
    queryFn: () => {
      const res = ApiClient.getInstance().getHome();
      return res;
    },
  });

  useEffect(() => {
    const animate = setTimeout(() => {
      setVisible(true);
    }, 500);

    return () => {
      clearTimeout(animate);
    };
  }, []);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['home'],
    });
  }, []);

  return (
    <>
      {isSuccess && (
        <>
          {isOpenModal && <Shopping setIsModalOpen={setIsModalOpen} />}

          {!pathname.includes('capture') ? (
            <div className='absolute w-full flex flex-col items-end gap-6 pr-5 mt-16 z-20'>
              <div onClick={() => setIsModalOpen((prev) => !prev)}>
                <img src='/images/shopping.png' className='w-20' />
                <div className='font-hanaBold  text-white text-lg drop-shadow-[0px_0px_1px_rgba(0,0,0,1)] text-center -m-2'>
                  쇼핑하기
                </div>
              </div>

              {/* <div>
                <img src='/images/kakao.svg' className='w-20' />
                <div className='font-hanaBold text-white text-lg drop-shadow-[0px_0px_1px_rgba(0,0,0,1)] text-center -m-2'>
                  카톡공유
                </div>
              </div>

              <div>
                <img src='/images/link.svg' className='w-20' />
                <div className='font-hanaBold text-white text-lg drop-shadow-[0px_0px_1px_rgba(0,0,0,1)] text-center -m-2'>
                  링크공유
                </div>
              </div> */}

              <div onClick={() => navigate('/myhome/capture')}>
                <img src='/images/capture.svg' className='w-20' />
                <div className='font-hanaBold text-white text-lg drop-shadow-[0px_0px_1px_rgba(0,0,0,1)] text-center -m-2'>
                  캡처하기
                </div>
              </div>
            </div>
          ) : (
            <div
              className='absolute w-screen h-screen z-50'
              onClick={() => navigate('/myhome')}
            ></div>
          )}

          <img
            src={home.background}
            className='absolute top-0 left-0 w-full h-full'
          />
          {home.name === '길바닥' ? (
            <img
              src={home.image}
              className={`absolute w-48 top-[500px] left-[120px] animate-zoomInDown ${!visible && 'opacity-0'}`}
            />
          ) : home.name === '고시원' ? (
            <img
              src={home.image}
              className={`absolute w-48 top-[550px] left-[30px] -rotate-[170deg] animate-jiggle ${!visible && 'opacity-0'}`}
            />
          ) : home.name === '반지하' ? (
            <img
              src={home.image}
              className={`absolute w-36 top-[240px] left-[228px] animate-fadeinright ${!visible && 'opacity-0'}`}
            />
          ) : home.name === '자취방' ? (
            <img
              src={home.image}
              className={`absolute w-64 top-[420px] left-[80px] animate-tada ${!visible && 'opacity-0'}`}
            />
          ) : home.name === '아파트' ? (
            <img
              src={home.image}
              className={`absolute w-52 top-[480px] left-[180px] animate-tada ${!visible && 'opacity-0'}`}
            />
          ) : home.name === '대저택' ? (
            <img
              src={home.image}
              className={`absolute w-36 top-[400px] left-[250px] animate-flyin ${!visible && 'opacity-0'}`}
            />
          ) : null}

          <div className='absolute p-7 text-2xl font-hanaBold drop-shadow-[0px_0px_1px_rgba(0,0,0,1)] text-white'>
            {home.name}
          </div>
        </>
      )}
    </>
  );
};
