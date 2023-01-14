import React, { useEffect, useState } from "react";
import { IoTerminal } from "react-icons/io5";
import BlogBack from "../Images/BlogBack.jpg";
import { Link } from "react-router-dom";
import {FaComments} from 'react-icons/fa';
import {BsStarFill} from 'react-icons/bs'
import BlogbyId from "./BlogbyId";

function Blogs() {
  const [allBlog, setAllBlog] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/blog")
      .then((res) => res.json())
      .then((data) =>{console.log(data) ;setAllBlog(data)})
      .finally(() => setisLoading(false));

    



  }, []);

  if (isLoading) return <h1>is Loading...</h1>;

  return (
    <div className="w-full  p-20 bg-gray-900">
      <div className="ml-20 w-[88%] h-full flex flex-wrap">
        {allBlog.map((item) => {
          return (
            <div className="m-5  w-[350px] h-[370px] border-2  rounded-md bg-[rgb(255, 244, 244)] bg-white">
              <ul>
                <div className="flex justify-center">
                  <img src={item.imgurl} alt="" className="w-[50%] mt-1 object-cover" />
                </div>
                <div className="p-3 font-bold text-center">
                  <h1>{item.title}</h1>
                </div>

                <div className="flex justify-between items-center ">
                  <div className="flex justify-center items-center">
                  <Link to={`/blogs/singleblog/${item._id}`}>
                    <button className="border-2 m-3 p-2  bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary-light)] text-white rounded-lg ">
                      Read More
                    </button>
                  </Link>
                
                  </div>
                  
                  <div className="flex justify-center items-center">

                  <p className="mr-2">{Math.floor(item.averageScore)}</p><BsStarFill  className="text-lg mr-2 text-[var(--primary-light)]"/>
                  </div>

                </div>
              </ul>
            </div>
          );
        })}
        
      </div>
    </div>
  );
}

export default Blogs;
