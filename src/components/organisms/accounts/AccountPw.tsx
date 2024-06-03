import { FC, useRef } from 'react';
import { pwPattern } from '../../../utils/checkValidation';

interface IProps {
  onClick: (password: string) => void;
  isBtnDisabled: (disable: boolean) => void;
}

export const AccountPw: FC<IProps> = ({ onClick, isBtnDisabled }) => {
  const pwInput = useRef<HTMLInputElement | null>(null);

  const checkEffectPw = () => {
    if (pwInput.current) {
      if (
        pwInput.current?.value === '' ||
        pwPattern.test(pwInput.current?.value) === false
      ) {
        isBtnDisabled(false);
        return;
      }
      isBtnDisabled(true);
      onClick(pwInput.current?.value);
    }
  };

  return (
    <div className='w-full flex flex-col gap-10 font-hanaMedium'>
      <div className='flex flex-col gap-1 text-2xl'>
        <label className='text-[#979797]'>계좌비밀번호</label>
        <input
          type='password'
          ref={pwInput}
          maxLength={4}
          placeholder='숫자 4자리 입력'
          onChange={checkEffectPw}
          className='border-b-[0.05rem] border-black py-3 placeholder:text-[#D1D1D1]'
        />
      </div>
    </div>
  );
};
