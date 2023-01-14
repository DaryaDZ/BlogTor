import React,{useState} from "react";
import Ragisterback from "../Images/Ragisterback.jpg";
import { BsFillFilePersonFill } from "react-icons/bs";
import {RiUserSmileLine } from "react-icons/ri";
import Cookie from 'cookie-universal'


const Register = () => {
const [userName ,setUserName]=useState("")
const [name ,setName] = useState("");
const cookies = Cookie()

const RegisterUser = async ()=> {
  fetch('http://localhost:4000/user/signup' ,{
  method:"POST",
  headers:{'content-Type':'application/json',
  },
  body:JSON.stringify({username:userName ,name:name})
  }).then(res=>res.json()).then(data=>{
    if(data.token !== undefined)
    {
      cookies.set('token',data.token,{path:'/'})
      window.location.assign("http://localhost:3000/login")
    }
    if(data.msg)
    {
      alert(data.msg)
    }
    console.log(data)
  })
}
  return (
    <>
      <div className="w-full h-screen relative flex items-center justify-center">
        <img
          src={Ragisterback}
          className="w-full h-full object-cover absolute "
          alt=""
        ></img>
        <div className="absolute w-full h-full top-0 left-0 bg-gray-900/30"></div>
        <div className="w-[30%] h-[80%] bg-white absolute m-20  flex items-center justify-start flex-col  ">
          <h1 className="text-4xl mb-10 mt-20 border-b w-[90%] p-3 text-orange-600 ">
            Register Here
          </h1>
          <div className="flex items-center w-full ml-10">
              <BsFillFilePersonFill className="absolute text-2xl text-gray-400  " />              
            <input
              type="text"
              placeholder="Enter your Username"
              className="border w-[90%] h-[8%] p-6 "
              onChange={(e)=>setUserName(e.target.value)}
            />
          </div>
          <div  className="flex items-center w-full ml-10  mb-10">
        <RiUserSmileLine className="absolute text-2xl text-gray-400" />
          <input
            type="text"
            placeholder="Enter your Name"
            className="border w-[90%] h-[8%] p-6 "
            onChange={(e)=>setName(e.target.value)}
            />
            </div>

          <button className="w-[90%] p-3 border 
          bg-gradient-to-r from-[var(--primary-dark)] 
          to-[var(--primary-light)]
           text-white rounded font-bold"
           
           onClick={RegisterUser}>
            Sing Up
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
