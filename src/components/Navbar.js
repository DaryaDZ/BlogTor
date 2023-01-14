import React, { useState,useEffect } from "react";
import logo from "../Images/logo.png";
import { BiSearch } from "react-icons/bi";
import { FiLogIn } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import {Link} from 'react-router-dom'
import {FaFacebook,FaTwitter,FaPinterest,FaInstagram,} from "react-icons/fa";
import Cookie from "cookie-universal";
import { CgProfile } from "react-icons/cg";




function Navbar() {
  const [currentUser ,setCurrentUser]=useState({})
  const [nav, setNav] = useState(false);
  const cookies = Cookie();
  const token = cookies.get("token");

  const handleNav = () => {
    setNav(!nav);
  };   
  useEffect(()=>{
    fetch("http://localhost:4000/user/me", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      auth: `ut ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if(data._id)
      {
        setCurrentUser(data)
      }
      
  })
},[]) 
  


  return (
    <div className="flex w-full justify-between items-center h-30 px-4 absolute z-10 text-white">
      <div>
        <img src={logo} className="w-12 h-12  mt-3 mb-3" alt="logo" />
      </div>
      <div>
        <ul className="hidden md:flex">
          <Link to='/'>
          <li>Home</li>
          </Link>
          <Link to='blogs'>
          <li>Blogs</li>
          </Link>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="hidden md:flex">
        <BiSearch size={20} className="m-2" />
        {currentUser._id ? <Link to="/profile">
         
         <CgProfile size={25} className="m-2 cursor-pointer" />
       </Link>:<Link to ="/login">
        <FiLogIn size={20} className="m-2" />
        </Link>}
     
        
       
      </div>
      <div onClick={handleNav} className="md:hidden z-10">
        {nav ? <AiOutlineClose className="text-black"/> : <HiOutlineMenuAlt4 />}
      </div>

      <div
        onClick={handleNav}
        className={
          nav
            ? "absolute left-0 top-0 w-full bg-gray-100/90 px-4 flex flex-col text-black"
            : "absolute left-[-100%] "
        }
      >
        <ul>
          <img src={logo} className="w-12 h-12  mt-3 mb-3" alt="logo" />
            <li className="border-b">Home</li>

          <li className="border-b">Blogs</li>
          <li className="border-b">About</li>
          <li>Contact</li>
          <div className="flex flex-col">
            <button className="my-4  p-3 border bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary-light)] text-white rounded font-bold">Search</button>
            <button className=" p-3 border bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary-light)] text-white rounded font-bold">Account</button>
          </div>
          <div className="flex justify-between my-6">
            <FaFacebook className="icon" />
            <FaTwitter className="icon" />
            <FaPinterest className="icon" />
            <FaInstagram className="icon" />
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
