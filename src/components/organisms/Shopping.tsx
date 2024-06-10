import { useMutation } from '@tanstack/react-query';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { ApiClient } from '../../apis/apiClient';
import { SpendType } from '../../types/transaction';

interface Iprops {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const clothes = [
  { src: 'images/clothes1.svg', price: 20000 },
  { src: 'images/clothes2.svg', price: 20000 },
  { src: 'images/clothes3.svg', price: 15000 },
  { src: 'images/clothes4.svg', price: 10000 },
];
const food = [
  { src: 'images/food1.svg', price: 8000 },
  { src: 'images/food2.svg', price: 5000 },
  { src: 'images/food3.svg', price: 5500 },
  { src: 'images/food4.svg', price: 4000 },
];
const furniture = [
  { src: 'images/furniture1.svg', price: 200000 },
  { src: 'images/furniture2.svg', price: 80000 },
  { src: 'images/furniture3.svg', price: 700000 },
  { src: 'images/furniture4.svg', price: 200000 },
];

export const Shopping: FC<Iprops> = ({ setIsModalOpen }) => {
  const [price, setPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [fail, setFaile] = useState<boolean>(false);
  const { mutate: postSpend } = useMutation({
    mutationFn: (spendReq: SpendType) => {
      const res = ApiClient.getInstance().postSpend(spendReq);
      return res;
    },
    onSuccess: () => {
      setFaile(false);
      setTotalPrice((prev) => prev + price);
    },
    onError: () => {
      setFaile(true);
    },
  });

  console.log(fail);
  const clickShopping = (
    amount: number,
    senderTitle: string,
    senderAccountType: string,
    spendType: string
  ) => {
    setPrice(amount);
    postSpend({
      amount,
      senderTitle,
      senderAccountType,
      spendType,
    });
  };

  return (
    <>
      <div className='absolute left-0 top-0 flex flex-col justify-center items-center w-full h-full bg-black bg-opacity-50 z-10'></div>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center rounded-2xl gap-4 bg-white z-50 min-w-[80%]'>
        <div className='w-full flex pt-8'>
          <div className='font-hanaBold text-3xl text-center w-full'>
            쇼핑하기
          </div>
          <IoMdClose
            size={15}
            className='absolute right-4'
            onClick={() => setIsModalOpen((prev) => !prev)}
          />
        </div>
        <div className='p-10 pb-0'>
          <div className='flex gap-8 mb-8'>
            {clothes.map((c) => (
              <div
                className='flex flex-col items-center justify-center gap-2 w-24'
                onClick={() =>
                  clickShopping(c.price, '옷', 'MONEYBOX', 'SHOPPING')
                }
              >
                <img src={c.src} className='w-20' />
                <div className='text-xl font-hanaCM'>
                  {c.price.toLocaleString()}원
                </div>
              </div>
            ))}
          </div>
          <div className='flex gap-8 mb-8'>
            {food.map((f) => (
              <div
                className='flex flex-col items-center justify-center gap-2 w-24'
                onClick={() =>
                  clickShopping(f.price, '음식', 'MONEYBOX', 'FOOD')
                }
              >
                <img src={f.src} className='w-20' />
                <div className='text-xl font-hanaCM'>
                  {f.price.toLocaleString()}원
                </div>
              </div>
            ))}
          </div>
          <div className='flex gap-8'>
            {furniture.map((f) => (
              <div
                className='flex flex-col items-center justify-center gap-2 w-24'
                onClick={() =>
                  clickShopping(f.price, '가구', 'MONEYBOX', 'SHOPPING')
                }
              >
                <img src={f.src} className='w-20' />
                <div className='text-xl font-hanaCM'>
                  {f.price.toLocaleString()}원
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='font-hanaMedium text-2xl mt-2 mb-8 text-center'>
          오늘의 지출 : {totalPrice.toLocaleString()} 원
          {fail && <div className='text-red-500'>계좌잔액이 부족합니다.</div>}
        </div>
      </div>
    </>
  );
};
