import React, { useRef, useState } from 'react';
import { PasswordForm } from '../../components/molecules/PasswordForm';
import { Button } from '../../components/ui/Button';
import Topbar from '../../components/Topbar';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const pwdRef = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const [isPwdCorrect, setIsPwdCorrect] = useState<boolean>(true);
  const [re, setRe] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div className='bg-white h-screen flex flex-col items-center'>
      <Topbar title='로그인' />
      <div className='flex flex-col justify-between items-center p-10 w-full h-full'>
        <PasswordForm
          title='간편비밀번호를 입력해주세요'
          inputRef={pwdRef}
          isCorrect={isPwdCorrect}
          re={re}
          checkPwdCondition={() => setIsActive(true)}
        />

        <Button
          text='다음'
          onClick={() => {
            navigate('/home');
          }}
          isActive={isActive}
        />
      </div>
    </div>
  );
};
