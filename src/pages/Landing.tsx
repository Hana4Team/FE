import React, { useEffect, useState } from 'react';
import { getCookie } from '../utils/cookie';
import { useNavigate } from 'react-router-dom';

export const Landing = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const animate = setTimeout(() => {
      setVisible(true);
    }, 1500);
    const timeout = setTimeout(() => {
      if (getCookie('phone')) {
        navigate('/home');
      } else {
        navigate('/join');
      }
    }, 3000);
    return () => {
      clearTimeout(animate);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className='bg-white h-screen flex flex-col justify-center items-center'>
      <img src='/images/bulb.png' className='w-16 animate-flyinup' />
      <img src='/images/별돌이logo.svg' className='w-48 z-20' />
      <div className='flex'>
        <div className='font-hanaBold text-5xl mb-2 text-hanaRed animate-tada'>
          똑
        </div>
        <div className='font-hanaBold text-5xl mb-2 text-hanaRed animate-tada'>
          똑
        </div>
        <div className='font-hanaBold text-5xl mb-2 text-hanaGreen '>하</div>
        <div className='font-hanaBold text-5xl mb-2 text-hanaGreen '>나</div>
      </div>

      <div
        className={`font-hanaLight text-2xl text-hanaGreen animate-fadeinbounceup
      ${!visible && 'opacity-0'}`}
      >
        <span className='text-hanaRed font-hanaMedium'>재</span>테크{' '}
        <span className='text-hanaRed font-hanaMedium'>습</span>관{' '}
        <span className='text-hanaRed font-hanaMedium'>기</span>르기
      </div>
    </div>
  );
};
