import React, { FC } from 'react';

interface IProps {
  step: number;
}

export const IntroduceStep: FC<IProps> = ({ step }) => {
  return (
    <>
      {step === 0 ? (
        <div className='font-hanaMedium text-2xl'>
          <div className='mb-8 text-center text-3xl'>
            1단계 내 소비습관 알기
          </div>
          <div>방법</div>
          <div>
            <div>지난달 나의 소비습관을 확인합니다.</div>
            <div>지난달 소비내역을 참고하여 이번 달 예산을 설정합니다.</div>
            <div>
              카테고리별로 더 상세하게 예산을 확인하고 설정할 수 있습니다.
            </div>
            <div>성공하면 하나머니를 지급해드립니다.</div>
          </div>

          <div>소비습관이란?</div>
          <div>
            지난달 소비를 확인하고 예싼을 설정하면 소비를 통제할 수 있습니다.
          </div>
        </div>
      ) : step === 1 ? (
        <div className='font-hanaMedium text-2xl'>
          <div className='mb-8 text-center text-3xl'>2단계 소비 줄여보기</div>
          <div>방법</div>
          <div>
            <div>
              머니박스 통장을 개설하여 통장쪼개기를 통해 수입과 지출을 통제할 수
              있습니다.
            </div>
            <div>
              머니박스 이용 한달 후 지난달 소비내역과 비교하여 소비가 5%이상
              감소되었을 시 2단계 성공
            </div>
            <div>성공하면 하나머니를 지급해드립니다.</div>
          </div>

          <div>머니박스란?</div>
          <div>
            <div>
              하나의 통장으로 용도별로 공간을 나누어 사용 할 수 있는 똑똑한
              입출금통장입니다.
            </div>
            <div>
              하나의 통장을 3개의 공간으로 나누어 사용함으로써 지출을 통제할 수
              있습니다.
            </div>
            <div>
              <div>
                파킹 : 수시 입출금이 가능하면서, 이자도 받을 수 있는 공간
              </div>
              <div>
                소비 : 계획적인 소비관리를 위한 하나체크카드 결제 전용 공간
              </div>
              <div>
                저축 : 꾸준히 돈을 모을 수 있는 저축 공간. 출금시 연간 최저금리
                적용
              </div>
            </div>
          </div>
        </div>
      ) : step === 2 ? (
        <div className='font-hanaMedium text-2xl'>
          <div className='mb-8 text-center text-3xl'>3단계 저축습관 들이기</div>
          <div>방법</div>
          <div>
            <div>
              100일 적금을 개설하여 100일동안 매일매일 저축에 도전할 수
              있습니다.
            </div>
            <div>
              100일이 지난 후 3단계 성공! 50일 이상 저축에 성공할 시 금리 6% 가
              지급됩니다.
            </div>
            <div>성공하면 하나머니를 지급해드립니다.</div>
          </div>

          <div>100일 적금?</div>
          <div>
            <div>
              적은 금액이라도 매일 저축하는 습관을 기르기 위한 적금상품입니다.
            </div>
            <div>달력을 보며 나의 저축 현황을 확인할 수 있습니다.</div>
          </div>
        </div>
      ) : step === 3 ? (
        <div className='font-hanaMedium text-2xl'>
          <div className='mb-8 text-center text-3xl'>4단계 목돈모으기</div>
          <div>방법</div>
        </div>
      ) : step === 4 ? (
        <div className='font-hanaMedium text-2xl'>
          <div className='mb-8 text-center text-3xl'>5단계 예금 가입해보기</div>
          <div>방법</div>
        </div>
      ) : null}
    </>
  );
};
