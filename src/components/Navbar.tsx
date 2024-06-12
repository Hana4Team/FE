import { Link, Outlet, useLocation } from 'react-router-dom';
import { GoBell } from 'react-icons/go';
import { GoPerson } from 'react-icons/go';
import { HiOutlineHome } from 'react-icons/hi2';
import { getCookie } from '../utils/cookie';

const Navbar = () => {
  const location = useLocation();
  const isExistToken = getCookie('token');

  const fixedList = ['/roadmap4', '/roadmap5', '/myhome', '/savings100Days'];

  return (
    <div>
      <div className='min-h-real-screen'>
        <Outlet />
      </div>
      <div
        className={`bottom-0 z-20 flex items-end text-2xl max-w-[500px] w-full h-[100px] ${fixedList.includes(location.pathname) ? 'fixed' : 'sticky'} ${location.pathname == 'roadmap' && 'bg-hanaSky'}`}
      >
        <div className='relative flex flex-row justify-around gap-40 items-center rounded-t-[25px] bg-white w-full drop-shadow-3xl py-5'>
          <Link to={`${isExistToken ? '/alarm' : '/login'}`}>
            <GoBell size={40} className='text-slate-500' />
          </Link>
          <div className='absolute top-[-20px] bg-hanaGreen rounded-full w-32 h-32 flex justify-center items-center '>
            <Link to='/home'>
              <HiOutlineHome size={50} className='text-white' />
            </Link>
          </div>
          <Link to={`${isExistToken ? '/mypage' : '/login'}`}>
            <GoPerson size={40} className='text-slate-500' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
