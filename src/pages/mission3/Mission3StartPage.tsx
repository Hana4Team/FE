import { IoIosArrowForward } from 'react-icons/io';
import { BankBookIntro } from '../../components/molecules/BankBookIntro';
import { MissionStartHeader } from '../../components/molecules/MissionStartHeader';
import Topbar from '../../components/molecules/Topbar';

export const Mission3StartPage = () => {
  return (
    <>
      <Topbar title='이사미션' />
      <MissionStartHeader
        title={`머니박스의 저축공간 돈을\n적금에 넣어 보아요`}
      />
      <div className='flex flex-col gap-7'>
        <div className='w-11/12 bg-white py-10 pl-10 pr-5 rounded-3xl m-auto flex justify-between items-center'>
          <div className='flex flex-col justify-center gap-3 font-hanaMedium text-xl'>
            <h2 className='font-hanaRegular text-3xl'>
              지난 달 내가 저축한 금액
            </h2>
            <p className='flex items-center gap-2 font-hanaBold text-hanaRed text-3xl'>
              <img src='icons/dollarbox.svg' alt='dollar' className='w-11' />
              120,300
              <span className='font-hanaMedium text-xl text-black mt-2'>
                원
              </span>
            </p>
            저금하는 과정을 도와드릴게요!
          </div>
          <IoIosArrowForward size={30} className='cursor-pointer' />
        </div>
        <BankBookIntro
          subTitle='100일 간 납입하면 우대금리를 받을 수 있는 적금'
          title='100일 적금'
          content1='최고 연 5.00%'
          content2='기본 2.00%'
          content3='1개월 기준 세전'
        />
      </div>
    </>
  );
};
