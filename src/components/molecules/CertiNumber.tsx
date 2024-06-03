import React, { FC } from 'react';

interface IProps {
  telecom: string;
  phoneNumber: string;
}

export const CertiNumber: FC<IProps> = ({ telecom, phoneNumber }) => {
  return (
    <div className='w-full flex flex-col'>
      <div className='font-hanaBold text-4xl mb-10'>
        휴대폰에 전송된 인증번호
        <br />
        6자리를 입력해주세요
      </div>
      <div className='text-2xl mb-2 font-hanaCM'>
        <span>{telecom}</span> {phoneNumber}
      </div>
      <div className='w-full flex justify-between'>
        <input
          className='font-hanaMedium text-2xl border-b-[1px] border-black w-9/12'
          placeholder='인증번호'
        />
        <button className='px-6 py-4 bg-gray-200 ml-5 rounded-xl font-hanaRegular text-lg'>
          재요청
        </button>
      </div>
    </div>
  );
};
