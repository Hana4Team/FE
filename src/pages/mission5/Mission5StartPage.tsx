import { MissionStartHeader } from '../../components/molecules/MissionStartHeader';
import Topbar from '../../components/Topbar';
import { RecommendProductList } from '../../components/organisms/RecommendProductList';
import { test } from '../mission4/Mission4StartPage';

export const Mission5StartPage = () => {
  return (
    <>
      <Topbar title='이사미션' />
      <MissionStartHeader
        title={`모은 목돈으로 새롭게\n 예금에 가입해보아요`}
      />
      <RecommendProductList list={test} />
    </>
  );
};
