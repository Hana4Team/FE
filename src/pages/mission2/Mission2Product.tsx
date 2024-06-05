import { useNavigate } from 'react-router-dom';
import Topbar from '../../components/Topbar';
import { Button } from '../../components/ui/Button';
import { ProductJoinIntro } from '../../components/organisms/ProductJoinIntro';

export const Mission2Product = () => {
  const navigate = useNavigate();

  const { data: detail } = useQuery({
    queryKey: ['moneyBoxInfo'],
    queryFn: () => {
      const res = ApiClient.getInstance().getProdustsList('MONEYBOX');
      return res;
    },
  });

  return (
    <>
      <Topbar title='머니박스 가입' />
      <ProductJoinIntro data={data} />
      <div className='flex justify-center items-center mt-10'>
        <Button
          text='가입 신청하기'
          onClick={() => navigate('/mission2/account-opening')}
        />
      </div>
    </>
  );
};
