import { useRef, useState } from 'react';
import Topbar from '../../components/Topbar';
import { Button } from '../../components/ui/Button';
import { ChoiceMenu } from '../../components/ChoiceMenu';
import { ChoiceItem } from '../../components/molecules/ChoiceItem';

type userInfo = {
  name: string;
  mobile_carrier: '' | 'SKT' | 'KT' | 'LG U+';
  phone_number: string;
  job: string;
  asset_status: string;
  checkCard: boolean;
  password: number;
};

export const Mission2AccountOpening = () => {
  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [btnActive, setBtnActive] = useState<boolean>(true);
  const [info, setInfo] = useState<userInfo>({
    name: '',
    mobile_carrier: '',
    phone_number: '',
    job: '',
    asset_status: '',
    checkCard: false,
    password: 0,
  });

  const phoneInput = useRef<HTMLInputElement | null>(null);
  const nameInput = useRef<HTMLInputElement | null>(null);

  const nextHandler = () => {
    setCurrentNumber((prev) => prev + 1);
    setBtnActive(false);
  };

  // 유효성 체크
  const checkEffectPhone = () => {
    if (phoneInput.current?.value === '') {
      console.log('채워주겡');
      return;
    }
  };
  const checkEffectName = () => {};

  // 모달 선택 변경
  const checkMobileCarrierModal = (
    prev: userInfo,
    name: 'SKT' | 'KT' | 'LG U+'
  ) => {
    setInfo({
      ...prev,
      mobile_carrier: name,
    });
    setShowModal(false);
  };

  console.log('info>>', info);
  // 종류, 비밀번호(백에게 넘길 데이터)
  return (
    <>
      {showModal && (
        <ChoiceMenu title='통신사' onClose={() => setShowModal(!showModal)}>
          <div className='flex flex-col justify-center gap-5'>
            {currentNumber === 1 && (
              <>
                <ChoiceItem
                  name='SKT'
                  onClick={() => checkMobileCarrierModal(info, 'SKT')}
                />
                <ChoiceItem
                  name='KT'
                  onClick={() => checkMobileCarrierModal(info, 'KT')}
                />
                <ChoiceItem
                  name='LG U+'
                  onClick={() => checkMobileCarrierModal(info, 'LG U+')}
                />
              </>
            )}
          </div>
        </ChoiceMenu>
      )}
      <div className='bg-white flex flex-col items-center h-screen w-full'>
        <Topbar title='머니박스 가입' />
        <div className='flex flex-col justify-between items-center w-full h-full py-10'>
          <div className='flex flex-col px-10 w-full'>
            {currentNumber !== 0 && (
              <h1 className='text-4xl font-hanaMedium mb-7 whitespace-pre-line leading-snug'>
                {currentNumber === 1 && '정보를 확인해주세요'}
                {currentNumber === 2 &&
                  `휴대폰으로 전송된 인증번호\n 6자리를 입력해주세요`}
                {currentNumber === 3 && `${'ㅇㅇ'}님의 직업을\n 선택해주세요`}
                {currentNumber === 4 &&
                  `${'ㅇㅇ'}님의 자산현황을\n 선택해주세요`}
                {currentNumber === 5 &&
                  `안전한 금융거래를 위해\n 확인해 주세요`}
                {(currentNumber === 6 || currentNumber === 7) &&
                  '머니박스 통장을 만들게요'}
                {currentNumber === 8 && `신청내역을\n 확인해주세요`}
              </h1>
            )}
            {currentNumber === 0 && (
              <div className='flex flex-col justify-center items-center mt-24 w-full gap-16'>
                <h1 className='font-hanaMedium text-3xl text-center'>
                  비대면 실명 확인을 위해
                  <br /> 준비해 주세요
                </h1>
                <div
                  className='flex w-11/12 bg-[#EBEBEB] p-8 rounded-xl cursor-pointer'
                  onClick={() => nextHandler()}
                >
                  <img src='/icons/call.svg' alt='call' className='w-13' />
                  <div className='font-hanaMedium text-xl ml-3'>
                    휴대폰
                    <p className='text-[#595959]'>본인 명의 기기</p>
                  </div>
                </div>
              </div>
            )}
            {currentNumber === 1 && (
              <div className='font-hanaMedium flex flex-col justify-center gap-10'>
                <div className='flex flex-col gap-1 text-2xl'>
                  <label className='text-[#979797]'>휴대폰번호</label>
                  <input
                    type='tel'
                    ref={phoneInput}
                    onBlur={checkEffectPhone}
                    className='border-b-[1px] border-black py-3'
                  />
                </div>
                <div className='flex flex-col gap-1 text-2xl'>
                  <label className='text-[#979797]'>통신사</label>
                  <input
                    type='button'
                    value={info.mobile_carrier}
                    className='border-b-[1px] border-black py-3 text-start'
                    onClick={() => setShowModal(true)}
                  />
                </div>
                <div className='flex flex-col gap-1 text-2xl'>
                  <label className='text-[#979797]'>이름</label>
                  <input
                    type='text'
                    ref={nameInput}
                    onBlur={checkEffectName}
                    className='border-b-[1px] border-black py-3'
                  />
                </div>
              </div>
            )}
          </div>
          <Button
            text={
              currentNumber === 0
                ? '시작하기'
                : currentNumber === 9
                  ? '완료'
                  : '다음'
            }
            onClick={() => nextHandler()}
            isActive={btnActive}
          />
        </div>
      </div>
    </>
  );
};
