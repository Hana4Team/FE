import { FC } from 'react';
import { checkAmountUnitMoney } from '../../utils/checkAmountUnit';

export type productData = {
  id: number;
  name: string;
  type: string;
  title: string;
  summary: string;
  interest1: number;
  interest2: number;
  period: string;
  payment1: number; // 1천원 단위
  payment2?: number;
  desc1: string;
  desc_detail1: string;
  desc_image1: string;
  desc2: string;
  desc_detail2: string;
  desc_image2: string;
};

interface IProps {
  data: productData;
}

export const ProductJoinIntro: FC<IProps> = ({ data }) => {
  return (
    <>
      <div className='bg-hanaGreen text-white py-14 px-7 flex flex-col justify-between'>
        <div className='flex flex-col justify-center gap-4 mb-28'>
          <p className='font-hanaRegular text-3xl'>{data.name}</p>
          <h1 className='font-hanaBold text-5xl'>{data.title}</h1>
        </div>
        <div className='flex flex-col justify-center gap-3'>
          <p className='font-hanaRegular text-2xl'>{data.summary}</p>
          <p className='font-hanaBold text-[2rem]'>
            {data.type === '머니박스' ? '파킹 ' : '기본 '}
            {data.interest1.toFixed(2)}%~
            <span className='text-5xl'>
              {data.type === '머니박스' ? '저축 ' : '최고 '}
              {data.interest2.toFixed(2)}%
            </span>
          </p>
          <div className='flex items-center gap-7'>
            <p className='font-hanaRegular text-lg leading-[3rem]'>
              가입기간
              <br />
              <span className='font-hanaMedium text-xl'>{data.period}</span>
            </p>
            <div className='border-[0.01px] h-16 border-[#68C5BC]'></div>
            <p className='font-hanaRegular text-lg leading-[3rem]'>
              가입금액
              <br />
              <span className='font-hanaMedium text-xl'>
                {data.payment2
                  ? `분기별 ${data.payment1}${checkAmountUnitMoney(data.payment1)}~${data.payment2}${checkAmountUnitMoney(data.payment2)}`
                  : `${data.payment1}${checkAmountUnitMoney(data.payment1)} 이상`}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className='w-11/12 flex flex-col bg-white py-10 px-10 rounded-3xl m-auto mt-10'>
        <h1 className='font-hanaBold text-5xl mb-5'>{data.desc1}</h1>
        {data.desc_detail1.split('+').map((content, index) => (
          <p key={index} className='font-hanaRegular text-2xl leading-normal'>
            {index > 0 ? (
              <>
                <span className='text-hanaRed font-hanaBold'>+</span>
                {content}
              </>
            ) : (
              content.split(' ').map((word, index) =>
                index == 0 ? (
                  <span key={index} className='text-hanaRed font-hanaMedium'>
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
          src={`${data.desc_image1}`}
          alt='productImg'
          className='w-56 m-auto'
        />
        <h1 className='font-hanaBold text-5xl my-5 text-right'>{data.desc2}</h1>
        <p className='font-hanaRegular whitespace-pre-line text-xl leading-normal float-right text-right'>
          {data.desc_detail2}
        </p>
        <img
          src={`${data.desc_image2}`}
          alt='productImg'
          className='w-56 m-auto'
        />
      </div>
    </>
  );
};
