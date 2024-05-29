import { FC, useRef, useState } from 'react';

interface IProps {
  password: string;
  onClick: () => void;
}

export const AccountPwCheck: FC<IProps> = ({ password, onClick }) => {
  const [isPwCheck, setIsPwCheck] = useState<boolean>(true);
  const pwCheckInput = useRef<HTMLInputElement | null>(null);

  const checkEffectPwCheck = () => {
    if (pwCheckInput.current) {
      if (
        pwCheckInput.current?.value === '' ||
        pwCheckInput.current?.value !== password
      ) {
        setIsPwCheck(false);
        return;
      }
      setIsPwCheck(true);
      onClick();
    }
  };

  return (
    <div className='w-full flex flex-col font-hanaMedium'>
      <div className='flex flex-col gap-1 text-2xl'>
        <label className='text-[#979797]'>계좌비밀번호 확인</label>
        <input
          type='text'
          ref={pwCheckInput}
          maxLength={4}
          placeholder='숫자 4자리 입력'
          onBlur={checkEffectPwCheck}
          className='border-b-[0.05rem] border-black py-3 placeholder:text-[#D1D1D1]'
        />
      </div>
      {!isPwCheck && (
        <span className='font-hanaLight text-lg text-red-600 mt-2'>
          비밀번호가 일치하지 않습니다.
        </span>
      )}
    </div>
  );
};
