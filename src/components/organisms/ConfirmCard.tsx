import { FC } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

interface Iprops {
  text: string;
  url: string;
}

export const ConfirmCard: FC<Iprops> = ({ text, url }) => {
  const navigate = useNavigate();

  const movingFunc = () => {
    navigate(url);
  };

  return (
    <div className='flex h-full justify-center bg-white'>
      <div className='w-full flex-col'>
        <div className='h-[70vh]'>
          <div className='mx-auto mt-[20vh] mb-8 flex justify-center w-[10rem] h-[10rem] rounded-full bg-hanaGreen'>
            <div className='my-auto'>
              <FaCheck size='4rem' color='#FFFFFF' />
            </div>
          </div>
          <p className='font-hanaBold text-3xl text-center'>{text}</p>
        </div>

        <div className='flex justify-center bottom-0'>
          <Button text='완료' onClick={() => movingFunc()} />
        </div>
      </div>
    </div>
  );
};
