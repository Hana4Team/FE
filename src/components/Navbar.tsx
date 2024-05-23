import { Link, Outlet } from 'react-router-dom';
import { GoBell } from 'react-icons/go';
import { GoPerson } from 'react-icons/go';
import { HiOutlineHome } from 'react-icons/hi2';

const Navbar = () => {
  return (
    <div>
      <div className='min-h-real-screen'>
        <Outlet />
      </div>
      <div className='sticky bottom-0 flex items-end text-2xl w-full h-[100px]'>
        <div className='flex flex-row justify-around gap-40 items-center rounded-t-[25px] bg-white w-full drop-shadow-3xl py-4'>
          <Link to='#'>
            <GoBell size={50} className='text-slate-500' />
          </Link>
          <div className='absolute top-[-20px] bg-hanaGreen rounded-full w-32 h-32 flex justify-center items-center '>
            <Link to='#'>
              <HiOutlineHome size={50} className='text-white' />
            </Link>
          </div>
          <Link to='#'>
            <GoPerson size={50} className='text-slate-500' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
