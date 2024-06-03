import { useNavigate } from 'react-router-dom';
import Topbar from '../../components/Topbar';
import { Button } from '../../components/ui/Button';
import {
  ProductJoinIntro,
  productData,
} from '../../components/organisms/ProductJoinIntro';

export const data: productData = {
  id: 1,
  name: '100일 적금',
  type: '적금',
  title: '100일 동안 꾸준히 모으기',
  summary: '연(세전, 1개월)',
  interest1: 2.0,
  interest2: 6.0,
  period: '1년,2년,3년',
  payment1: 1,
  payment2: 300,
  desc1: '최고 연 6.00%',
  desc_detail1: '50일 이상 저축 + 머니박스의 저축 금액 초기 납입 + 만기 해지시',
  desc_image1: '/images/logo.png',
  desc2: '알아서 예금 가입',
  desc_detail2:
    '재예치 시 하나의 정기예금 1년 만기\n적용 금리를 적용해 드려요.',
  desc_image2: '/images/logo.png',
};

export const Mission2Product = () => {
  const navigate = useNavigate();
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
