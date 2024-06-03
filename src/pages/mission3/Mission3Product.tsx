import { useNavigate } from 'react-router-dom';
import Topbar from '../../components/Topbar';
import { ProductJoinIntro } from '../../components/organisms/ProductJoinIntro';
import { Button } from '../../components/ui/Button';
import { data } from '../mission2/Mission2Product'; // 나중에 삭제

export const Mission3Product = () => {
  const navigate = useNavigate();
  return (
    <>
      <Topbar title='100일 적금 가입' />
      <ProductJoinIntro data={data} />
      <div className='flex justify-center items-center mt-10'>
        <Button
          text='가입 신청하기'
          onClick={() =>
            navigate('/mission3/account-opening', {
              state: { product: { data } },
            })
          }
        />
      </div>
    </>
  );
};
