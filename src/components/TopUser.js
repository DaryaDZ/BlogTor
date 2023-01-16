import React, { useState, useEffect } from "react";
import unknownUser from "../Images/unknownUser.png";
import { BsStarFill } from "react-icons/bs";
import { BiSkipNextCircle, BiSkipPreviousCircle } from "react-icons/bi";
import SimpleImageSlider from "react-simple-image-slider";
import { useQuery } from "react-query";
import axios from "axios";


function TopUser() {
  // const [TopUser, setTopUser] = useState([]);

  // const [isLoading, setisLoading] = useState(true);
  // useEffect(() => {
  //   fetch("http://localhost:4000/user/top-users")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setTopUser(data);
  //     })
  //     .finally(() => setisLoading(false));
  // }, []);
  // if (isLoading) return <h1>is Loading...</h1>;

  const fetchTopusers = async() => {
    return await axios.get("http://localhost:4000/user/top-users")
  }

const {data,isLoading,isError,error}=useQuery('topusers',fetchTopusers)
  if (isLoading) {
  return <h1>Loading....</h1>
  }
 if (isError) {
    return <p>{error.message}</p>
  }




  return (
    <>
      <div className="max-w-[1240px] mx-auto py-16 px-4 text-center">
        <h1 className="text-5xl font-bold  text-center">TOP Writers</h1>
        <p className="text-2xl py-4  text-center">
          These users are the best writers
        </p>

        <div className="flex">
          
          <div className="w-full ">
            <ul className="flex w-full  ">
              {data.data.map((item) => {
                return (
                  <>
                    <li className="flex items-center justify-center relative w-full " key={item._id}>
                      
                      <img
                        src={`http://localhost:4000/${item.avatar}`}
                        alt="/"
                        className="w-[70%] h-[70%] object-cover"
                      />
                      <span className="absolute text-white font-bold text-sm mt-[55%] mr-[25%] border-2 p-2 rounded-md w-[25%] h-[8%] bg-gray-900/40 text-center">
                        {item.name}
                        
                      </span>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
     
        </div>

       
      </div>
    </>
  );
}

export default TopUser;
