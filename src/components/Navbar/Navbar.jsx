import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Logo from "../../assets/NewLogo.png";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="absolute z-10 flex h-24 w-full items-center justify-between px-10 text-black">
      <img src={Logo} alt="logo" className="w-14 md:ml-24" />
      <h1 className="w-full px-4 text-2xl font-bold text-white">MONSU.</h1>

      <ul className="mr-24 hidden text-lg font-bold text-white md:flex ">
        <li className="cursor-pointer px-8 transition hover:text-emerald-900">
          <Link to="/temperature-monitoring-app/">Home</Link>
        </li>
        <li className="mx-5 cursor-pointer px-8 transition hover:text-emerald-900">
          <Link to="/temperature-monitoring-app/about">About</Link>
        </li>
        <li className="cursor-pointer px-8 transition hover:text-emerald-900">
          <Link to="/temperature-monitoring-app/login">Login</Link>
        </li>
      </ul>

      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
      </div>
      <ul
        className={
          nav
            ? "fixed right-8 top-20 h-56 w-[35%] rounded-2xl bg-gradient-to-b from-emerald-500 to-emerald-400 duration-500 ease-in-out"
            : "fixed left-[-100%] duration-500 ease-in-out"
        }
      >
      </ul>
    </div>
  );
};

export default Navbar;
