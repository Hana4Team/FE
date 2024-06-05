import { useQuery } from '@tanstack/react-query';
import { MissionStartHeader } from '../../components/molecules/MissionStartHeader';
import Topbar from '../../components/Topbar';
import { ApiClient } from '../../apis/apiClient';
import { useNavigate } from 'react-router-dom';
import { BankBookIntro } from '../../components/molecules/BankBookIntro';
import { CheckAccountMoney } from '../../components/organisms/accounts/CheckAccountMoney';

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
      <CheckAccountMoney title='내가 적금으로 모은 금액' money={120300} />
      {depositInfo && (
        <BankBookIntro
          type='머니박스'
          name={depositInfo[0].name}
          title={depositInfo[0].title}
          maxInterest={depositInfo[0].interest1}
          minInterest={depositInfo[0].interest2}
          content={depositInfo[0].summary}
          onClick={() =>
            navigate(
              `/product?productId=${depositInfo[0].productsId}&mission=5`
            )
          }
        />
      )}
    </>
  );
};
