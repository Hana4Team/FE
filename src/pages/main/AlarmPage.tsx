import { Alarm } from '../../components/molecules/Alarm';
import { ApiClient } from '../../apis/apiClient';
import { useQuery } from '@tanstack/react-query';

export const AlarmPage = () => {
  const { data: alarms } = useQuery({
    queryKey: ['alarms'],
    queryFn: () => {
      const res = ApiClient.getInstance().getAlarm();
      return res;
    },
  });

  return (
    <>
      <h3 className='pt-20 w-full text-center font-hanaMedium text-3xl mb-14'>
        알림
      </h3>
      <>
        <h1 className='px-10 font-hanaBold text-4xl'>내 활동</h1>
        <div className='flex flex-col mt-10 w-full gap-5'>
          {alarms &&
            alarms.map((alarm, index) => (
              <Alarm
                key={index}
                contents={alarm.contents}
                createdAt={alarm.createdAt}
              />
            ))}
        </div>
      </>
    </>
  );
};
