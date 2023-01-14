import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Typed from "react-typed-v2";
import ProfileBack2 from "../../Images/ProfileBack2.jpg";
import logo from "../../Images/logo.png";
import HomBackground from "../../Images/Back.jpg";
import {
  FaFacebook,
  FaTwitter,
  FaPinterest,
  FaInstagram,
} from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { Link, Outlet } from "react-router-dom";
import Cookie from "cookie-universal";

function ProfileLayout() {
  const[currentUser,setCurrentUser] =useState({})
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };


  const cookies = Cookie();

  const token = cookies.get("token");

  // fetch("http://localhost:4000/user/me", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     auth: `ut ${token}`,
  //   },
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     // console.log(data);
  //     if (!data._id) {
  //       window.location.assign("/login");
  //     }
  //     else
  //     {
  //     setCurrentUser(data)
  //   }
  // });
  // console.log(currentUser._id)

  // const sth = `http://localhost:4000/${avatar}`
  // const sjdh =`http://localhost:4000/${name}`
  return (
    <>
      {/* NavBar */}
      {/* <div className="flex w-full justify-between items-center h-30 px-4 absolute z-10 text-white">
        <div>
          <img src={logo} className="w-12 h-12  mt-3 mb-3" alt="logo" />
        </div>
        <div>
          <ul className="hidden md:flex">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to='blogs'>
            <li>Blogs</li>
            </Link>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div> */}

        {/* <div className="hidden md:flex">
          <FiLogOut size={25} className="m-2 cursor-pointer" />
          <Link to="/profile"> */}
            {/* <img src={sth} alt="" /> */}
            {/* <CgProfile size={25} className="m-2 cursor-pointer" />
          </Link>
        </div>

        <div onClick={handleNav} className="md:hidden z-10">
          {nav ? (
            <AiOutlineClose className="text-black" />
          ) : (
            <HiOutlineMenuAlt4 />
          )}
        </div> */}

        {/* <div
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
              <button className="my-4  p-3 border bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary-light)] text-white rounded font-bold">
                Search
              </button>
              <button className=" p-3 border bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary-light)] text-white rounded font-bold">
                Account
              </button>
            </div>
            <div className="flex justify-between my-6">
              <FaFacebook className="icon" />
              <FaTwitter className="icon" />
              <FaPinterest className="icon" />
              <FaInstagram className="icon" />
            </div>
          </ul>
        </div>
      </div> */}

      {/* profile Layout */}
      {/* <div className="w-full h-screen relative">
        <img
          src={HomBackground}
          className="w-full h-full object-cover"
          alt=""
        ></img>
      </div>
      <div className="absolute w-full h-full top-0 left-0 bg-gray-900/30"></div> */}
      <div className="">
        <Typed
          strings={[`Welcome`]}
          className="md:text-6xl sm:text-4xl text-3xl font-bold md:py-6 p-2"
          typeSpeed={190}
          fadeOutDelay={1700}
          fadeOut
        />
      </div>
    </>
  );
}

export default ProfileLayout;
