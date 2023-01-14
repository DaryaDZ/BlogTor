import React, { useEffect, useState } from "react";
import {FiEdit} from 'react-icons/fi';
import {RiDeleteBin6Line} from 'react-icons/ri'
import {Link, Outlet} from 'react-router-dom'
import Cookie from "cookie-universal";

function AllMyPost() {
  const [blog, setBlog] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const cookies = Cookie();
  const token = cookies.get("token");
useEffect(()=>{
  fetch("http://localhost:4000/blog/my-blogs",{
    method:"GET",
    headers:{ "Content-Type": "application/json",
    auth: `ut ${token}`,}})
    .then((res) => res.json())
    .then((data) => setBlog(data))
    .finally(() => setisLoading(false));

    
},[])
 
  if (isLoading) return <h1>is Loading...</h1>;

const deleteBlog =(blogId)=>{
  fetch('http://localhost:4000/blog/delete',{
    method:"POST",
    headers:{'content-Type':'application/json',
    'auth':`ut ${token}`},
    body:JSON.stringify({blogId})
  }).then((res) => res.json()).then((data)=>{
    // setBlog(data);
      window.location.assign("/profile/allblogs")
    })
}

  return (
    <div className="w-full bg-[#F4F3F3]">
      <div className="ml-20 w-[88%] h-full flex flex-wrap" >
          
          {
            blog.map((item) =>{
              return(
            <div className="m-5 p-5 w-[250px] border-2 border-[var(--primary-light)] rounded-md bg-[rgb(255, 244, 244)]">
              <ul>
                <div className="flex justify-center">
                <img src={item.imgurl} alt="" className="w-full mt-1"/>
                </div>
             <div className="p-3 font-bold text-center">
                {item.title}
             </div>
             <div className="flex justify-between items-center">
             <Link to={`/profile/editblog/${item._id}`}>
                <FiEdit className="w-5 h-5 text-green-500  mt-5"/>
                </Link>
                <button onClick={()=>deleteBlog(item._id)}>
                  <RiDeleteBin6Line className="w-5 h-5 text-red-500 mt-5"/>
                  </button>
             </div>
               
            
            
              </ul>
             </div>
              );
            })
          }
    
      
      
        
      </div>
    </div>
  );
}
export default AllMyPost;
