import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import ProfileBack2 from "../../Images/ProfileBack2.jpg";
import Profiel from "../../Images/Profile.jpg";
import logo from "../../Images/logo.png";
import { MdHome } from "react-icons/md";
import Cookie from "cookie-universal";
import { IoNotificationsOutline } from "react-icons/io5";
import { TfiWrite, TfiCup } from "react-icons/tfi";
import { BsCalendarDate } from "react-icons/bs";
import {TbWriting} from 'react-icons/tb'
import {SiBloglovin} from 'react-icons/si'
import {FiEdit} from 'react-icons/fi'
import { FiLogOut } from "react-icons/fi";
// import Typed from "react-typed-v2";
// import LoginUserPage from "./LoginUserPage";

function Profile() {
  const cookies = Cookie();
  const token = cookies.get("token");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [blog, setBlog] = useState([]);
  let blogcount=0;




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
      // console.log(data);
      if (!data._id) {
        window.location.assign("/login");
      } else {
        setCurrentUser(data);
      }
    });

   },[]);
   fetch("http://localhost:4000/blog/my-blogs",{
      method:"GET",
      headers:{ "Content-Type": "application/json",
      auth: `ut ${token}`,}})
      .then((res) => res.json())
      .then((data) => setBlog(data))
  const sth = `http://localhost:4000/${currentUser.avatar}`;

const Logout =()=>{
  cookies.remove('token',{path:'/'})
  window.location.assign("/");
}




  // console.log(sth)
  return (
    <>
    {/* topheder */}
      <div className="bg-[#F4F3F3] ">
        <div className=" w-full h-[8%]bg-[#F4F3F3]  flex justify-end">
          <div className="flex absolute items-center justify-center m-2">
            <IoNotificationsOutline className="w-6 h-6 cursor-pointer" />
            <img
              src={sth}
              alt="avatar"
              className="rounded-full w-12 h-12 m-2 object-cover"
            />
            <p className="font-bold">{currentUser.name}</p>
          </div>
        </div>




        <div className="w-full  flex bg-[#F4F3F3]">



          {/* side Bar */}
          <div className="w-[17%] bg-white h-screen ">
            <div className="flex items-center justify-center">
            <img src={logo} alt="logo" className="w-14 h-14"/>
            </div>
            <ul className="mt-10">
            <Link to='allblogs'>
            <li className=" flex items-center  border-b text-lg hover:bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary-light)] w-full hover:text-white ">   
              <SiBloglovin className="mr-2" />All Blog</li>
            </Link>
              <Link to='addblog'>
              <li className=" flex items-center  border-b text-lg hover:bg-gradient-to-r from-[var(--primary-dark)] hover:text-white
               to-[var(--primary-light)]"> <TbWriting className="mr-2" />Add Blog</li>
              </Link>
              <Link to="editprofile">
              <li className="flex items-center  border-b text-lg hover:bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary-light)] hover:text-white ">
              <FiEdit className="mr-2" />
                Edit Profile</li>
              </Link>
              
            <Link to='/'>
            <li className="flex items-center  border-b text-lg hover:bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary-light)] hover:text-white">
              <MdHome className="mr-2" />
                Back to Home</li>
            </Link>
              <li onClick={Logout} className="flex items-center  border-b text-lg hover:bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary-light)] hover:text-white">
              <FiLogOut  className="mr-2 "  />
               Logout</li>
            </ul>
          </div>
{/* content */}

          <div className="w-full justify-center items-center h-screen flex bg-[#F4F3F3] flex-col left-0">
            {/* profile info */}
            <div className="w-[90%] items-center flex bg-[#F4F3F3] h-[30%] mt-12">
              <img
                src={sth}
                alt="avatar"
                className="rounded-full w-28 h-28 m-4 object-cover absolute justify-start"
              />
              <div className="flex flex-col ">
                <p className="font-bold  ml-36 text-3xl ">{currentUser.name}</p>
                <p className="  ml-36 text-m text-justify w-[50%] ">
                {currentUser.bio}
                </p>
              </div>
              <div className="m-8">
                <Link to='editprofile'>
                <button className="border w-full bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary-light)] text-white rounded-3xl p-3 m-5">
                  Edit Profile
                </button>
                </Link>
              </div>
            </div>
{/* rate */}
            <div className=" w-[90%] flex justify-between items-center border-b border-[var(--primary-dark)]">
              <div className="w-[30%] flex justify-center items-center">
                <TfiWrite className="w-7 h-7 text-[#797A7E]" />
                <p className=" m-3 text-[#797A7E]">
                  {" "}
                  published blogs <br />{" "}
                  <p className="text-sm text-[#A2B29F]">{blog.length} number</p>{" "}
                </p>
              </div>
              <div className="w-[30%] flex justify-center items-center">
                <TfiCup className="w-7 h-7 text-[#797A7E]" />
                <p className=" m-3 text-[#797A7E]">
                  {" "}
                  Author's score <br />{" "}
                  <p className="text-sm text-[#A2B29F]">{Math.floor(currentUser.averageScore)} Rate</p>{" "}
                </p>
              </div>

              <div className="w-[30%] flex justify-center items-center">
                <BsCalendarDate className="w-7 h-7 text-[#797A7E]" />
                <p className=" m-3 text-[#797A7E]">
                  {" "}
                  Date of registration <br />{" "}
                  <p className="text-sm text-[#A2B29F]">
                    {currentUser.createdAt}
                  </p>{" "}
                </p>
              </div>
              <div className="w-[30%] flex justify-center items-center"></div>
              <hr />
            </div>
{/* menu */}
            {/* <div className="w-[90%] bg-[#F4F3F3] h-[8%] divide-[var(--primary-dark)] ">
              <ul className="flex text-sm ">
                <Link to='allblogs'>
                <li className="justify-start items-start hover:border-b-8 border-[var(--primary-dark)] rounded-sm">All Blog</li>
                </Link>
                <Link to='addblog'>
                <li className="  hover:border-b-8 border-[var(--primary-dark)] rounded-sm ">Add Blog</li>
                </Link>
              </ul>
                <hr />
     
           
            
            </div> */}

              {/* main  */}
            <div className="w-[100%]  mt-5 ">
            
              <Outlet />
           
            </div>
          </div>
        
        </div>
      </div>
    </>
  );
}

export default Profile;
