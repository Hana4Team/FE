import React, { useRef, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { PasswordForm } from '../../components/molecules/PasswordForm';
import { ConfirmCard } from '../../components/molecules/ConfirmCard';
import Topbar from '../../components/Topbar';
import { CertiNumber } from '../../components/molecules/CertiNumber';

interface inputsProps {
  name: string;
  birth: string;
  phoneNumber: string;
  pwd: string;
}

export const Join = () => {
  const [step, setStep] = useState<number>(1);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const birthRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const pwdRef = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const confirmPwdRef = useRef<(HTMLInputElement | null)[]>(
    Array(6).fill(null)
  );

  const [inputs, setInputs] = useState<inputsProps>({
    name: '',
    birth: '',
    phoneNumber: '',
    pwd: '',
  });

  const [isName, setIsName] = useState<boolean>(true);
  const [isBirth, setIsBirth] = useState<boolean>(true);
  const [isPhone, setIsPhone] = useState<boolean>(true);
  const [isPwdCorrect, setIsPwdCorrect] = useState<boolean>(true);
  const [re, setRe] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  const phoneReg = /^[0-9]{10,11}$/;

  const pwdCheck = () => {
    console.log(confirmPwdRef.current.map((p) => p?.value).join(''));
    console.log(inputs.pwd);
    if (confirmPwdRef.current.map((p) => p?.value).join('') === inputs.pwd) {
      setIsPwdCorrect(true);
      return true;
    } else {
      setIsPwdCorrect(false);
      setRe((prev) => !prev);
      return false;
    }
  };

  const goToNext = () => {
    setStep((prev) => prev + 1);
  };

  const nextStep = () => {
    if (step === 1 && isName) {
      setInputs({ ...inputs, name: nameRef.current!.value });
      setStep((prev) => prev + 1);
      //setIsActive(false);
    }
    if (step === 2 && isBirth) {
      setInputs({ ...inputs, birth: birthRef.current!.value });
      setStep((prev) => prev + 1);
      //setIsActive(false);
    }
    if (step === 3 && isPhone) {
      setInputs({ ...inputs, phoneNumber: phoneRef.current!.value });
      setStep((prev) => prev + 1);
      //setIsActive(false);
    }
    if (step === 4) {
      setStep((prev) => prev + 1);
      //setIsActive(false);
    }
    if (step === 5) {
      if (pwdRef.current.map((p) => p?.value).join('').length === 6) {
        setInputs({
          ...inputs,
          pwd: pwdRef.current.map((p) => p?.value).join(''),
        });
        setStep((prev) => prev + 1);
        //setIsActive(false);
      }
    }
    if (step === 6) {
      if (confirmPwdRef.current.map((p) => p?.value).join('').length === 6) {
        pwdCheck() && goToNext();
      }
    }
  };

  return (
    <div className='bg-white h-screen flex flex-col items-center'>
      <Topbar title='회원가입' />
      <div className='flex flex-col justify-between items-center w-full h-full p-10'>
        {step === 1 ? (
          <div className='w-full flex flex-col'>
            <div className='font-hanaBold text-4xl'>이름을 입력해주세요</div>
            <input
              className=' w-full font-hanaMedium text-2xl border-b-[1px] border-black mt-12 p-2'
              placeholder='이름'
              type='text'
              ref={nameRef}
              onBlur={() => {
                setIsName(!!nameRef.current?.value.length);
                setIsActive(true);
              }}
            />
            {!isName && (
              <div className='font-hanaMedium mt-2 text-gray-400'>
                이름을 입력해주세요
              </div>
            )}
          </div>
        ) : step === 2 ? (
          <div className='w-full flex flex-col'>
            <div className='font-hanaBold text-4xl '>
              생년월일을 입력해주세요
            </div>
            <input
              type='date'
              placeholder='생년월일'
              className='w-full font-hanaMedium text-2xl border-b-[1px] border-black mt-12 p-2'
              onBlur={() => {
                setIsBirth(birthRef.current?.value !== '');
                setIsActive(true);
              }}
              ref={birthRef}
            />
            {!isBirth && (
              <div className='font-hanaMedium mt-2 text-gray-400'>
                생년월일을 입력해주세요
              </div>
            )}
            <div className='font-hanaMedium text-lg mt-10'>이름</div>
            <div className='font-hanaMedium text-2xl'>{inputs.name}</div>
          </div>
        ) : step === 3 ? (
          <div className='w-full flex flex-col'>
            <div className='font-hanaBold text-4xl'>
              휴대폰번호를 입력해주세요
            </div>
            <input
              className='w-full font-hanaMedium text-2xl border-b-[1px] border-black mt-12 p-2'
              type='number'
              placeholder='휴대폰 번호'
              ref={phoneRef}
              onBlur={() => setIsPhone(phoneReg.test(phoneRef.current!.value))}
            />
            {!isPhone && (
              <div className='font-hanaMedium mt-2 text-gray-400'>
                휴대폰번호를 정확히 입력해주세요
              </div>
            )}
            <div className='font-hanaMedium text-lg mt-10'>이름</div>
            <div className='font-hanaMedium text-2xl mb-4'>{inputs.name}</div>
            <div className='font-hanaMedium text-lg'>생년월일</div>
            <div className='font-hanaMedium text-2xl'>{inputs.birth}</div>
          </div>
        ) : step === 4 ? (
          <CertiNumber phoneNumber={inputs.phoneNumber} />
        ) : step === 5 ? (
          <PasswordForm
            title='간편비밀번호를 입력해주세요'
            inputRef={pwdRef}
            step={step}
            isCorrect={isPwdCorrect}
            re={re}
          />
        ) : step === 6 ? (
          <PasswordForm
            title={
              <span>
                간편비밀번호를 한번 더 <br /> 입력해주세요
              </span>
            }
            inputRef={confirmPwdRef}
            step={step}
            isCorrect={isPwdCorrect}
            re={re}
          />
        ) : (
          <ConfirmCard text='회원가입 완료' />
        )}

        <Button text='다음' onClick={() => nextStep()} isActive={isActive} />
      </div>
    </div>
  );
};
