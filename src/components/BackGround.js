import React,{useState} from "react";
import { AiOutlineSearch } from "react-icons/ai";
import HomBackground from "../Images/Back.jpg";
import Typed from "react-typed-v2";

const BackGround = () => {

  return (
    <>
      <div className="w-full h-screen relative">
        <img
          src={HomBackground}
          className="w-full h-full object-cover"
          alt=""
        ></img>
      </div>
      <div className="absolute w-full h-full top-0 left-0 bg-gray-900/30"></div>
      <div className="absolute top-0 w-full h-full flex flex-col justify-center text-center text-white p-4">
        <Typed
          strings={["Start writing now..."]}
          className="md:text-6xl sm:text-4xl text-3xl font-bold md:py-6 p-2"
          typeSpeed={190}
          loop  
          fadeOutDelay={1700}
          fadeOut
        />
        <form
          className="flex justify-between items-center max-w-[700px] mx-auto w-full border p-1
        rounded-md text-black bg-gray-100/90"
        >
          <div>
            <input
              type="text"
              placeholder="Search Blog Title"
              className="bg-transparent w-[300px] sm:w-[400px] font-[Poppins] focus:outline-none"
            />
          </div>
          <div>
            <button className=" p-3 border bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary-light)] text-white rounded font-bold">
              <AiOutlineSearch
                size={20}
                className="icon"
                style={{ color: "#FFF" }}
              />
            </button>
          </div>
        </form>

      </div>
    </>
  );
};

export default BackGround;
