import { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AlertModal } from '../../components/AlertModal';
import { getCookie } from '../../utils/cookie';
import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';

export const Home = () => {
  const navigate = useNavigate();
  const [isExistMoneyBox, setIsExistMoneyBox] = useState<boolean>(false);
  const [showModalContent, setShowModalContent] = useState<string>('');
  const isExistToken = getCookie('token');

  const { isLoading, data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => {
      const res = ApiClient.getInstance().getUser();
      return res;
    },
  });

  const showModalHandler = () => setShowModalContent('');

  const navigatePageHandler = (url: string) => {
    if (isExistToken) {
      if (url === '/consume') {
        if (userInfo && userInfo.step <= 1 && userInfo.stepStatus === 0) {
          setShowModalContent('이사미션 1단계\n가 시작되지 않았습니다.');
          return;
        }
      }
      navigate(`${url}`);
    } else navigate('/login');
  };

  const navigateMoneyBoxHandler = () => {
    if (isExistMoneyBox) navigate('/moneyBox');
    else setShowModalContent('머니박스\n가 아직 개설되지 않았어요');
  };

  useEffect(() => {
    if (userInfo) {
      if (
        userInfo.step < 2 ||
        (userInfo.step === 2 && userInfo.stepStatus === 0)
      )
        setIsExistMoneyBox(false);
      else setIsExistMoneyBox(true);
    }
  }, [isLoading]);

  return (
    <>
      {showModalContent !== '' && (
        <AlertModal onClose={showModalHandler}>
          <p className='font-hanaMedium text-2xl'>
            <span className='text-hanaGreen'>
              {showModalContent.split('\n')[0]}
            </span>
            {showModalContent.split('\n')[1]}
          </p>
        </AlertModal>
      )}

      <div className='w-full'>
        <div className='w-full flex items-center pt-24 px-10'>
          <img
            src={isExistToken ? 'icons/moneybox_icon.svg' : 'icons/person.svg'}
            className='w-16 h-16'
          />
          <p
            className='flex items-center text-3xl font-hanaMedium ml-5 cursor-pointer'
            onClick={() =>
              isExistToken ? navigateMoneyBoxHandler() : navigate('/login')
            }
          >
            {isExistToken ? 'My 머니박스' : '로그인'}
            <FaChevronRight size={16} className='ml-1.5' />
          </p>
        </div>
        <div className='w-full flex flex-col px-10 py-16 gap-5'>
          <div className='w-full flex justify-center gap-5'>
            <div
              className='bg-[#5CB6B7] flex flex-col justify-between w-3/5 pl-8 pr-3 pt-10 pb-2 rounded-[2.5rem] drop-shadow-under cursor-pointer'
              onClick={() => navigatePageHandler('/mission')}
            >
              <div className='flex flex-col'>
                <h1 className='font-hanaMedium text-5xl text-white mb-5'>
                  이사미션
                </h1>
                <p className='font-hanaRegular text-xl text-white'>
                  재테크 미션을 클리어하고
                  <br />내 집을 마련해봐요
                </p>
              </div>
              <div>
                <img
                  src='images/main1.svg'
                  alt='main1'
                  className='w-44 h-44 float-right'
                />
              </div>
            </div>
            <div
              className='bg-[#F2777E] flex flex-col justify-between w-2/5 pl-8 pr-3 pt-7 pb-2 rounded-[2.5rem] drop-shadow-under cursor-pointer'
              onClick={() => navigatePageHandler('/news')}
            >
              <div className='flex flex-col'>
                <h1 className='font-hanaMedium text-5xl text-white mb-1.5 leading-snug'>
                  오늘의
                  <br />
                  금융
                </h1>
                <p className='font-hanaRegular text-xl text-white mb-16'>
                  새로운 금융 뉴스가
                  <br />
                  기다리고있어요
                </p>
              </div>
              <div className='pb-5'>
                <img
                  src='images/main2.svg'
                  alt='main2'
                  className='w-28 h-28 float-right'
                />
              </div>
            </div>
          </div>
          <div
            className='bg-[#437C6E] flex justify-between items-center w-full px-8 py-10 rounded-[2.5rem] drop-shadow-under cursor-pointer'
            onClick={() => navigatePageHandler('/consume')}
          >
            <div className='flex flex-col'>
              <h1 className='font-hanaMedium text-5xl text-white mb-3'>
                이번달 소비
              </h1>
              <p className='font-hanaRegular text-xl text-white'>
                나의 소비패턴을 확인해봐요
              </p>
            </div>
            <div>
              <img
                src='images/main3.svg'
                alt='main3'
                className='w-28 h-28 float-right'
              />
            </div>
          </div>
          <div
            className='bg-[#9ED2B6] flex justify-between items-center w-full px-8 py-10 rounded-[2.5rem] drop-shadow-under cursor-pointer'
            onClick={() => navigatePageHandler('/myhome')}
          >
            <div className='flex flex-col'>
              <h1 className='font-hanaMedium text-5xl text-white mb-3'>
                우리집 가기
              </h1>
              <p className='font-hanaRegular text-xl text-white'>
                우리집으로 가자~
              </p>
            </div>
            <div>
              <img
                src='images/main4.svg'
                alt='main4'
                className='w-28 h-28 float-right'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
