import { FC } from 'react';

interface IProps {
  name: string;
  onClick?: () => void;
}

export const ChoiceItem: FC<IProps> = ({ name, onClick }) => {
  return (
    <p
      className='font-hanaRegular text-[1.4rem] pb-3 border-b-[1px] border-[#E6E6E6] cursor-pointer'
      onClick={onClick}
    >
      {name}
    </p>
  );
};
