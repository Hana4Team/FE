import { Link, Outlet, useLocation } from 'react-router-dom';
import { GoBell } from 'react-icons/go';
import { GoPerson } from 'react-icons/go';
import { HiOutlineHome } from 'react-icons/hi2';
import { FC } from 'react';

const Navbar = () => {
  const location = useLocation();

  const fixedList = ['/roadmap4', '/roadmap5', '/myhome', '/savings100Days'];

  return (
    <div>
      <div className='min-h-real-screen'>
        <Outlet />
      </div>
      <div
        className={`bottom-0 z-20 flex items-end text-2xl w-full h-[100px] ${fixedList.includes(location.pathname) ? 'fixed' : 'sticky'} ${location.pathname == 'roadmap' && 'bg-hanaSky'}`}
      >
        <div className='flex flex-row justify-around gap-40 items-center rounded-t-[25px] bg-white w-full drop-shadow-3xl py-5'>
          <Link to='/alarm'>
            <GoBell size={40} className='text-slate-500' />
          </Link>
          <div className='absolute top-[-20px] bg-hanaGreen rounded-full w-32 h-32 flex justify-center items-center '>
            <Link to='/home'>
              <HiOutlineHome size={50} className='text-white' />
            </Link>
          </div>
          <Link to='/mypage'>
            <GoPerson size={40} className='text-slate-500' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
