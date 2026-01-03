import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsSoundwave } from "react-icons/bs";
const NavBar = ({open, setopen}) => {

  return (
    <div className="fixed z-100 md:hidden w-full h-10  bg-red-800 flex ">
      <div className="p-2" >
        <button onClick={() => setopen(!open)}><GiHamburgerMenu className="text-2xl  text-white " /></button>
    
      </div>
      <div className="flex gap-2 text-2xl text-white mx-auto items-center ">
        <BsSoundwave className="" />
        WAVEFORM
      </div>
    </div>
  );
};

export default NavBar;
