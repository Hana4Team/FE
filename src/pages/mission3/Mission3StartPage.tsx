import { BankBookIntro } from '../../components/molecules/BankBookIntro';
import { MissionStartHeader } from '../../components/molecules/MissionStartHeader';
import Topbar from '../../components/Topbar';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '../../apis/apiClient';
import { CheckAccountMoney } from '../../components/organisms/accounts/CheckAccountMoney';
import { useEffect } from 'react';

export const Mission3StartPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: moneyboxMoney } = useQuery({
    queryKey: ['moneyboxMoney'],
    queryFn: () => {
      const res = ApiClient.getInstance().getMoneyboxSaving();
      return res;
    },
  });

  const { data: saving100Info } = useQuery({
    queryKey: ['saving100Info'],
    queryFn: () => {
      const res = ApiClient.getInstance().getProdustsList('SAVING100');
      return res;
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['moneyboxMoney'] });
  }, []);

  return (
    <>
      <Topbar title='이사미션' />
      <MissionStartHeader
        icon='icons/blub.svg'
        title={`머니박스의 저축공간 돈을\n적금에 넣어 보아요`}
      />
      <div className='flex flex-col gap-7'>
        {moneyboxMoney && (
          <CheckAccountMoney
            title='지난 달 내가 저축한 금액'
            money={moneyboxMoney.savingBalance}
            onClick={() => navigate('/moneybox')}
          />
        )}
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
