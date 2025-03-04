import { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminNav = () => {
 

  return (
    <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-lg gap-2">
        <Link className='hover:bg-gray-400 p-2 rounded-md'>Home</Link>
        <Link className='hover:bg-gray-400 p-2 rounded-md'>Users</Link>
        <Link className='hover:bg-gray-400 p-2 rounded-md'>Cloned Voices</Link>
      </ul>
    </div>
  </div>
  <div className="navbar-center">
    <a className="text-orange-600 text-xl font-bold">JSF Admin</a>
  </div>
  <div className="navbar-end">
    <button className="btn btn-error ">
      Logout
    </button>
    
  </div>
</div>
  );
};

export default AdminNav;
