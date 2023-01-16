import React, { useState, useEffect } from "react";
import unknownUser from "../Images/unknownUser.png";
import { BsStarFill } from "react-icons/bs";
import { Link } from 'react-router-dom'
import { useQuery } from "react-query";
import axios from "axios";


function TopBlog() {
  // const [topblog, setTopblog] = useState([]);
  // const [isLoading, setisLoading] = useState(true);
  // useEffect(() => {
  //   fetch("http://localhost:4000/blog/top-blogs")
  //   .then((res) => res.json())
  //   .then((data) =>{
  //     console.log('***************************')
  //     console.log(data);
  //     console.log('***************************  ')
  //     setTopblog(data)})
  //   .finally(() => setisLoading(false));

  // }, []);
  // if (isLoading) return <h1>is Loading...</h1>;

  const fetchTopBlogs = () => {
    return axios.get("http://localhost:4000/blog/top-blogs")
  }
const {data,isLoading}= useQuery('topblogs',fetchTopBlogs)
  if (isLoading) {
  return <h1>Loading...</h1>
}


  return <>
  
  <div className="max-w-[1240px] mx-auto py-16 px-4 text-center ">
      <h1 className="text-5xl font-bold">TOP Blogs</h1>
      <p className="text-2xl py-4">Articles that have the most votes and are liked by users</p>
     <div className="grid grid-rows-none  md:grid-cols-3 py-4 gap-2 md:gap-4 ">
      {
        data.data.map((item)=>{
          return(
          <Link to={`/blogs/singleblog/${item._id}`}>
          <div className="flex flex-col items-center justify-center w-[350px]" >
      <img src={item.imgurl} alt="/" className="w-[100%] object-cover" />
          <p className="mt-5 font-bold">{item.title}</p>
          <span className="flex items-center justify-center">
                          <BsStarFill className="mr-2 text-yellow-500" />{" "}
                          {Math.floor(item.averageScore)}
                        </span>
          </div>
          </Link>
        
         )
        })
      }
      
     </div>
    </div>
  
  
  
  </>
          

}

export default TopBlog;
