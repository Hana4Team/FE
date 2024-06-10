import React, { FC, useEffect, useRef, useState } from 'react';

interface IProps {
  icon: string;
  name: string;
  lastSpend: number;
  balance: number;
  updateValue: (name: string, value: number) => void;
}

export const CategoryEditItem: FC<IProps> = ({
  icon,
  name,
  lastSpend,
  balance,
  updateValue,
}) => {
  const [clicked, setClicked] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onFocus = () => {
    setClicked(true);
  };

  const onBlur = () => {
    inputRef.current!.value = inputRef.current!.value.replace(/[^0-9]/g, '');

    if (inputRef.current!.value == '') {
      inputRef.current!.value = '0';
    }
    updateValue(name, Number(inputRef.current!.value));
    setClicked(false);
  };

  useEffect(() => {
    inputRef.current!.value = balance.toString();
  }, [balance]);

  return (
    <div className='flex flex-row w-full py-3 justify-between items-center'>
      <div className='flex flex-row items-center gap-4'>
        <div className='flex h-20 w-20 justify-center items-center rounded-full bg-gray-100'>
          <img src={icon} alt='icon' className='w-12 h-12' />
        </div>
        <div className='flex flex-col'>
          <p className='font-hanaMedium text-2xl'>{name}</p>
          <p className='font-hanaLight text-2xl tracking-tighter text-gray-400'>
            지난달 {lastSpend.toLocaleString()}원
          </p>
        </div>
      </div>
      <div className='flex flex-col h-full w-48 justify-end items-end'>
        <div
          className={`flex flex-row justify-center items-center text-2xl ${!clicked && 'text-gray-400'}`}
        >
          <input
            className='w-full text-end'
            type='text'
            pattern='\d*'
            onFocus={() => {
              onFocus();
            }}
            onBlur={() => onBlur()}
            maxLength={10}
            ref={inputRef}
          />
          원
        </div>
        <div className='w-full mt-1 h-[0.2rem] bg-gray-300'></div>
      </div>
    </div>
  );
};
