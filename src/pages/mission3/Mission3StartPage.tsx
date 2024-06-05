import { IoIosArrowForward } from 'react-icons/io';
import { BankBookIntro } from '../../components/molecules/BankBookIntro';
import { MissionStartHeader } from '../../components/molecules/MissionStartHeader';
import Topbar from '../../components/Topbar';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';

export const Mission3StartPage = () => {
  const navigate = useNavigate();

  const { data: saving100Info } = useQuery({
    queryKey: ['saving100Info'],
    queryFn: () => {
      const res = ApiClient.getInstance().getProdustsList('SAVING100');
      return res;
    },
  });

  return (
    <>
      <Topbar title='이사미션' />
      <MissionStartHeader
        icon='icons/blub.svg'
        title={`머니박스의 저축공간 돈을\n적금에 넣어 보아요`}
      />
      <div className='flex flex-col gap-7'>
        <div
          className='w-11/12 bg-white py-10 pl-10 pr-5 rounded-3xl m-auto flex justify-between items-center'
          onClick={() => navigate('/moneyBox')}
        >
          <div className='flex flex-col justify-center gap-3 font-hanaMedium text-xl'>
            <h2 className='font-hanaRegular text-3xl'>
              지난 달 내가 저축한 금액
            </h2>
            <p className='flex items-center gap-2 font-hanaBold text-hanaRed text-3xl'>
              <img src='/icons/dollarbox.svg' alt='dollar' className='w-11' />
              120,300
              <span className='font-hanaMedium text-xl text-black mt-2'>
                원
              </span>
            </p>
            저금하는 과정을 도와드릴게요!
          </div>
          <IoIosArrowForward size={30} className='cursor-pointer' />
        </div>
        {saving100Info && (
          <BankBookIntro
            type='100일 적금'
            name={saving100Info[0].name}
            title={saving100Info[0].title}
            maxInterest={saving100Info[0].interest1}
            minInterest={saving100Info[0].interest2}
            content={saving100Info[0].summary}
            onClick={() =>
              navigate(
                `/product?productId=${saving100Info[0].productsId}&mission=3`
              )
            }
          />
        )}
      </div>
    </>
  );
};
