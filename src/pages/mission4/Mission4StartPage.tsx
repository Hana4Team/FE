import { MissionStartHeader } from '../../components/molecules/MissionStartHeader';
import Topbar from '../../components/Topbar';
import { RecommendProductList } from '../../components/organisms/RecommendProductList';
import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';

export const Mission4StartPage = () => {
  const { data: savingInfo } = useQuery({
    queryKey: ['savingInfo'],
    queryFn: () => {
      const res = ApiClient.getInstance().getProdustsList('SAVING');
      return res;
    },
  });

  return (
    <>
      <Topbar title='이사미션' />
      <MissionStartHeader
        icon='icons/blub.svg'
        title={`원하는 적금에 가입해서\n목돈을 모아보아요`}
      />
      {savingInfo && <RecommendProductList list={savingInfo} />}
    </>
  );
};
