import { useQuery } from '@tanstack/react-query';
import { MissionStartHeader } from '../../components/molecules/MissionStartHeader';
import Topbar from '../../components/Topbar';
import { ApiClient } from '../../apis/apiClient';
import { useNavigate } from 'react-router-dom';
import { BankBookIntro } from '../../components/molecules/BankBookIntro';

export const Mission5StartPage = () => {
  const navigate = useNavigate();

  const { data: depositInfo } = useQuery({
    queryKey: ['depositInfo'],
    queryFn: () => {
      const res = ApiClient.getInstance().getProdustsList('DEPOSIT');
      return res;
    },
  });

  return (
    <>
      <Topbar title='이사미션' />
      <MissionStartHeader
        icon='icons/blub.svg'
        title={`모은 목돈으로 새롭게\n 예금에 가입해보아요`}
      />
      {depositInfo && (
        <BankBookIntro
          type='머니박스'
          name={depositInfo[0].name}
          title={depositInfo[0].title}
          maxInterest={depositInfo[0].interest1}
          minInterest={depositInfo[0].interest2}
          content={depositInfo[0].summary}
          onClick={() =>
            navigate('/mission5/product', {
              state: { productId: depositInfo[0].productsId },
            })
          }
        />
      )}
    </>
  );
};
