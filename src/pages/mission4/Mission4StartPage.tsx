import { MissionStartHeader } from '../../components/molecules/MissionStartHeader';
import Topbar from '../../components/Topbar';
import { RecommendProductList } from '../../components/organisms/RecommendProductList';

export const test = [
  {
    id: 1,
    subTitle: '하나 청년도약 계좌',
    title: '하나와 함께 도약',
    year: 1,
    low_interest: 3.55,
    high_interest: 5.85,
  },
  {
    id: 2,
    subTitle: '월급 받고 이자 차곡1',
    title: '급여하나 월복리 적금1',
    year: 1,
    low_interest: 3.55,
    high_interest: 6.85,
  },
  {
    id: 3,
    subTitle: '월급 받고 이자 차곡2',
    title: '급여하나 월복리 적금2',
    year: 1,
    low_interest: 3.55,
    high_interest: 7.85,
  },
  {
    id: 4,
    subTitle: '월급 받고 이자 차곡3',
    title: '급여하나 월복리 적금3',
    year: 1,
    low_interest: 3.55,
    high_interest: 8.85,
  },
  {
    id: 5,
    subTitle: '월급 받고 이자 차곡4',
    title: '급여하나 월복리 적금4',
    year: 1,
    low_interest: 3.55,
    high_interest: 9.85,
  },
];

export const Mission4StartPage = () => {
  return (
    <>
      <Topbar title='이사미션' />
      <MissionStartHeader title={`원하는 적금에 가입해서\n목돈을 모아보아요`} />
      <RecommendProductList list={test} />
    </>
  );
};
