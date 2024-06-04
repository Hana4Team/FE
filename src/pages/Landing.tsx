import React, { useEffect } from 'react';
import { getCookie } from '../utils/cookie';
import { useNavigate } from 'react-router-dom';

export const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (getCookie('phone')) {
        navigate('/home');
      } else {
        navigate('/join');
      }
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className='bg-white h-screen flex flex-col justify-center items-center'>
      <img src='/images/별돌이logo.svg' className='w-48' />
      <div className='font-hanaBold text-5xl mb-2 text-hanaRed'>
        똑똑<span className='text-hanaGreen'>하나</span>
      </div>
      <div className='font-hanaLight text-2xl text-hanaGreen'>
        <span className='text-hanaRed font-hanaMedium'>재</span>테크{' '}
        <span className='text-hanaRed font-hanaMedium'>습</span>관{' '}
        <span className='text-hanaRed font-hanaMedium'>기</span>르기
      </div>
    </div>
  );
};
