import { useRef, useState } from 'react';
import Topbar from '../../components/Topbar';
import { Button } from '../../components/ui/Button';
import { ChoiceMenu } from '../../components/ChoiceMenu';
import { ChoiceItem } from '../../components/molecules/ChoiceItem';
import { SelectMenu } from '../../components/molecules/SelectMenu';
import { phoneNumberAutoHyphen } from '../../utils/phoneNumberAutoHyphen';
import { phoneNumberPattern } from '../../utils/checkValidation';
import { ConfirmCard } from '../../components/molecules/ConfirmCard';
import { useLocation, useNavigate } from 'react-router-dom';
import { AccountPwCheck } from '../../components/organisms/accounts/AccountPwCheck';
import { AccountPw } from '../../components/organisms/accounts/AccountPw';
import { useMutation } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { MsgCheckType } from '../../types/users';

type userInfo = {
  name: string | null;
  mobile_carrier: '' | 'SKT' | 'KT' | 'LG U+';
  phone_number: string | null;
  certification_number: string | null;
  job: string;
  asset_status: string;
  checkCard: boolean | null;
  password: string;
  productId: number;
};

/**
 * 종류, 비밀번호(백에게 넘길 데이터)
 */
export const Mission2AccountOpening = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const productId = location.state.product.productsId;
  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [btnActive, setBtnActive] = useState<boolean>(true);
  const [info, setInfo] = useState<userInfo>({
    name: null,
    mobile_carrier: '',
    phone_number: null,
    certification_number: null,
    job: '',
    asset_status: '',
    checkCard: null,
    password: '',
    productId: productId,
  });

  const phoneInput = useRef<HTMLInputElement | null>(null);
  const nameInput = useRef<HTMLInputElement | null>(null);
  const realCertificatioNnumber = useRef<string>('');
  const certificationNumberInput = useRef<HTMLInputElement | null>(null);

  const postMessage = useMutation({
    mutationFn: (phoneNumber: string) =>
      ApiClient.getInstance().postMessage(phoneNumber),
    onSuccess: (data) => {
      realCertificatioNnumber.current = data.code;
      setCurrentNumber((prev) => prev + 1);
    },
  });

  const postMessageCheck = useMutation({
    mutationFn: (codeReq: MsgCheckType) =>
      ApiClient.getInstance().postMsgCheck(codeReq),
    onSuccess: (data) => {
      if (data.check === 'match') setBtnActive(true);
      else alert('인증번호가 맞지 않습니다.');
    },
    onError: () => {
      alert('인증을 실패하셨습니다.');
      navigate('/mission');
    },
  });

  const postOpendMoneyBox = useMutation({
    mutationFn: () =>
      ApiClient.getInstance().postOpendMoneyBox(info.password, productId),
    onSuccess: (data) => {
      if (data.accountId) setCurrentNumber((prev) => prev + 1);
      else {
        alert('상품 가입에 실패하였습니다.');
        navigate('/mission');
      }
    },
    onError: () => {
      alert('상품 가입에 실패하였습니다.');
      navigate('/mission');
    },
  });

  const nextHandler = () => {
    if (currentNumber === 1) {
      setBtnActive(false);
      if (
        btnActive &&
        info.name &&
        info.name !== '' &&
        info.phone_number &&
        info.phone_number !== '' &&
        info.mobile_carrier !== ''
      ) {
        postMessage.mutate(info.phone_number.split('-').join(''));
        return;
      } else {
        return;
      }
    }
    if (currentNumber === 8) {
      postOpendMoneyBox.mutate();
      return;
    }
    if (currentNumber === 9) {
      navigate('/moneyBox', {
        state: {
          prev: true,
        },
      });
      return;
    }
    setCurrentNumber((prev) => prev + 1);
    currentNumber === 7 ? setBtnActive(true) : setBtnActive(false);
  };

  const phoneInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatttedPhoneNumber = phoneNumberAutoHyphen(e.target.value);
    if (phoneInput.current) phoneInput.current.value = formatttedPhoneNumber;
  };

  // 1단계 유효성 체크
  const checkEffectPhone = () => {
    if (phoneInput.current) {
      if (
        phoneInput.current?.value === '' ||
        phoneNumberPattern.test(phoneInput.current.value) === false
      ) {
        setInfo({
          ...info,
          phone_number: '',
        });
        return;
      }
      setInfo({
        ...info,
        phone_number: phoneInput.current?.value,
      });
      if (info.name && info.name !== '' && info.mobile_carrier !== '') {
        setBtnActive(true);
      }
    }
  };

  const checkEffectName = () => {
    if (nameInput.current) {
      if (nameInput.current?.value === '') {
        setInfo({
          ...info,
          name: '',
        });
        return;
      }
      setInfo({
        ...info,
        name: nameInput.current?.value,
      });
      if (
        info.phone_number !== '' &&
        info.phone_number &&
        info.mobile_carrier !== ''
      ) {
        setBtnActive(true);
      }
    }
  };

  // 모달 선택 변경
  const checkMobileCarrierModal = (name: 'SKT' | 'KT' | 'LG U+') => {
    setInfo({
      ...info,
      mobile_carrier: name,
    });
    setShowModal(false);
    if (
      info.name !== '' &&
      info.name &&
      info.phone_number !== '' &&
      info.phone_number
    )
      setBtnActive(true);
  };

  // 직업 선택 변경
  const checkJobrModal = (job: string) => {
    setInfo({
      ...info,
      job: job,
    });
    setShowModal(false);
    setBtnActive(true);
  };

  // 자산 선택 변경
  const checkAssetrModal = (asset: string) => {
    setInfo({
      ...info,
      asset_status: asset,
    });
    setShowModal(false);
    setBtnActive(true);
  };

  // 2단계 유효성 체크
  const checkEffectCertification = () => {
    if (certificationNumberInput.current) {
      if (certificationNumberInput.current?.value === '') {
        setInfo({
          ...info,
          certification_number: '',
        });
        return;
      }
      setInfo({
        ...info,
        certification_number: certificationNumberInput.current?.value,
      });
    }
  };

  const checkCertificationHandler = () => {
    if (info.certification_number)
      postMessageCheck.mutate({
        code: realCertificatioNnumber.current,
        input: info.certification_number,
      });
  };

  const checkPwModal = (password: string) => {
    setInfo({
      ...info,
      password: password,
    });
  };

  return (
    <>
      {showModal && (
        <ChoiceMenu
          title={
            currentNumber === 1
              ? '통신사'
              : currentNumber === 3
                ? '직업'
                : '자산현황'
          }
          onClose={() => setShowModal(!showModal)}
        >
          <div className='flex flex-col justify-center gap-5'>
            {currentNumber === 1 && (
              <>
                <ChoiceItem
                  name='SKT'
                  onClick={() => checkMobileCarrierModal('SKT')}
                />
                <ChoiceItem
                  name='KT'
                  onClick={() => checkMobileCarrierModal('KT')}
                />
                <ChoiceItem
                  name='LG U+'
                  onClick={() => checkMobileCarrierModal('LG U+')}
                />
              </>
            )}
            {currentNumber === 3 && (
              <>
                <ChoiceItem
                  name='급여소득자'
                  onClick={() => checkJobrModal('급여소득자')}
                />
                <ChoiceItem
                  name='전문직'
                  onClick={() => checkJobrModal('전문직')}
                />
                <ChoiceItem
                  name='공무원'
                  onClick={() => checkJobrModal('공무원')}
                />
                <ChoiceItem
                  name='연금소득자'
                  onClick={() => checkJobrModal('연금소득자')}
                />
                <ChoiceItem
                  name='주부'
                  onClick={() => checkJobrModal('주부')}
                />
                <ChoiceItem
                  name='학생'
                  onClick={() => checkJobrModal('학생')}
                />
                <ChoiceItem
                  name='기타'
                  onClick={() => checkJobrModal('기타')}
                />
              </>
            )}
            {currentNumber === 4 && (
              <>
                <ChoiceItem
                  name='1,000만원 미만'
                  onClick={() => checkAssetrModal('1,000만원 미만')}
                />
                <ChoiceItem
                  name='1,000만원 ~ 1억원 미만'
                  onClick={() => checkAssetrModal('1,000만원 ~ 1억원 미만')}
                />
                <ChoiceItem
                  name='1억원 ~ 10억원 미만'
                  onClick={() => checkAssetrModal('1억원 ~ 10억원 미만')}
                />
                <ChoiceItem
                  name='10억원 ~ 100억원 미만'
                  onClick={() => checkAssetrModal('10억원 ~ 100억원 미만')}
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
            <h1 className='text-4xl font-hanaMedium mb-7 whitespace-pre-line leading-snug'>
              {currentNumber === 1 && '정보를 확인해주세요'}
              {currentNumber === 2 &&
                `휴대폰으로 전송된 인증번호\n 6자리를 입력해주세요`}
              {currentNumber === 3 && `${info.name}님의 직업을\n 선택해주세요`}
              {currentNumber === 4 &&
                `${info.name}님의 자산현황을\n 선택해주세요`}
              {currentNumber === 5 && `안전한 금융거래를 위해\n 확인해 주세요`}
              {(currentNumber === 6 || currentNumber === 7) &&
                '머니박스 통장을 만들게요'}
              {currentNumber === 8 && `신청내역을\n 확인해주세요`}
            </h1>

            {currentNumber === 0 && (
              <div className='flex flex-col justify-center items-center mt-24 w-full gap-16'>
                <h1 className='font-hanaMedium text-3xl text-center'>
                  비대면 실명 확인을 위해
                  <br /> 준비해 주세요
                </h1>
                <div className='flex w-11/12 bg-[#EBEBEB] p-8 rounded-xl'>
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
                    maxLength={13}
                    onInput={phoneInputHandler}
                    onBlur={checkEffectPhone}
                    className='border-b-[0.05rem] border-black py-3'
                  />
                  {info.phone_number === '' && (
                    <span className='font-hanaLight text-lg text-red-600 mt-2'>
                      휴대폰 번호를 정확히 입력해주세요!
                    </span>
                  )}
                </div>
                <div className='flex flex-col gap-5 text-2xl'>
                  <label className='text-[#979797]'>통신사</label>
                  <SelectMenu
                    onClick={() => setShowModal(true)}
                    type='통신사'
                    choice={info.mobile_carrier}
                  />
                </div>
                <div className='flex flex-col gap-1 text-2xl'>
                  <label className='text-[#979797]'>이름</label>
                  <input
                    type='text'
                    ref={nameInput}
                    onBlur={checkEffectName}
                    className='border-b-[0.05rem] border-black py-3'
                  />
                  {info.name === '' && (
                    <span className='font-hanaLight text-lg text-red-600 mt-2'>
                      이름을 정확히 입력해주세요!
                    </span>
                  )}
                </div>
              </div>
            )}
            {currentNumber === 2 && (
              <div className='w-full flex flex-col gap-3'>
                <p className='font-hanaRegular text-xl'>
                  {info.mobile_carrier} {info.phone_number}
                </p>
                <div className='flex justify-between gap-3 text-2xl items-center'>
                  <input
                    type='text'
                    maxLength={7}
                    placeholder='인증번호'
                    ref={certificationNumberInput}
                    onBlur={checkEffectCertification}
                    className='w-full border-b-[0.05rem] border-black py-3 placeholder-[#979797] font-hanaMedium text-2xl'
                  />
                  <button
                    onClick={checkCertificationHandler}
                    className='bg-[#D9D9D9] font-hanaMedium text-lg px-3 w-24 h-12 rounded-lg cursor-pointer'
                  >
                    확인
                  </button>
                </div>
                {info.certification_number === '' && (
                  <span className='font-hanaLight text-lg text-red-600 mt-2'>
                    인증번호를 확인해주세요!
                  </span>
                )}
              </div>
            )}
            {currentNumber === 3 && (
              <div className='w-full'>
                <div className='flex flex-col gap-5 text-2xl font-hanaMedium'>
                  <label className='text-[#979797]'>직업</label>
                  <SelectMenu
                    onClick={() => setShowModal(true)}
                    type='직업'
                    choice={info.job}
                  />
                </div>
              </div>
            )}
            {currentNumber === 4 && (
              <div className='w-full flex flex-col gap-10 font-hanaMedium'>
                <div className='flex flex-col gap-5 text-2xl'>
                  <label className='text-[#979797]'>자산현황</label>
                  <SelectMenu
                    onClick={() => setShowModal(true)}
                    type='자산현황'
                    choice={info.asset_status}
                  />
                </div>
                <div className='flex flex-col gap-5 text-2xl'>
                  <label className='text-[#979797]'>직업</label>
                  <div>
                    {info.job}
                    <p className='bg-black h-[0.05rem] mt-1'></p>
                  </div>
                </div>
              </div>
            )}
            {currentNumber === 5 && (
              <div className='w-full flex flex-col gap-10 font-hanaMedium'>
                <div className='flex flex-col gap-5 text-2xl'>
                  <label className='text-[#979797]'>자산현황</label>
                  <div>
                    {info.asset_status}
                    <p className='bg-black h-[0.05rem] mt-1'></p>
                  </div>
                </div>
                <div className='flex flex-col gap-5 text-2xl'>
                  <label className='text-[#979797]'>직업</label>
                  <div>
                    {info.job}
                    <p className='bg-black h-[0.05rem] mt-1'></p>
                  </div>
                </div>
                <h2 className='text-3xl'>체크카드 신청</h2>
                <div className='flex justify-between items-center gap-10'>
                  <button
                    onClick={() => {
                      setInfo({
                        ...info,
                        checkCard: true,
                      });
                      setBtnActive(true);
                    }}
                    className={`w-1/2 border rounded-xl font-hanaRegular py-4 text-2xl box-border ${info.checkCard ? 'border-[0.2rem] border-[#008485] text-[#008485]' : 'border-[#C0C0C0]'}`}
                  >
                    신청
                  </button>
                  <button
                    onClick={() => {
                      setInfo({
                        ...info,
                        checkCard: false,
                      });
                      setBtnActive(true);
                    }}
                    className={`w-1/2 border rounded-xl font-hanaRegular py-4 text-2xl box-border ${info.checkCard !== null && !info.checkCard ? 'border-[0.2rem] border-[#008485] text-[#008485]' : 'border-[#C0C0C0]'}`}
                  >
                    미신청
                  </button>
                </div>
              </div>
            )}
            {currentNumber === 6 && (
              <AccountPw
                onClick={checkPwModal}
                isBtnDisabled={(disable: boolean) => setBtnActive(disable)}
              />
            )}
            {currentNumber === 7 && (
              <AccountPwCheck
                password={info.password}
                isBtnDisabled={(disable: boolean) => setBtnActive(disable)}
              />
            )}
            {currentNumber === 8 && (
              <div className='w-full flex flex-col justify-center gap-7'>
                <h2 className='font-hanaMedium text-3xl'>입출금정보</h2>
                <div className='w-full font-hanaRegular bg-[#F6F6F6] rounded-3xl px-10 py-7 text-[1.4rem]'>
                  <div className='flex items-center justify-between mb-3'>
                    <p className='text-[#474747] text-lg'>상품명</p>
                    <p>머니박스 통장</p>
                  </div>
                  <div className='flex items-center justify-between mb-3'>
                    <p className='text-[#474747] text-lg'>체크카드 신청</p>
                    <p>{info.checkCard ? '신청' : '신청안함'}</p>
                  </div>
                  <div className='flex items-end justify-between'>
                    <p className='text-[#474747] text-lg whitespace-pre-line'>{`전자금융\n출금계좌 등록`}</p>
                    <p>인터넷뱅킹/스마트폰뱅킹</p>
                  </div>
                </div>
              </div>
            )}
            {currentNumber === 9 && <ConfirmCard text='머니박스 가입 완료' />}
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
