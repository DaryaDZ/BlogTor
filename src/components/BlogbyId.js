import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
// import parse from "html-react-parser";
import { Editor } from "@tinymce/tinymce-react";
import unknownUser from "../Images/unknownUser.png";
import Cookie from "cookie-universal";
// import StarRating from 'star-rating-react';
import {BsStarFill} from 'react-icons/bs'
import { Rating } from 'react-simple-star-rating'
import BlogOfSpecialUser from "./BlogOfSpecialUser";
import { useQuery } from "react-query";
import axios from "axios";



function BlogbyId() {
  const [rating, setRating] = useState(0)
  const cookies = Cookie();
  const token = cookies.get("token");
  const parse = require("html-react-parser");
  const [blog, setBlog] = useState({});
//   const [current, setcurrent] = useState({});
  const [allComments, setAllComments] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  let params = useParams();
  const id = params.id;
  const editorRef = useRef(null);

  const handleRating = (rate) => {
    setRating(rate)
    fetch('http://localhost:4000/blog/submit-rate',{method:"POST",
    headers:{'content-Type':'application/json',
    'auth':`ut ${token}`
    },body:JSON.stringify({blogId:id,score:rate })

    }).then(res=>res.json()).then(data=>{if(data.token !== undefined)
      { 
        cookies.set('token',data.token,{path:'/'});
        
      }
    })
  }
//   useEffect(() => {

//     const abc = async () => {

//       // promise - async await vs .then  - promise.all
// // hamzaman 2 fetch ejra mishavad
//       const [res1, res2] = await Promise.all([
//         fetch(`http://localhost:4000/blog/single-blog/${id}`, {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         }),
//         fetch(`http://localhost:4000/comment/by-blog/${id}`, {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         })
//       ]);

//       const [blogs, comments] = await Promise.all([
//         res1.json(),
//         res2.json()
//       ]);

//       setBlog(blogs);
//       setAllComments(comments);
//       setisLoading(false)
//     }

//     abc()
    // fetch(`http://localhost:4000/blog/single-blog/${id}`, {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setBlog(data);
    //     fetch(`http://localhost:4000/comment/by-blog/${id}`, {
    //       method: "GET",
    //       headers: { "Content-Type": "application/json" },
    //     })
    //       .then((res) => res.json())
    //       .then((data) => {
    //         console.log(data);
    //         setAllComments(data);
    //       });
    //   })

    //   .finally(() => setisLoading(false));
  // }, []);

  // if (isLoading) return <h1>is Loading...</h1>;

  const fetchsingleBlog = async () => {
    const res1 = await axios.get(`http://localhost:4000/blog/single-blog/${id}`)
    const res2 = await axios.get(`http://localhost:4000/comment/by-blog/${id}`)
    return { res1, res2 }
}
  const {data} = useQuery('singleBlog', fetchsingleBlog)

console.log(data.res2.data)


  const SubmitComment = () => {
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

        } else  {
          if(data._id !== blog.creator._id)
          {
            fetch('http://localhost:4000/comment/submit',{method:"POST",
            headers:{'content-Type':'application/json',
            'auth':`ut ${token}`
            },body:JSON.stringify({text:JSON.stringify(editorRef.current.getContent()) ,blogId:id })
  
            }).then(res=>res.json()).then(data=>{if(data.token !== undefined)
              { 
                handleRating();
                cookies.set('token',data.token,{path:'/'});
                handleReset();
              }
              if(data.msg)
              {
                alert(data.msg)
                window.location.assign(`/blogs/singleblog/${id}`);
              }}).finally(() => setisLoading(false));
  
          }
          else {
            alert("You Can't Submit Commnet")
          }
          }
      
      });
  };
  const handleReset = () => {
    // Set the initial value
    setRating(0)
  }
// rating
// const RateBlog =(val)=> {
//     fetch('http://localhost:4000/blog/submit-rate',{method:"POST",
//     headers:{'content-Type':'application/json',
//     'auth':`ut ${token}`
//     },body:JSON.stringify({blogId:id,score:val })

//     }).then(res=>res.json()).then(data=>{if(data.token !== undefined)
//       { 
//         cookies.set('token',data.token,{path:'/'});
        
//       }
//     })
// }

//   const sth = `http://localhost:4000/${allComments.user.avatar}`;
  return (
    
    <div className="w-full p-20 bg-gray-900 ">
      <div className="w-[100%] p-10 bg-white flex flex-col  ">
        <div className=" flex w-full">
          <img src={data.res1.data.imgurl} alt="" className="w-full" />
        </div>
        <div className="mt-5 w-full flex justify-between">
          <div>
            <h1 className="font-bold text-3xl text-left">{data.res1.data.title}</h1>
            <h3 className="text-sm text-left">{data.res1.data.createdAt}</h3>
            <h3 className="text-sm text-left flex justify-start items-center">
              <BsStarFill  className="text-lg mr-2"/>{data.res1.data.averageScore.toFixed(1)}</h3>
            
          </div>

          <div className="w-[30%] flex justify-end items-center ">
            <Link className="hover:font-bold" to={`/blogs/blogsofspeceficuser/${data.res1.data.creator._id}`} >
              <h4 className="mr-2">{data.res1.data.creator.name}</h4>
            </Link>
            <img
              src={data.res1.data.creator.avatar?`http://localhost:4000/${data.res1.data.creator.avatar}`:unknownUser}
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
        </div>
        <div className="mt-10">{parse(data.res1.data.content)}</div>
        <h3 className="font-bold mt-5 text-xl">Comments</h3>
        <div className="w-full border-4 rounded-xl p-5">
          {data.res2.data.map((item) => {
            return (
              <div className=" border-2 p-2 mt-3 rounded-xl">
                <div className="flex items-center">
                  <img
                    src={item.user.avatar?`http://localhost:4000/${item.user.avatar}`:unknownUser}
                    alt="avatar"
                    className="rounded-lg w-12 h-12 m-2 object-cover"
                  />
                  <div>
                    {" "}
                    <span className="font-bold">{item.user.name}</span>{" "}
                    {parse(item.text)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full  mt-10 border-b">
          <h3 className="text-xl font-bold mb-5">Your Commnet</h3>
          <div style={{ border: "1px solid black", minHeight: "200px" }}>
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  "a11ychecker",
                  "advlist",
                  "advcode",
                  "advtable",
                  "autolink",
                  "export",
                  "lists",
                  "link",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "powerpaste",
                  "fullscreen",
                  "formatpainter",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | casechange blocks | bold italic backcolor | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
            <div className="flex justify-between">
              <div className="flex flex-col">
              <div className="flex items-center ">
                
                  <h3 className="mr-5 font-bold text-xl ml-1"> Rate this article: </h3>              
                {/* <StarRating
                  size={5}
                  value={0}
                  initialValue={value}
                  onChange={(value)=>RateBlog(value)}
                /> */}
                <Rating onClick={handleRating} initialValue={rating}  allowFraction={true} ltr={true} className="rotate-90 ml-20 "/>
                </div>
                
                <button
                  className="border-2 p-2 m-5 bg-gradient-to-r 
              from-[var(--primary-dark)] to-[var(--primary-light)] text-white rounded-xl font-bold"
                  onClick={SubmitComment}
                >
                  Submit
                </button>
                
              

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogbyId;
// initialValue={}
// {current.avatar ? current.avatar : unknownUser}
