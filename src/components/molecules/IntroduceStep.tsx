import React, { FC } from 'react';

const intro = [
  {
    title: 'Step 1 내 소비습관 알기',
    text: '소비패턴을 알아보고 예산을 정하면 1단계 완료~',
  },
  {
    title: 'Step 2 소비 줄여보기',
    text: '머니박스 통장을 만들고 한달동안 소비를 줄여보아요~ 전달 대비 소비를 5% 이상 줄이면 2단계 클리어',
  },
  {
    title: 'Step 3 저축 습관 들이기',
    text: '저축습관을 들이기위해 100일 적금을 가입해보아요',
  },
  {
    title: 'step 4 목돈 모으기',
    text: '이제 진짜 큰돈을 모을 차례! 목표금액을 정해서 적금만기일까지 화이팅!',
  },
  {
    title: 'step 5 예금 가입해보기',
    text: '만기된 적금을 예금에 넣어서 돈을 관리해 보아요',
  },
];

interface IProps {
  step: number;
}

export const IntroduceStep: FC<IProps> = ({ step }) => {
  return (
    <>
      <div className='font-hanaMedium text-2xl'>
        <div className='mb-8 text-center text-3xl'>{intro[step].title}</div>
        <div>{intro[step].text}</div>
      </div>
    </>
  );
};
