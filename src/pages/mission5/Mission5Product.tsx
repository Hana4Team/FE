import { useLocation, useNavigate } from 'react-router-dom';
import Topbar from '../../components/Topbar';
import { ProductJoinIntro } from '../../components/organisms/ProductJoinIntro';
import { Button } from '../../components/ui/Button';
import { data } from '../mission2/Mission2Product'; // 나중에 삭제

export const Mission5Product = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const productId = location.state.productId;

  return (
    <>
      <Topbar title='예금가입' />
      <ProductJoinIntro data={data} />
      <div className='flex justify-center items-center mt-10'>
        <Button
          text='가입 신청하기'
          onClick={() =>
            navigate('/mission5/account-opening', {
              state: { product: { data } },
            })
          }
        />
      </div>
    </>
  );
};
