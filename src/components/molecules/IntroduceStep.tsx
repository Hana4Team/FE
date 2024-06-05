import React, { FC } from 'react';
import { FcAdvertising } from 'react-icons/fc';
import { FcIdea } from 'react-icons/fc';

interface IProps {
  step: number;
}

export const IntroduceStep: FC<IProps> = ({ step }) => {
  return (
    <>
      {step === 0 ? (
        <div className='font-hanaMedium text-2xl'>
          <div className='mb-8 text-center text-4xl font-hanaBold'>
            1단계 내 소비습관 알기
          </div>
          <div className='text-[1.8rem] mb-4 text-hanaDeepGreen flex flex-row items-center gap-3 '>
            <FcAdvertising />
            방법
          </div>
          <div className='flex flex-col gap-5 mb-10'>
            <div>🔹지난달 나의 소비습관을 확인합니다.</div>
            <div>🔹지난달 소비내역을 참고하여 이번 달 예산을 설정합니다.</div>
            <div>
              🔹카테고리별로 더 상세하게 예산을 확인하고 설정할 수 있습니다.
            </div>
            <div>🔹성공하면 하나머니를 지급해드립니다.</div>
          </div>

          <div className='text-[1.8rem] mb-4 text-hanaDeepGreen flex flex-row items-center gap-3 '>
            <FcIdea />
            소비습관이란?
          </div>
          <div>
            🔸지난달 소비를 확인하고 예산을 설정하면 소비를 통제할 수 있습니다.
          </div>
        </div>
      ) : step === 1 ? (
        <div className='font-hanaMedium text-2xl'>
          <div className='mb-8 text-center text-4xl font-hanaBold'>
            2단계 소비 줄여보기
          </div>
          <div className='text-[1.8rem] mb-4 text-hanaDeepGreen flex flex-row items-center gap-3 '>
            <FcAdvertising />
            방법
          </div>
          <div className='flex flex-col gap-5 mb-10'>
            <div>
              🔹머니박스 통장을 개설하여 통장쪼개기를 통해 수입과 지출을 통제할
              수 있습니다.
            </div>
            <div>
              🔹머니박스 이용 한달 후 지난달 소비내역과 비교하여 소비가 5%이상
              감소되었을 시 2단계 성공
            </div>
            <div>🔹성공하면 하나머니를 지급해드립니다.</div>
          </div>

          <div className='text-[1.8rem] mb-4 text-hanaDeepGreen flex flex-row items-center gap-3 '>
            <FcIdea />
            머니박스란?
          </div>
          <div className='flex flex-col gap-5 mb-10'>
            <div>
              🔸하나의 통장으로 용도별로 공간을 나누어 사용 할 수 있는 똑똑한
              입출금통장입니다.
            </div>
            <div>
              🔸하나의 통장을 3개의 공간으로 나누어 사용함으로써 지출을 통제할
              수 있습니다.
            </div>
            <div className='border rounded-xl p-5 flex flex-col gap-5 font-hanaCM text-gray-600'>
              <div>
                <span className='text-hanaDeepGreen'>파킹</span> : 수시 입출금이
                가능하면서, 이자도 받을 수 있는 공간
              </div>
              <div>
                <span className='text-hanaDeepGreen'>소비</span> : 계획적인
                소비관리를 위한 하나체크카드 결제 전용 공간
              </div>
              <div>
                <span className='text-hanaDeepGreen'>저축</span> : 꾸준히 돈을
                모을 수 있는 저축 공간. 출금시 연간 최저금리 적용
              </div>
            </div>
          </div>
        </div>
      ) : step === 2 ? (
        <div className='font-hanaMedium text-2xl'>
          <div className='mb-8 text-center text-4xl font-hanaBold'>
            3단계 저축습관 들이기
          </div>
          <div className='text-[1.8rem] mb-4 text-hanaDeepGreen flex flex-row items-center gap-3 '>
            <FcAdvertising />
            방법
          </div>
          <div className='flex flex-col gap-5 mb-10'>
            <div>
              🔹100일 적금을 개설하여 100일동안 매일매일 저축에 도전할 수
              있습니다.
            </div>
            <div>
              🔹100일이 지난 후 3단계 성공! 50일 이상 저축에 성공할 시 금리 6%
              가 지급됩니다.
            </div>
            <div>🔹성공하면 하나머니를 지급해드립니다.</div>
          </div>

          <div className='text-[1.8rem] mb-4 text-hanaDeepGreen flex flex-row items-center gap-3 '>
            <FcIdea />
            100일적금?
          </div>
          <div className='flex flex-col gap-5'>
            <div>
              🔸적은 금액이라도 매일 저축하는 습관을 기르기 위한 적금상품입니다.
            </div>
            <div>🔸달력을 보며 나의 저축 현황을 확인할 수 있습니다.</div>
          </div>
        </div>
      ) : step === 3 ? (
        <div className='font-hanaMedium text-2xl'>
          <div className='mb-8 text-center text-4xl font-hanaBold'>
            4단계 목돈모으기
          </div>
          <div className='text-[1.8rem] mb-4 text-hanaDeepGreen flex flex-row items-center gap-3 '>
            <FcAdvertising />
            방법
          </div>
          <div className='flex flex-col gap-5 mb-10'>
            <div>
              🔹청년에게 맞는 적금 상품 5가지를 추천해줍니다. 그 중 본인이
              원하는 적금 상품에 가입합니다.
            </div>
            <div>🔹로드맵을 통해 자신의 현재 금액을 확인할 수 있습니다.</div>
            <div>
              🔹만기일이 지난 후 4단계 성공! 목표금액 도달 시 최고 금리가
              지급됩니다.
            </div>
            <div>🔹성공하면 하나머니를 지급해드립니다.</div>
          </div>

          <div className='text-[1.8rem] mb-4 text-hanaDeepGreen flex flex-row items-center gap-3 '>
            <FcIdea />
            적금
          </div>
          <div className='flex flex-col gap-5'>
            <div>
              🔸적금은 일정금액을 매월 일정기간 동안에 불입한 이후 약정계약 만료
              이후에 금액+이자를 받는 예금 형식
            </div>
            <div>
              🔸정기적으로 돈을 저축하여 목돈을 마련할 수 있게 도와줍니다.
            </div>
            <div>
              🔸작은금액이라도 목돈만드는 습관을 들이면 지금은 작지만 만기에는
              큰 금액을 모을 수 있습니다.
            </div>
          </div>
        </div>
      ) : step === 4 ? (
        <div className='font-hanaMedium text-2xl'>
          <div className='mb-8 text-center text-4xl font-hanaBold'>
            5단계 예금 가입해보기
          </div>
          <div className='text-[1.8rem] mb-4 text-hanaDeepGreen flex flex-row items-center gap-3 '>
            <FcAdvertising />
            방법
          </div>
          <div className='flex flex-col gap-5 mb-10'>
            <div>🔹‘목돈 모으기’에서 모은 돈을 예금에 넣습니다.</div>
            <div>
              🔹예금 가입하면 5단계 성공! 로드맵을 통해 현재 금액을 확인할 수
              있습니다.
            </div>
            <div>🔹성공하면 ‘하나머니’를 지급해드립니다.</div>
          </div>

          <div className='text-[1.8rem] mb-4 text-hanaDeepGreen flex flex-row items-center gap-3 '>
            <FcIdea />
            예금?
          </div>
          <div className='flex flex-col gap-5'>
            <div>
              🔸예금은 일정 계약기간 동안 원하는 금액을 한번에 은행에 맡기는
              형식
            </div>
            <div className='border rounded-xl p-5 flex flex-col gap-3 font-hanaCM text-gray-500'>
              <div>ex) 1천만원을 1년 간 예금한 경우</div>
              <div>
                1천만원을 그래도 첫 달에 예치한 이후 12개월 동안 더이상 납입하지
                않다가 만료 이후에 금액+이자를 받는 예금 형식
              </div>
            </div>
            <div>
              🔸같은 금리라면 적금보다는 예금으로 돈을 관리하는 것이 더 많은
              금리를 받을 수 있어요.
            </div>
            <div>
              🔸목돈이 생겼거나 적금을 통해 마련된 돈이 있다면 고금리 이율인
              정기예금을 통해서 다시 목돈을 한꺼번에 예치해 두신다면 이자를 더
              많이 받을 수 있어요!
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
