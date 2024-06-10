import React, { ChangeEvent, useRef, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { PasswordForm } from '../../components/molecules/PasswordForm';
import { ConfirmCard } from '../../components/molecules/ConfirmCard';
import Topbar from '../../components/Topbar';
import { CertiNumber } from '../../components/molecules/CertiNumber';
import { SelectMenu } from '../../components/molecules/SelectMenu';
import { ChoiceMenu } from '../../components/ChoiceMenu';
import { useNavigate } from 'react-router-dom';
import { phoneNumberPattern } from '../../utils/checkValidation';
import { ChoiceItem } from '../../components/molecules/ChoiceItem';
import { phoneNumberAutoHyphen } from '../../utils/phoneNumberAutoHyphen';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { JoinReqType } from '../../types/users';
import { setCookie } from '../../utils/cookie';

export const Join = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const birthRef = useRef<HTMLInputElement | null>(null);
  const [telecom, setTelecom] = useState<string>('');
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const pwdRef = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const confirmPwdRef = useRef<(HTMLInputElement | null)[]>(
    Array(6).fill(null)
  );

  const [inputs, setInputs] = useState<JoinReqType>({
    name: '',
    birthDate: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const code = useRef<string>('');
  const [isName, setIsName] = useState<boolean>(true);
  const [isBirth, setIsBirth] = useState<boolean>(true);
  const [isPhone, setIsPhone] = useState<boolean>(true);
  const [isMsgCheck, setIsMsgCheck] = useState<boolean>(false);
  const [isPwdCorrect, setIsPwdCorrect] = useState<boolean>(true);
  const [re, setRe] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const showModalHandler = () => setShowModal(!showModal);

  const { mutate: postJoin, data: joinResult } = useMutation({
    mutationFn: (input: JoinReqType) => {
      const res = ApiClient.getInstance().postJoin(input);
      return res;
    },
    onSuccess: (data) => {
      setCookie('phoneNumber', data.phoneNumber);
      setIsActive(true);
      setStep((prev) => prev + 1);
    },
  });
  const { mutate: postMessage } = useMutation({
    mutationFn: (phoneNumber: string) => {
      const res = ApiClient.getInstance().postMessage(phoneNumber);
      return res;
    },
    onSuccess: (data) => {
      code.current = data.code;
    },
  });

  const onClicktelecom = (item: string) => {
    setTelecom(item);
    showModalHandler();
  };

  const checkCondition = (title: string) => {
    if (title === 'name') {
      if (!!nameRef.current?.value.length) {
        setIsName(true);
        setIsActive(true);
      } else {
        setIsName(false);
        setIsActive(false);
      }
    }
    if (title === 'birth') {
      if (birthRef.current?.value !== '') {
        setIsBirth(true);
        setIsActive(true);
      } else {
        setIsBirth(false);
        setIsActive(false);
      }
    }
    if (title === 'phone') {
      if (phoneNumberPattern.test(phoneRef.current!.value)) {
        setIsPhone(true);
        const updatedPhoneNumber = phoneRef.current!.value.split('-').join('');
        setInputs({ ...inputs, phoneNumber: updatedPhoneNumber });
        setIsActive(true);
      } else {
        setIsPhone(false);
        setIsActive(false);
      }
    }
    if (title === 'pwd') {
      if (pwdRef.current.map((p) => p?.value).join('').length === 6)
        setIsActive(true);
      else setIsActive(false);
    }
    if (title === 'confirmPwd') {
      if (confirmPwdRef.current.map((p) => p?.value).join('').length === 6) {
        setIsActive(true);
        if (
          confirmPwdRef.current.map((p) => p?.value).join('') ===
          inputs.password
        ) {
          const updatedConfirmPassword = confirmPwdRef.current
            .map((p) => p?.value)
            .join('');
          setInputs({
            ...inputs,
            confirmPassword: updatedConfirmPassword,
          });
        }
      } else setIsActive(false);
    }
  };

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatttedPhoneNumber = phoneNumberAutoHyphen(e.target.value);
    if (phoneRef.current) phoneRef.current.value = formatttedPhoneNumber;
  };

  const pwdCheck = () => {
    if (inputs.confirmPassword === inputs.password) {
      setIsPwdCorrect(true);
      setIsActive(true);
      return true;
    } else {
      setIsPwdCorrect(false);
      setIsActive(false);
      setRe((prev) => !prev);
      return false;
    }
  };

  const prevStep = () => {
    if (step > 1 && step !== 5) setStep((prev) => prev - 1);
    if (step === 5) {
      setStep((prev) => prev - 1);
      setIsActive(true);
    }
  };

  const nextStep = () => {
    if (step === 1 && isName) {
      setInputs({ ...inputs, name: nameRef.current!.value });
      setStep((prev) => prev + 1);
      setIsActive(false);
    }
    if (step === 2 && isBirth) {
      setInputs({ ...inputs, birthDate: birthRef.current!.value });
      setStep((prev) => prev + 1);
      setIsActive(false);
    }
    if (step === 3 && isPhone) {
      setStep((prev) => prev + 1);
      postMessage(inputs.phoneNumber);
      setIsActive(false);
    }
    if (step === 4) {
      setStep((prev) => prev + 1);
      setIsActive(false);
    }
    if (step === 5) {
      setInputs({
        ...inputs,
        password: pwdRef.current.map((p) => p?.value).join(''),
      });
      setStep((prev) => prev + 1);
      setIsActive(false);
    }
    if (step === 6) {
      pwdCheck() && postJoin(inputs);
    }
    if (step === 7) {
      navigate('/home');
    }
  };

  return (
    <>
      {showModal && (
        <>
          <ChoiceMenu title='통신사 선택' onClose={() => showModalHandler()}>
            <div className='flex flex-col gap-5'>
              <ChoiceItem name='SKT' onClick={() => onClicktelecom('SKT')} />
              <ChoiceItem name='KT' onClick={() => onClicktelecom('KT')} />
              <ChoiceItem
                name='LG U+'
                onClick={() => onClicktelecom('LG U+')}
              />
            </div>
          </ChoiceMenu>
        </>
      )}
      <div className='bg-white h-screen flex flex-col items-center'>
        <Topbar title='회원가입' onClick={prevStep} />
        <div className='flex flex-col justify-between items-center w-full h-full p-10'>
          {step === 1 ? (
            <div className='w-full flex flex-col'>
              <div className='font-hanaBold text-4xl'>이름을 입력해주세요</div>
              <input
                className=' w-full font-hanaMedium text-2xl border-b-[1px] border-black mt-12 p-2'
                placeholder='이름'
                type='text'
                ref={nameRef}
                onBlur={() => checkCondition('name')}
              />
              {!isName && (
                <div className='font-hanaMedium mt-2 text-lg text-red-600'>
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
                onBlur={() => checkCondition('birth')}
                ref={birthRef}
              />
              {!isBirth && (
                <div className='font-hanaMedium  mt-2 text-lg text-red-600'>
                  생년월일을 입력해주세요
                </div>
              )}
              <div className='font-hanaMedium text-lg mt-10'>이름</div>
              <div className='font-hanaMedium text-2xl'>{inputs.name}</div>
            </div>
          ) : step === 3 ? (
            <div className='w-full flex flex-col'>
              <div className='font-hanaBold text-4xl mb-16'>
                휴대폰번호를 입력해주세요
              </div>
              <SelectMenu
                onClick={() => showModalHandler()}
                type='통신사'
                choice={telecom}
              />
              <input
                className='w-full font-hanaMedium text-2xl border-b-[1px] border-black mt-12 pb-2'
                placeholder='휴대폰 번호'
                type='tel'
                maxLength={13}
                ref={phoneRef}
                onBlur={() => checkCondition('phone')}
                onChange={(e) => handlePhone(e)}
              />
              {!isPhone && (
                <div className='font-hanaMedium mt-2 text-lg text-red-600'>
                  휴대폰번호를 정확히 입력해주세요
                </div>
              )}
              <div className='font-hanaMedium text-lg mt-10'>이름</div>
              <div className='font-hanaMedium text-2xl mb-4'>{inputs.name}</div>
              <div className='font-hanaMedium text-lg'>생년월일</div>
              <div className='font-hanaMedium text-2xl'>{inputs.birthDate}</div>
            </div>
          ) : step === 4 ? (
            <>
              <CertiNumber
                telecom={telecom}
                phoneNumber={inputs.phoneNumber}
                isMsgCheck={isMsgCheck}
                setIsMsgCheck={setIsMsgCheck}
                setIsActive={setIsActive}
                code={code.current}
              />
            </>
          ) : step === 5 ? (
            <PasswordForm
              title='간편비밀번호를 입력해주세요'
              inputRef={pwdRef}
              step={step}
              isCorrect={isPwdCorrect}
              re={re}
              checkPwdCondition={() => checkCondition('pwd')}
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
              checkPwdCondition={() => checkCondition('confirmPwd')}
            />
          ) : (
            <ConfirmCard text='회원가입 완료' />
          )}

          <Button text='다음' onClick={() => nextStep()} isActive={isActive} />
        </div>
      </div>
    </>
  );
};
