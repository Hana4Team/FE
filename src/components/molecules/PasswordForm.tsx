import React, { FC, ReactNode, useEffect, useRef } from 'react';

interface IProps {
  title: ReactNode;
  inputRef: React.MutableRefObject<(HTMLInputElement | null)[]>;
  step?: number;
  isCorrect: boolean;
  re: boolean;
  checkPwdCondition?: () => void;
}

export const PasswordForm: FC<IProps> = ({
  title,
  inputRef,
  step,
  isCorrect,
  re,
  checkPwdCondition,
}) => {
  useEffect(() => {
    if (step === 6) {
      inputRef.current.forEach((input) => {
        if (input) {
          input.value = '';
        }
      });
    }
  }, [step, re]);

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, [step, re]);

  const handleInput = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    if (/^\d$/.test(value)) {
      if (index < inputRef.current.length - 1) {
        inputRef.current[index + 1]?.focus();
      }
    } else {
      event.target.value = '';
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Backspace') {
      if (!inputRef.current[index]?.value && index >= 0) {
        inputRef.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='font-hanaBold text-4xl text-center'>{title}</div>
      {!isCorrect && (
        <div className='font-hanaMedium mt-6 text-xl text-gray-500'>
          간편비밀번호를 다시 입력하세요
        </div>
      )}
      <div className='my-16 flex'>
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            placeholder='●'
            type='password'
            maxLength={1}
            className='text-4xl w-12 text-center mx-1 caret-transparent'
            ref={(el) => (inputRef.current[index] = el)}
            onChange={(e) => handleInput(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onBlur={() => checkPwdCondition?.()}
          />
        ))}
      </div>
    </div>
  );
};
