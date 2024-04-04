import React, {useState} from 'react';
import { uhb } from '../assets';
const Navbar= () => {

    return (
<header className="text-rose-800 shadow-md  body-font">
  <div className="md: px-40 px-10 mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <img className='h-16 ' src={uhb} />
      <span className="ml-3 text-xl"></span>
    </a>
    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
      <a  className="">Courses</a>
      <a className="mr-5 hover:text-gray-900">About</a>

    </nav>
    
  </div>
</header>
    );
};

export default Navbar;
