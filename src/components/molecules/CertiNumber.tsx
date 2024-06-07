import { useMutation, useQuery } from '@tanstack/react-query';
import React, { Dispatch, FC, SetStateAction, useRef, useState } from 'react';
import { ApiClient } from '../../apis/apiClient';
import { MsgCheckType } from '../../types/users';

interface IProps {
  telecom: string;
  phoneNumber: string;
  setIsMsgCheck: Dispatch<SetStateAction<boolean>>;
  isMsgCheck: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  code: string;
}

export const CertiNumber: FC<IProps> = ({
  telecom,
  phoneNumber,
  isMsgCheck,
  setIsMsgCheck,
  setIsActive,
  code,
}) => {
  const [isCheckActive, setIsCheckActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { mutate: postMsgCheck } = useMutation({
    mutationFn: (codeReq: MsgCheckType) => {
      const res = ApiClient.getInstance().postMsgCheck(codeReq);
      return res;
    },
    onSuccess: (data) => {
      if (data?.check === 'match') {
        setIsMsgCheck(true);
        setIsActive(true);
      }
    },
  });

  const checkActive = () => {
    if (inputRef.current?.value.length === 7) setIsCheckActive(true);
    else setIsCheckActive(false);
  };

  const clickCheckMessage = () => {
    inputRef.current &&
      postMsgCheck({
        code: code,
        input: inputRef.current.value,
      });
  };

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
          maxLength={7}
          type='text'
          pattern='/d*'
          ref={inputRef}
          onBlur={() => checkActive()}
        />
        <button
          onClick={() => clickCheckMessage()}
          className={`${isCheckActive == null || isCheckActive ? 'cursor-pointer' : 'opacity-35'} px-6 py-4 bg-gray-200 ml-5 rounded-xl font-hanaRegular text-lg`}
        >
          확인
        </button>
      </div>
      {isMsgCheck && <div className='mt-2'>인증되었습니다.</div>}
    </div>
  );
};
