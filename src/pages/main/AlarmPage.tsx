import { Alarm } from '../../components/molecules/Alarm';

export const AlarmPage = () => {
  return (
    <>
      <h3 className='pt-20 w-full text-center font-hanaMedium text-3xl mb-14'>
        알림
      </h3>
      <>
        <h1 className='px-10 font-hanaBold text-4xl'>내 활동</h1>
        <div className='flex flex-col mt-10 w-full gap-5'>
          <Alarm message='1 하나머니가 적립되었습니다!' />
          <Alarm message='1 하나머니가 적립되었습니다!' />
          <Alarm message='1 하나머니가 적립되었습니다!' />
          <Alarm message='1 하나머니가 적립되었습니다!' />
          <Alarm message='1 하나머니가 적립되었습니다!' />
        </div>
      </>
    </>
  );
};
