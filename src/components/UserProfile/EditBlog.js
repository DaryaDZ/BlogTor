import React, { useRef,useEffect, useState } from 'react'
// import { Editor } from "react-draft-wysiwyg";
// import { EditorState } from "draft-js";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {useParams} from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react';
import { BiLogIn } from 'react-icons/bi';
import Cookie from "cookie-universal";

function EditBlog() {



let params = useParams();
const id = params.id
console.log(id)
const cookies = Cookie();
const token = cookies.get("token");
  const [title,setTitle]=useState("");
  const [content,setContent]=useState("");
  const [imgurl, setimage] = useState("");

  const [isLoading, setisLoading] = useState(true);
  const editorRef = useRef(null);
useEffect(()=>{

  fetch(`http://localhost:4000/blog/single-blog/${id}`,{
    method:"GET",
    headers:{"Content-Type":"application/json"}})
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      setTitle(data.title)
      setContent(data.content)
      setimage(data.imgurl)
    })
    .finally(() => setisLoading(false));

},[]);
if (isLoading) return <h1>is Loading...</h1>;

const EditBlog = (blogId) =>{
  fetch('http://localhost:4000/blog/edit' ,{
    method:"POST",
    headers:{'content-Type':'application/json',
    'auth':`ut ${token}`
    },
    body:JSON.stringify({blogId:blogId,data:{title:title,content:editorRef.current.getContent(),imgurl:imgurl}})
    }).then(res=>res.json()).then(data=>{
      if(data.token !== undefined)
      { 
        cookies.set('token',data.token,{path:'/'});
        window.location.assign("http://localhost:3000/profile/allblogs");

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
    <div  className="flex justify-between w-[90%] ml-16">
    <div className='flex flex-col'>
    <lable className="mr-3 font-bold text-lg">Title:</lable>
        <input type="text" className='border-2 rounded-lg border-black w-[50%] h-10' value={title}
        onChange={(e)=>setTitle(e.target.value)} />
      <lable className="mr-3 font-bold text-lg">ImageURL:</lable> 
    <input type="text" placeholder='Http://Location/imagename.jpg' className='border-2 rounded-lg border-black w-[50%] h-10 mb-2' 
     onChange={(e)=>setimage(e.target.value)}  />
  
     
      <div 
 style={{ border: "1px solid black", minHeight: '270px'}}>

      <Editor onInit={(evt, editor) => editorRef.current = editor} initialValue={content} init={{
        height: 300,menubar: false,plugins: ['a11ychecker','advlist','advcode','advtable','autolink','checklist','export','lists','link','image','charmap','preview','anchor','searchreplace','visualblocks','powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'],toolbar:'undo redo | casechange blocks | bold italic backcolor | ' +
        'alignleft aligncenter alignright alignjustify | ' +
        'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}/>
    </div>
   
      </div>
    <div className='m-9 flex-col'>
      <img src={imgurl} alt="" className="w-52 h-48 ml-7 my-10 "/>
      </div>
    </div>
    <div className='bg-[#F4F3F3] w-full h-28 flex items-center justify-center'>
    <button className='border text-white rounded-3xl p-3 bg-gradient-to-r 
    from-[var(--primary-dark)] to-[var(--primary-light)]' onClick={()=>EditBlog(id)}>Edit</button>
   
    </div>
      
  
   </>
  )
    }

export default EditBlog

