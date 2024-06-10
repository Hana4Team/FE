import { useNavigate } from 'react-router-dom';
import { BankBookIntro } from '../../components/molecules/BankBookIntro';
import { MissionStartHeader } from '../../components/molecules/MissionStartHeader';
import { MoneyBoxIntroItem } from '../../components/molecules/MoneyBoxIntroItem';
import Topbar from '../../components/Topbar';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';

export const Mission2StartPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [animation, setAnimation] = useState<number>(0);

  const { data: moneyBoxInfo } = useQuery({
    queryKey: ['moneyBoxInfo'],
    queryFn: () => {
      const res = ApiClient.getInstance().getProdustsList('MONEYBOX');
      return res;
    },
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      setAnimation((prev) => prev + 1);
    }, 700);
    const timeoutId = setTimeout(() => {
      clearInterval(timerId);
    }, 3500);
    return () => {
      clearInterval(timerId);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['moneyBoxInfo'] });
  }, []);

  return (
    <>
      <Topbar title='이사미션' />
      <MissionStartHeader
        icon='icons/blub.svg'
        title={`직접 머니박스 통장을\n 만들어보아요`}
      />
      <div className='flex flex-col gap-7'>
        <MoneyBoxIntroItem
          title='파킹'
          icon='safebox.svg'
          className={`${animation <= 1 ? 'opacity-0' : 'opacity-1'} animate-fadein1`}
        >
          <p className='font-hanaMedium text-2xl whitespace-pre-line leading-normal'>
            <span className='text-hanaRed'>자유롭게 </span>
            넣고 빼고
            <br />
            <span className='font-hanaRegular'>
              하루만 보관해도 이자가 차곡차곡
            </span>
          </p>
        </MoneyBoxIntroItem>
        <MoneyBoxIntroItem
          title='소비'
          icon='wallet.svg'
          className={`${animation <= 2 ? 'opacity-0' : 'opacity-1'} animate-fadein2`}
        >
          <p className='font-hanaMedium text-2xl whitespace-pre-line leading-normal'>
            <span className='font-hanaRegular'>
              내 소비패턴 확인하고
              <br />
            </span>
            <span className='text-hanaRed'>계획적으로 </span>
            지출하기
          </p>
        </MoneyBoxIntroItem>
        <MoneyBoxIntroItem
          title='저축'
          icon='piggybank2.svg'
          className={`${animation <= 3 ? 'opacity-0' : 'opacity-1'} animate-fadein3`}
        >
          <p className='font-hanaMedium text-2xl whitespace-pre-line leading-normal'>
            <span className='font-hanaRegular'>
              자신이 정한 목표로
              <br />
            </span>
            <span className='text-hanaRed'>한 달 동안 </span>
            저축 도전하기
          </p>
        </MoneyBoxIntroItem>
        {moneyBoxInfo && (
          <BankBookIntro
            type='머니박스'
            name={moneyBoxInfo[0].name}
            title={moneyBoxInfo[0].title}
            maxInterest={moneyBoxInfo[0].interest2}
            minInterest={moneyBoxInfo[0].interest1}
            content={moneyBoxInfo[0].summary}
            className={`${animation <= 4 ? 'opacity-0' : 'opacity-1'} animate-fadein4`}
            onClick={() =>
              navigate(
                `/product?productId=${moneyBoxInfo[0].productsId}&mission=2`
              )
            }
          />
        )}
      </div>
    </>
  );
};
