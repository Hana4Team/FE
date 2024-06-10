import Topbar from '../../components/Topbar';
import { MoneyBoxItem } from '../../components/molecules/MoneyBoxItem';
import { ChoiceMenu } from '../../components/ChoiceMenu';
import { useEffect, useRef, useState } from 'react';
import { MoneyBoxMoveItem } from '../../components/molecules/MoneyBoxMoveItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertModal } from '../../components/AlertModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { AlarmAnimation } from '../../components/organisms/AlarmAnimation';
import { MdAccountBalance } from 'react-icons/md';
import { FcLock, FcMoneyTransfer, FcNews } from 'react-icons/fc';
import { PiSirenFill } from 'react-icons/pi';

export const MoneyBox = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const locationState = location.state as {
    prev: boolean;
  };

  const { data: moneyBoxData, isSuccess: querySuccess } = useQuery({
    queryKey: ['moneyBox'],
    queryFn: () => {
      const res = ApiClient.getInstance().getMoneyBox();
      return res;
    },
    staleTime: 500,
  });

  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => {
      const res = ApiClient.getInstance().getUser();
      return res;
    },
  });

  const { mutate: checkMission, isSuccess: isSuccess0 } = useMutation({
    mutationKey: ['checkMission'],
    mutationFn: () => {
      const res = ApiClient.getInstance().updateMissionCheck();
      return res;
    },
  });

  const { mutate: updateHanaMoney } = useMutation({
    mutationKey: ['updateHanaMoney'],
    mutationFn: (isMission: boolean) => {
      const res = ApiClient.getInstance().updatePoint(isMission);
      return res;
    },
    onSuccess: (data) => {
      postAlarm(`하나머니 ${data.points}원 적립!`);
    },
  });

  const { mutate: postAlarm } = useMutation({
    mutationKey: ['updateHanaMoney'],
    mutationFn: (contents: string) => {
      const res = ApiClient.getInstance().postAlarm(contents);
      return res;
    },
    onSuccess: (_, variables) => {
      setShowAlarm(true);
      alarmMsgRef.current = `하나머니 ${variables}원 적립!`;
    },
  });

  useEffect(() => {
    if (!isSuccess0 && userInfo?.step === 2 && userInfo.stepStatus === 2) {
      checkMission();
      setShowStepModal(true);
    }
  }, [userInfo]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['userInfo'] });
  }, []);

  const [showStepModal, setShowStepModal] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showChoiceModal, setShowChoiceModal] = useState<boolean>(false);
  const [clickedName, setClickedName] = useState<string>('파킹');
  const [showAlarm, setShowAlarm] = useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [checkExpense, setCheckExpense] = useState<boolean>(true);
  const alarmMsgRef = useRef<string>('');

  const openChoiceModalHandler = () => setShowChoiceModal(true);
  const closeChoiceModalHandler = () => {
    setShowChoiceModal(false);
    setClickedName('파킹');
  };
  const openModalHanlder = () => setShowModal(true);
  const closeModalHandler = () => {
    setShowModal(!showModal);
    if (clickedName == '저축') {
      openChoiceModalHandler();
    }
  };

  const onCloseStepModal = async () => {
    try {
      updateHanaMoney(true);
      setShowStepModal(false);
      // setCheckExpense(true);
    } catch (e) {
      console.log(e);
    }
  };

  const clickMove = (name: string) => {
    setClickedName(name);

    if (name === '저축') {
      openModalHanlder();
      return;
    }

    setShowChoiceModal(!showChoiceModal);
  };

  const clickMove2 = (type: string) => {
    navigate('/account', {
      state: {
        type: type,
      },
    });
  };

  const moveHandler = (receiveName: string, selectSend?: boolean) => {
    navigate('/sending', {
      state: {
        initialBalance:
          moneyBoxData?.expenseBalance! +
          moneyBoxData?.parkingBalance! +
          moneyBoxData?.savingBalance!,
        sendName: selectSend ? '' : clickedName,
        receiveName: receiveName,
        sendAccount: selectSend ? '' : moneyBoxData?.accountNumber,
        receiveAccount: moneyBoxData?.accountNumber,
      },
    });
  };

  const onClickBack = () => {
    if (locationState != null && locationState.prev) {
      navigate('/mission');
      return;
    }

    navigate(-1);
  };

  return (
    <div className='relative w-full h-screen'>
      {showAlarm && (
        <AlarmAnimation
          message={alarmMsgRef.current}
          showAlarm={showAlarm}
          onClickShowAlarm={(status: boolean) => setShowAlarm(status)}
        />
      )}
      {showStepModal && (
        <AlertModal onClose={() => onCloseStepModal()}>
          <div className='flex flex-col font-hanaMedium text-2xl text-center'>
            <p>
              2단계 미션을 <span className='text-hanaDeepGreen'>완료</span>
              했습니다!
            </p>
          </div>
        </AlertModal>
      )}
      {showModal && (
        <AlertModal onClose={() => closeModalHandler()}>
          <div className='flex flex-col font-hanaMedium text-2xl text-center'>
            <p>
              <span className='text-hanaGreen'>저축</span>에서 출금 시
            </p>
            <p>
              <span className='text-hanaRed'>연간 최저 금리</span>가 적용됩니다.
            </p>
          </div>
        </AlertModal>
      )}
      {showChoiceModal && (
        <ChoiceMenu
          title={`${clickedName}에서`}
          onClose={() => closeChoiceModalHandler()}
        >
          <div className='flex flex-row justify-center gap-5'>
            <MoneyBoxMoveItem
              receiveName={clickedName === '파킹' ? '소비' : '파킹'}
              onClick={moveHandler}
            />
            <MoneyBoxMoveItem
              receiveName={clickedName === '저축' ? '소비' : '저축'}
              onClick={moveHandler}
            />
          </div>
        </ChoiceMenu>
      )}
      {showInfoModal && (
        <AlertModal onClose={() => setShowInfoModal(false)}>
          <div className='font-hanaMedium text-2xl flex flex-col gap-3'>
            <h3 className='text-center font-hanaBold text-[1.8rem] whitespace-pre-line leading-snug'>{`예산을 먼저 정하고\n예산에 맞게 통장을 쪼개봅시다!`}</h3>
            <p className='text-xl font-hanaRegular text-center text-gray-500'>{`일정 시간이 지난 후 통장을 확인해보면,\n소비지출은 줄어있고 저축
            통장의 잔액이 늘어난 것을 확인할 수 있어요!`}</p>
            <div className='text-[1.8rem] mt-3 mb-1 text-hanaDeepGreen flex flex-row items-center gap-3'>
              {/* <FcAdvertisinㅎ  /> */}
              통장쪼개기 한눈에 살펴보기
            </div>
            <div className='flex flex-col gap-5 mb-10'>
              <div>
                <h3 className='flex items-center gap-3'>
                  <PiSirenFill color='red' /> 파킹통장(= 비상금 통장)
                </h3>
                <p className='text-xl font-hanaRegular mt-2 leading-normal'>
                  파킹통장은 질병, 사고, 실직 등 갑자기 돈이 필요해지는 상황에
                  대비해 예비로 준비해두는 통장입니다.
                  <br />
                  <span className='bg-yellow-200/70 font-hanaCM'>
                    매월 정기 수입의{' '}
                    <span className='text-hanaRed font-hanaBold'>10%</span>{' '}
                    정도를 입금해두는 것이 좋습니다.
                  </span>
                </p>
              </div>
              <div>
                <h3 className='flex items-center gap-3'>
                  <FcLock /> 저축통장(= 재테크 통장)
                </h3>
                <p className='text-xl font-hanaRegular mt-2 leading-normal'>
                  저축통장은 소비가 아닌 저축을 위한 통장입니다. <br />
                  여기서 중요한 점은 소비를 다 하고 남은 돈을 저금하는 것이
                  아닌, 먼저 저금하고 남은 돈을 소비하는 것입니다.
                  <br />
                  <span className='bg-yellow-200/70 font-hanaCM'>
                    매월 정기 수입의{' '}
                    <span className='text-hanaRed font-hanaBold'>45%</span>{' '}
                    이상을 저축해두는 것이 좋습니다.
                  </span>
                </p>
              </div>
              <div>
                <h3 className='flex items-center gap-3'>
                  <FcMoneyTransfer /> 소비통장(= 생활비 통장)
                </h3>
                <p className='text-xl font-hanaRegular mt-2 leading-normal'>
                  소비통장은{' '}
                  <span className='bg-yellow-200/70 font-hanaCM'>
                    파킹통장과 소비통장에 배분하고 남은 것을 사용하는 것
                  </span>
                  을 원칙으로 합니다.
                </p>
              </div>
            </div>
          </div>
        </AlertModal>
      )}
      <Topbar title='머니박스' onClick={() => onClickBack()} />
      {/* 출금 계좌번호 공간 */}
      <div className='flex flex-col bg-white p-8 font-hanaMedium mb-4'>
        <div className='flex justify-between'>
          <p className='text-2xl'>머니박스 계좌번호</p>
          <div
            className='flex flex-col w-24 h-12 text-center justify-center align-middle bg-hanaGreen text-white rounded-[10rem] cursor-pointer'
            onClick={() => moveHandler('파킹', true)}
          >
            채우기
          </div>
        </div>
        <p className='text-2xl text-gray-500'>{moneyBoxData?.accountNumber}</p>
        <div className='bg-gray-400 h-1'></div>
        <div className='flex justify-between text-xl mt-4'>
          <p className='font-hanaRegular text-gray-500'>전체 잔액</p>
          <p>
            {querySuccess &&
              (
                moneyBoxData?.expenseBalance! +
                moneyBoxData?.parkingBalance! +
                moneyBoxData?.savingBalance!
              ).toLocaleString()}
            원
          </p>
        </div>
        {/* <div className='flex justify-between text-xl mt-2'>
          <p className='font-hanaRegular text-gray-500'>출금 가능 잔액</p>
          <p className='font-hanaRegular'>10,000원</p>
        </div> */}
      </div>
      <div
        onClick={() => setShowInfoModal(true)}
        className='bg-white flex items-center justify-center gap-3 mb-4 w-11/12 m-auto py-5 px-10 border border-[#E4E4E4] rounded-3xl text-2xl font-hanaCM cursor-pointer'
      >
        <MdAccountBalance size={22} color='#FFCE56' />
        통장쪼개기로 적정소비 도전하기!
      </div>
      {checkExpense && (
        <div className='text-center bg-white mb-4 font-hanaMedium text-2xl py-5 px-3'>
          당신의 과소비지수는{' '}
          <span className='font-hanaBold text-red-600'>{'과소비'}</span>
          입니다.
          <p className='text-lg text-gray-500 font-hanaRegular text-center mt-2 leading-relaxed'>
            과소비지수란 월급에서 저축하는 금액을 뺀 금액을 월급으로 나누는
            것입니다.
            <br /> 과소비지수가{' '}
            <span className='text-red-600 font-hanaBold'>1</span>이면
            <span className='text-red-600 font-hanaCM'> 심각한 과소비</span>,
            <span className='text-yellow-500 font-hanaBold'> 0.7~0.9</span>이면
            <span className='text-yellow-500 font-hanaCM'> 과소비</span>,<br />
            <span className='text-green-600 font-hanaBold'> 0.6</span>이면
            <span className='text-green-600 font-hanaCM'> 적정소비</span>,
            <span className='text-blue-600 font-hanaBold'> 0.5</span>이면
            <span className='text-blue-600 font-hanaCM'> 알뜰소비</span>입니다.
          </p>
        </div>
      )}
      {/* 머니박스 아이템 공간 */}
      <div className='flex flex-col bg-white p-8 gap-y-4'>
        <MoneyBoxItem
          title='파킹'
          balance={moneyBoxData?.parkingBalance}
          color1='9BDEDF'
          color2='5CB6B7'
          onClick={clickMove}
          onClick2={() => clickMove2('PARKING')}
        />
        <MoneyBoxItem
          title='소비'
          balance={moneyBoxData?.expenseBalance}
          color1='FFB2B7'
          color2='F2777E'
          onClick={clickMove}
          onClick2={() => clickMove2('EXPENSE')}
        />
        <MoneyBoxItem
          title='저축'
          balance={moneyBoxData?.savingBalance}
          color1='9CDAB8'
          color2='74BE96'
          onClick={clickMove}
          onClickQuestion={openModalHanlder}
          onClick2={() => clickMove2('SAVING')}
          isLimit
        />
      </div>
    </div>
  );
};
