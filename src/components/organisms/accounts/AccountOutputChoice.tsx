import { FC, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { ChoiceMenu } from '../../ChoiceMenu';
import { AccountDetailItem } from '../../molecules/AccountDetailItem';
import { dummyData } from '../../../pages/mission3/Mission3AccountOpening';

interface IProps {
  onClick: (account: string) => void;
}

export const AccountOutputChoice: FC<IProps> = ({ onClick }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [choiceAccount, setChoiceAccount] = useState({
    name: '',
    accountNumber: '',
    money: 0,
  });

  const clickedAccount = (account: string, name?: string, balance?: number) => {
    setChoiceAccount({
      name: name || '',
      accountNumber: account,
      money: balance || 0,
    });
    setShowModal(!showModal);
    onClick(account);
  };

  return (
    <>
      {showModal && (
        <ChoiceMenu
          title='출금계좌 선택'
          onClose={() => setShowModal(!showModal)}
        >
          {dummyData.accounts.map((account, index) => (
            <AccountDetailItem
              key={index}
              title={account.name}
              account={account.accountNumber}
              balance={account.money}
              isThreeData={true}
              onClick={clickedAccount}
            />
          ))}
        </ChoiceMenu>
      )}
      <div
        onClick={() => setShowModal(true)}
        className='w-full flex justify-between items-center pt-1 pb-2 border-b-[0.1rem] border-black mb-3 cursor-pointer'
      >
        {choiceAccount.name !== '' ? (
          <div className='flex gap-3 items-center'>
            <img src='/images/logo.svg' alt='logo' className='w-12 h-12' />
            <div className='flex flex-col gap-1 text-hanaGreen'>
              <p className='font-hanaRegular text-lg'>{choiceAccount.name}</p>
              <p className='font-hanaMedium text-xl'>
                {choiceAccount.accountNumber}
              </p>
            </div>
          </div>
        ) : (
          <div className='text-[#979797] font-hanaMedium text-xl mb-1'>
            출금할 계좌를 선택해주세요
          </div>
        )}
        <IoIosArrowDown color='#545454' size={15} className='mr-1' />
      </div>
      {choiceAccount.money !== 0 && (
        <p className='flex gap-2 text-lg'>
          <span className='font-hanaRegular text-[#838383]'>출금가능금액</span>
          <span className='font-hanaCM flex justify-center items-center'>
            {choiceAccount.money.toLocaleString('ko-KR')} 원
          </span>
        </p>
      )}
    </>
  );
};
