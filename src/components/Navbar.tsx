import { Link, Outlet } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <Outlet />
      <div className='flex justify-between pt-5 px-10 text-2xl'>
        <Link to='/'>Landing</Link>
        <Link to='/home'>Home</Link>
      </div>
    </>
  );
}
