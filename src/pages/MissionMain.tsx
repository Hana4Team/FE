import { MissionStep } from '../components/molecules/MissionStep';
import Topbar from '../components/Topbar';
import { MissionStartHeader } from '../components/molecules/MissionStartHeader';

const step = [
  { title: '내 소비 습관 알기', text: '지난 달 나의 소비 습관을 알아보아요' },
  { title: '소비 줄여보기', text: '직접 머니박스 통장을 만들어보아요' },
  {
    title: '저출 습관 들이기',
    text: '100일 적금을 통해 저축하는 습관을 들어보아요',
  },
  { title: '목돈 모으기', text: '적금에 가입해서 목돈을 모아보아요' },
  {
    title: '예금 가입해보기',
    text: '모은 목돈으로 새롭게 예금에 가입해보아요',
  },
];

export const MissionMain = () => {
  return (
    <>
      <Topbar title='이사미션' />
      <MissionStartHeader
        icon='icons/blub.svg'
        title={`더 큰 집으로\n이사가볼까요?`}
      />
      {step.map((s, index) => (
        <div key={index} className='px-8 py-3'>
          <MissionStep
            step={index + 1}
            title={s.title}
            text={s.text}
            status='진행중'
          />
        </div>
      ))}
    </>
  );
};
