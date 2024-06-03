import { FC } from 'react';

interface IProps {
  categoryName: string;
  isClicked: boolean;
  onClick: (keyword: string) => void;
}

export const NewsCategory: FC<IProps> = ({
  categoryName,
  isClicked,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(categoryName)}
      className={`${isClicked ? 'bg-[#505866] text-[#F2F4F6]' : 'bg-[#F2F4F6] text-[##505866]'} py-3 px-5 rounded-full text-xl font-hanaMedium cursor-pointer`}
    >
      {categoryName}
    </div>
  );
};
