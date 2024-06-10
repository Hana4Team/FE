import { FC } from 'react';

interface Iprops {
  receiveName: string;
  onClick: (receiveName: string, selectSend?: boolean) => void;
}

export const MoneyBoxMoveItem: FC<Iprops> = ({ receiveName, onClick }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center w-2/5 h-52 bg-[#${receiveName === '파킹' ? '9BDEDF' : receiveName === '소비' ? 'FFB2B7' : '9CDAB8'}] rounded-2xl text-2xl font-hanaRegular cursor-pointer`}
      onClick={() => onClick(receiveName)}
    >
      <p>
        <span className='font-hanaMedium'>{receiveName}</span>
        {receiveName == '소비' ? '로' : '으로'}
      </p>
      이동
      <img
        src={
          receiveName === '파킹'
            ? 'icons/safebox.svg'
            : receiveName === '소비'
              ? 'icons/wallet.svg'
              : 'icons/piggybank2.svg'
        }
        alt='icon'
        className='w-[4.5rem] h-[4.5rem] mt-2'
      />
    </div>
  );
};
