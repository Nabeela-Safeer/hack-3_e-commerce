import React from "react";
import Link from "next/link";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import {FiHeart, FiShoppingCart } from 'react-icons/fi'
const Navbar = () => {
  return (
    <header className="bg-teal-900 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href={"/"} className="flex title-font font-semibold items-center mb-4 md:mb-0">
          <h1 className="ml-3 text-3xl text-white hover:scale-125">
            Home<span className="text-teal-400">Decour</span>
          </h1>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex gap-5 flex-wrap items-center text-base justify-center text-white">
          <Link href={"/"} className="mr-5 hover:text-teal-400 duration-300 hover:scale-110">
            Home
          </Link>
          <Link href={"/sofa"} className="mr-5 hover:text-teal-400 duration-300 hover:scale-110">
            Sofa
          </Link>
          <Link href={"/contact"} className="mr-5 hover:text-teal-400 duration-300 hover:scale-110">
            Contact
          </Link>
        </nav>
        <div className="flex gap-5 group">
        <Link href={"#"}><FaFacebook size={20} className="text-white hover:text-teal-400 *:duration-300 hover:scale-110 cursor-pointer"/></Link>
        <Link href={"#"}><FaLinkedin size={20} className="text-white hover:text-teal-400 duration-300 hover:scale-110 cursor-pointer"/></Link>
        <Link href={"/cart"}><FiShoppingCart  size={20} className="text-white hover:text-teal-400 duration-300 hover:scale-110 cursor-pointer"/></Link>
        <Link href={"#"}><FiHeart size={20} className="text-white hover:text-teal-400 duration-300 hover:scale-110 cursor-pointer"/></Link>
        
        </div>
      </div>
    </header>
  );
};
export default Navbar;
