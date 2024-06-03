import { FC, useState } from 'react';
import { RiPencilFill } from 'react-icons/ri';

interface Iprops {
  month: number;
  balance: number;
  isMission?: boolean;
  lastSpend?: number;
}

export const BudgetInfo: FC<Iprops> = ({
  month,
  balance,
  isMission,
  lastSpend,
}) => {
  const [isEdit, SetIsEdit] = useState<boolean>(false);
  const [value, setValue] = useState(balance.toLocaleString());

  const valueChangeHandler = (e: any) => {
    let inputPrice = e.target.value;

    inputPrice = Number(inputPrice.replace(/[^0-9]/g, ''));

    setValue(inputPrice.toLocaleString());
  };

  const onClickPencil = () => {
    SetIsEdit(true);
  };

  const onClickConfirm = () => {
    SetIsEdit(false);
  };

  return (
    <div className='flex flex-col w-full p-7 bg-white'>
      <p className='font-hanaRegular text-2xl mb-3'>{month}월 예산</p>
      {/* 보기 모드 */}
      {!isEdit && (
        <div className='flex flex-row mt-2 mb-3 items-center gap-2'>
          <p className='font-hanaHeavy text-5xl'>{value.toLocaleString()}원</p>
          {isMission && (
            <RiPencilFill
              size={25}
              color='545454'
              onClick={() => onClickPencil()}
              className='cursor-pointer'
            />
          )}
        </div>
      )}
      {/* 수정 모드 */}
      {isEdit && (
        <div className='flex flex-row items-center gap-2 font-hanaHeavy text-5xl'>
          <input
            type='text'
            className='w-1/2 border-b-2 text-center'
            value={value}
            onChange={(e) => valueChangeHandler(e)}
            maxLength={10}
          />
          원
          <div
            className='flex justify-center items-center h-10 w-16 ml-5 bg-hanaGreen text-xl font-hanaRegular rounded-2xl text-white cursor-pointer'
            onClick={() => onClickConfirm()}
          >
            확인
          </div>
        </div>
      )}
      {lastSpend && (
        <div className='flex flex-row justify-between mt-4 font-hanaLight'>
          <p className='text-2xl text-gray-400'>지난 달 지출</p>
          <p className='text-2xl'>{lastSpend.toLocaleString()}원</p>
        </div>
      )}
    </div>
  );
};
