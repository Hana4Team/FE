import { FC } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

interface Iprops {
  onClick: () => void;
  type: string;
  choice?: string;
}

export const SelectMenu: FC<Iprops> = ({ onClick, type, choice }) => {
  return (
    <div
      className='flex flex-col w-full cursor-pointer'
      onClick={() => onClick()}
    >
      <div className='flex m-full justify-between flex-row'>
        <p
          className={`flex my-auto font-hanaMedium text-2xl pb-2 ${choice == '' ? 'text-gray-400' : ''}`}
        >
          {choice == '' ? `${type}을 선택해주세요` : choice}
        </p>
        <div className='flex justify-center items-center pt-2'>
          <IoIosArrowDown color='545454' size={15} />
        </div>
      </div>
      <div className='bg-black h-[0.05rem] mt-1'></div>
    </div>
  );
};
