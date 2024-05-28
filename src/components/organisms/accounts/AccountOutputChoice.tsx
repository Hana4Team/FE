import { IoIosArrowDown } from 'react-icons/io';

export const AccountOutputChoice = () => {
  return (
    <div className='flex flex-col p-10'>
      <h1 className='text-4xl font-hanaMedium mb-7'>
        어느 계좌에서 출금할까요?
      </h1>
      <div className='w-full flex justify-between items-center pt-1 pb-2 border-b-[0.1rem] border-black mb-3 cursor-pointer'>
        <div className='flex gap-3 items-center'>
          <img src='images/logo.svg' alt='logo' className='w-12 h-12' />
          <div className='flex flex-col gap-1 text-hanaGreen'>
            <p className='font-hanaRegular text-lg'>영하나플러스통장</p>
            <p className='font-hanaMedium text-xl'>000-000000-00000</p>
          </div>
        </div>
        <IoIosArrowDown color='#545454' size={15} className='mr-1' />
      </div>
      <p className='flex gap-2 text-lg'>
        <span className='font-hanaRegular text-[#838383]'>출금가능금액</span>
        <span className='font-hanaCM'>100,000</span>
      </p>
    </div>
  );
};
