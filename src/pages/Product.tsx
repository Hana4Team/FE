import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Topbar from '../components/Topbar';
import { Button } from '../components/ui/Button';
import { ApiClient } from '../apis/apiClient';
import { checkAmountUnitMoney } from '../utils/checkAmountUnit';

export const Product = () => {
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const productId = searchParams.get('productId') || 0;
  const mission = searchParams.get('mission');

  const { data: product } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => {
      const res = ApiClient.getInstance().getProduct(+productId);
      return res;
    },
  });

  return (
    <>
      <Topbar
        title={
          mission === '2'
            ? '머니박스 가입'
            : mission === '3'
              ? '100일 적금 가입'
              : mission === '4'
                ? '적금가입'
                : mission === '5'
                  ? '예금가입'
                  : ''
        }
      />
      {product && (
        <>
          <div className='bg-hanaGreen text-white py-16 px-7 flex flex-col justify-between'>
            <div className='flex flex-col justify-center gap-4 mb-32'>
              <p className='font-hanaRegular text-3xl'>{product.name}</p>
              <h1 className='font-hanaBold text-5xl whitespace-pre-line leading-snug'>
                {product.summary}
              </h1>
            </div>
            <div className='flex flex-col justify-center gap-4'>
              <p className='font-hanaRegular text-2xl'>{product.title}</p>
              <p className='flex items-center font-hanaBold text-[2rem]'>
                {mission === '2' ? '파킹 ' : '기본 '}
                {product.interest1.toFixed(2)}% ~
                <span className='text-5xl ml-2'>
                  {mission === '2' ? '저축 ' : '최고 '}
                  {product.interest2.toFixed(2)}%
                </span>
              </p>
              {mission === '2' ? (
                <div className='flex flex-col gap-3 mt-3'>
                  <p className='font-hanaRegular text-xl'>대상</p>
                  <p className='font-hanaMedium text-2xl'>
                    만 14세 이상 ~ 만 40세 이하
                  </p>
                </div>
              ) : (
                <div className='flex items-center gap-7'>
                  <p className='font-hanaRegular text-lg leading-[2.5rem]'>
                    가입기간
                    <br />
                    <span className='font-hanaMedium text-xl'>
                      {product.period}
                    </span>
                  </p>
                  <div className='border-[0.01px] h-16 border-[#68C5BC]'></div>
                  <p className='font-hanaRegular text-lg leading-[2.5rem]'>
                    가입금액
                    <br />
                    <span className='font-hanaMedium text-xl'>
                      {product.payment2
                        ? `분기별 ${product.payment1}${checkAmountUnitMoney(product.payment1)}~${product.payment2}${checkAmountUnitMoney(product.payment2)}`
                        : `${product.payment1}${checkAmountUnitMoney(product.payment1)} 이상`}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className='w-11/12 flex flex-col bg-white py-14 px-10 rounded-3xl m-auto mt-10'>
            <h1 className='font-hanaBold text-5xl mb-5 whitespace-pre-line leading-tight'>
              {product.desc1}
            </h1>
            <p className='font-hanaRegular whitespace-pre-line text-2xl leading-relaxed'>
              {product.descDetail1}
            </p>
            <img
              src={`${product.descImage1}`}
              alt='productImg'
              className='w-56 mx-auto my-5'
            />
            <h1 className='font-hanaBold text-5xl mt-24 mb-5 text-right whitespace-pre-line leading-tight'>
              {product.desc2}
            </h1>
            <p className='font-hanaRegular whitespace-pre-line text-2xl leading-relaxed float-right text-right'>
              {product.descDetail2}
            </p>
            <img
              src={`${product.descImage2}`}
              alt='productImg'
              className='w-56 m-auto mt-5'
            />
          </div>
        </>
      )}
      <div className='flex justify-center items-center mt-10'>
        <Button
          text='가입 신청하기'
          onClick={() =>
            navigate(`/mission${mission}/account-opening`, {
              state: {
                product: product,
              },
            })
          }
        />
      </div>
    </>
  );
};
