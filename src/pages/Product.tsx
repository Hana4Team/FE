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
    queryKey: ['product'],
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
          <div className='bg-hanaGreen text-white py-14 px-7 flex flex-col justify-between'>
            <div className='flex flex-col justify-center gap-4 mb-28'>
              <p className='font-hanaRegular text-3xl'>{product.name}</p>
              <h1 className='font-hanaBold text-5xl'>{product.title}</h1>
            </div>
            <div className='flex flex-col justify-center gap-3'>
              <p className='font-hanaRegular text-2xl'>{product.summary}</p>
              <p className='font-hanaBold text-[2rem]'>
                {mission === '2' ? '파킹 ' : '기본 '}
                {product.interest1.toFixed(2)}%~
                <span className='text-5xl'>
                  {mission === '2' ? '저축 ' : '최고 '}
                  {product.interest2.toFixed(2)}%
                </span>
              </p>
              {mission === '2' ? (
                <div className='flex flex-col gap-3 mt-5'>
                  <p className='font-hanaRegular text-xl'>대상</p>
                  <p className='font-hanaMedium text-2xl'>
                    만 14세 이상 ~ 만 40세 이하
                  </p>
                </div>
              ) : (
                <div className='flex items-center gap-7'>
                  <p className='font-hanaRegular text-lg leading-[3rem]'>
                    가입기간
                    <br />
                    <span className='font-hanaMedium text-xl'>
                      {product.period}
                    </span>
                  </p>
                  <div className='border-[0.01px] h-16 border-[#68C5BC]'></div>
                  <p className='font-hanaRegular text-lg leading-[3rem]'>
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
          <div className='w-11/12 flex flex-col bg-white py-10 px-10 rounded-3xl m-auto mt-10'>
            <h1 className='font-hanaBold text-5xl mb-5'>{product.desc1}</h1>
            {product.descDetail1.split('+').map((content, index) => (
              <p
                key={index}
                className='font-hanaRegular text-2xl leading-normal'
              >
                {index > 0 ? (
                  <>
                    <span className='text-hanaRed font-hanaBold'>+</span>
                    {content}
                  </>
                ) : (
                  content.split(' ').map((word, index) =>
                    index == 0 ? (
                      <span
                        key={index}
                        className='text-hanaRed font-hanaMedium'
                      >
                        {word}
                      </span>
                    ) : (
                      <span key={index}>{word}</span>
                    )
                  )
                )}
              </p>
            ))}
            <img
              src={`${product.descImage1}`}
              alt='productImg'
              className='w-56 m-auto'
            />
            <h1 className='font-hanaBold text-5xl my-5 text-right'>
              {product.desc2}
            </h1>
            <p className='font-hanaRegular whitespace-pre-line text-xl leading-normal float-right text-right'>
              {product.descDetail2}
            </p>
            <img
              src={`${product.descImage2}`}
              alt='productImg'
              className='w-56 m-auto'
            />
          </div>
        </>
      )}
      <div className='flex justify-center items-center mt-10'>
        <Button
          text='가입 신청하기'
          onClick={() => navigate(`/mission${mission}/account-opening`)}
        />
      </div>
    </>
  );
};
