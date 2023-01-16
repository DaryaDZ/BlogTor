import React,{useState} from "react";
import HomBackground from "../Images/HomBackground.jpg";
import { FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Cookie from 'cookie-universal'
import Ragisterback from "../Images/Ragisterback.jpg";
import axios from 'axios';
import { useQuery } from "react-query";

const Login = () => {
  const [UserName,setUserName]=useState("");
  const [password ,setPassword] =useState('')
  const cookies = Cookie()
  
  const Login = async()=>
  {
  //   fetch('http://localhost:4000/user/login',{
  //     method:"POST",
  //     headers:{
  //       'Content-Type':'application/json'
  //     },
  //     body:JSON.stringify({username:UserName , password:password})
  // }).then(res=>res.json()).then(data=>{
  //   if(data.token !== undefined)
  //   {
  //     cookies.set('token',data.token,{path:'/'})
  //     window.location.assign("/")
  //   }
  //   if(data.msg)
  //   {
  //     alert(data.msg)
  //   }
  //   console.log(data)
  // })
    
    
    
    
    
    
    
    
}

  return (
    <div className="bg-gray-200/90 w-full h-screen items-center p-20 justify-center flex">
      <img
          src={HomBackground}
          className="w-full h-full object-cover absolute "
          alt=""
        ></img>
          <div className="absolute w-full h-full top-0 left-0 bg-gray-900/30"></div>
      <div className="bg-white w-[50%] h-[600px] flex justify-between items-center absolute mt-20">
        <div className="flex flex-col items-center justify-center w-full">
          <input
            type="text"
            placeholder="Enter the username"
            className=" border-b w-[70%] px-4 mb-6 h-[50px] focus:outline-none"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter the password"
            required
            className="border-b w-[70%] px-4 mb-6 h-[50px] focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-[50%] p-3 border 
            bg-gradient-to-r from-[var(--primary-dark)] 
            to-[var(--primary-light)]
           text-white rounded font-bold"
           onClick={Login}
          >
            Login
          </button>
          <div className="flex items-center justify-between mt-6 text-sm w-full px-20">
            <Link to='/register' className=" text-blue-800 font-bold mr-5">Register Now</Link>
            <Link className=" font-bold">Forget password?</Link>
          </div>

          <div className="flex flex-col w-[60%] mt-10">
            <button className="flex items-center text-center bg-[#4267b2] p-3 border text-white rounded font-bold">
              <FaFacebook className="mr-[40%]" /> Facebook{" "}
            </button>
            <button className="flex items-center text-center bg-[#00acee] p-3 border text-white rounded font-bold">
            
              <FaTwitter className="mr-[40%]" /> Twitter
            </button>
            <button className="flex items-center text-center bg-[#f00] p-3 border text-white rounded font-bold">
           
              <FaGoogle className="mr-[40%]" /> Google
            </button>
          </div>

        </div>
  
        {/* <div className="flex items-center justify-center w-full ">
          <img
            src={HomBackground}
            alt=""
            className="h-[600px] w-[100%] object-cover "
          />
        </div> */}
     
      </div>
        
    </div>
    
  );
};

export default Login;
