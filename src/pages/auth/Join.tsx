import React, { ChangeEvent, useRef, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { PasswordForm } from '../../components/molecules/PasswordForm';
import { ConfirmCard } from '../../components/molecules/ConfirmCard';
import Topbar from '../../components/Topbar';
import { CertiNumber } from '../../components/molecules/CertiNumber';
import { SelectMenu } from '../../components/molecules/SelectMenu';
import { ChoiceMenu } from '../../components/ChoiceMenu';
import { AccountDetailItem } from '../../components/molecules/AccountDetailItem';
import { useNavigate } from 'react-router-dom';

interface inputsProps {
  name: string;
  birth: string;
  telecom: string;
  phoneNumber: string;
  pwd: string;
}

const telecomArr = ['SKT', 'KT', 'LG U+'];

export const Join = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const birthRef = useRef<HTMLInputElement | null>(null);
  const [telecom, setTelecom] = useState<string>('');
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const [phoneNum, setPhoneNum] = useState<string>('');
  const pwdRef = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const confirmPwdRef = useRef<(HTMLInputElement | null)[]>(
    Array(6).fill(null)
  );

  const [inputs, setInputs] = useState<inputsProps>({
    name: '',
    birth: '',
    telecom: '',
    phoneNumber: '',
    pwd: '',
  });

  const [isName, setIsName] = useState<boolean>(true);
  const [isBirth, setIsBirth] = useState<boolean>(true);
  const [isPhone, setIsPhone] = useState<boolean>(true);
  const [isPwdCorrect, setIsPwdCorrect] = useState<boolean>(true);
  const [re, setRe] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const showModalHandler = () => setShowModal(!showModal);

  const onClicktelecom = (item: string) => {
    setTelecom(item);
    showModalHandler();
  };

  const prevStep = () => {
    if (step > 1 && step !== 5) setStep((prev) => prev - 1);
    if (step === 5) {
      setStep((prev) => prev - 1);
      setIsActive(true);
    }
  };

  const checkCondition = (title: string) => {
    if (title === 'name') {
      if (!!nameRef.current?.value.length) {
        setIsName(true);
        setIsActive(true);
      } else {
        setIsPhone(false);
        setIsActive(false);
      }
    }
    if (title === 'birth') {
      if (birthRef.current?.value !== '') {
        setIsBirth(true);
        setIsActive(true);
      } else {
        setIsPhone(false);
        setIsActive(false);
      }
    }
    if (title === 'phone') {
      if (phoneRef.current!.value.length === 13) {
        setIsPhone(true);
        setIsActive(true);
      } else {
        setIsPhone(false);
        setIsActive(false);
      }
    }
    if (title === 'pwd') {
      if (pwdRef.current.map((p) => p?.value).join('').length === 6) {
        setIsActive(true);
      }
    }
    if (title === 'confirmPwd') {
      if (confirmPwdRef.current.map((p) => p?.value).join('').length === 6)
        setIsActive(true);
    }
  };

  const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
    const value = phoneRef.current?.value.replace(/\D+/g, '');
    const numberLength = 11;

    let result = '';

    for (let i = 0; i < value!.length && i < numberLength; i += 1) {
      switch (i) {
        case 3:
          result += '-';
          break;
        case 7:
          result += '-';
          break;
        default:
          break;
      }
      result += value?.[i];
    }
    phoneRef.current!.value = result;

    setPhoneNum(e.target.value);
  };

  const pwdCheck = () => {
    if (confirmPwdRef.current.map((p) => p?.value).join('') === inputs.pwd) {
      setIsPwdCorrect(true);
      return true;
    } else {
      setIsPwdCorrect(false);
      setIsActive(false);
      setRe((prev) => !prev);
      return false;
    }
  };

  const nextStep = () => {
    if (step === 1 && isName) {
      setInputs({ ...inputs, name: nameRef.current!.value });
      setStep((prev) => prev + 1);
      setIsActive(false);
    }
    if (step === 2 && isBirth) {
      setInputs({ ...inputs, birth: birthRef.current!.value });
      setStep((prev) => prev + 1);
      setIsActive(false);
    }
    if (step === 3 && isPhone) {
      setInputs({
        ...inputs,
        phoneNumber: phoneRef.current!.value.split('-').join(''),
        telecom: telecom,
      });
      setStep((prev) => prev + 1);
      // setIsActive(false);
    }
    if (step === 4) {
      setStep((prev) => prev + 1);
      setIsActive(false);
    }
    if (step === 5) {
      setInputs({
        ...inputs,
        pwd: pwdRef.current.map((p) => p?.value).join(''),
      });
      setStep((prev) => prev + 1);
      setIsActive(false);
    }
    if (step === 6) {
      if (pwdCheck()) {
        setIsActive(true);
        setStep((prev) => prev + 1);
      }
    }
    if (step === 7) {
      navigate('/login');
    }
  };

  return (
    <>
      {showModal && (
        <ChoiceMenu title='통신사 선택' onClose={() => showModalHandler()}>
          <div className='flex flex-col items-start'>
            {telecomArr &&
              telecomArr.map((item) => (
                <button
                  className='py-3 text-lg font-hanaCM'
                  onClick={() => onClicktelecom(item)}
                >
                  {item}
                </button>
              ))}
          </div>
        </ChoiceMenu>
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
                onBlur={() => checkCondition('birth')}
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
                value={phoneNum}
                ref={phoneRef}
                onBlur={() => checkCondition('phone')}
                onChange={(e) => handlePhone(e)}
              />
              {!isPhone && (
                <div className='font-hanaMedium text-gray-400'>
                  휴대폰번호를 정확히 입력해주세요
                </div>
              )}
              <div className='font-hanaMedium text-lg mt-10'>이름</div>
              <div className='font-hanaMedium text-2xl mb-4'>{inputs.name}</div>
              <div className='font-hanaMedium text-lg'>생년월일</div>
              <div className='font-hanaMedium text-2xl'>{inputs.birth}</div>
            </div>
          ) : step === 4 ? (
            <CertiNumber telecom={telecom} phoneNumber={inputs.phoneNumber} />
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
