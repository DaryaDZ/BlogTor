import React, { useRef,useEffect, useState } from 'react'
// import { Editor } from "react-draft-wysiwyg";
// import { EditorState } from "draft-js";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Cookie from "cookie-universal";
import { Editor } from '@tinymce/tinymce-react';



function AddBlog() {
  const cookies = Cookie();
  const token = cookies.get("token");
  const [title,setTitel]=useState("");
  const [file, setFile] = useState("");
  const [image,setIamge]=useState("")
  const editorRef = useRef(null);
//   const [editorState, setEditorState] = useState(() =>
//   EditorState.createEmpty()
// );
//   useEffect(() => {
//     console.log(editorState);
//   }, [editorState]);


//   useEffect(()=>{
//     if(file){
//         const fileReader =new FileReader()
//         fileReader.onload=function(e){
//           setIamge(e.target.result)
//         }
//         fileReader.readAsDataURL(file)
//     }
// },[file])

  const submitBlog =()=>{
    console.log(file)
  fetch('http://localhost:4000/blog/write' ,{
    method:"POST",
    headers:{'content-Type':'application/json',
    'auth':`ut ${token}`
    },
    body:JSON.stringify({title:title,content: JSON.stringify(editorRef.current.getContent()) ,imgurl:file })
    }).then(res=>res.json()).then(data=>{
      if(data.token !== undefined)
      { 
        cookies.set('token',data.token,{path:'/'});
        window.location.assign("/profile/allblogs");
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
        <input type="text" className='border-2 rounded-lg border-black w-[50%] h-10' 
        onChange={(e)=>setTitel(e.target.value)} />
      <lable className="mr-3 font-bold text-lg">ImageURL:</lable> 
    <input type="text" placeholder='Http://Location/imagename.jpg' className='border-2 rounded-lg border-black w-[50%] h-10 mb-2' 
     onChange={(e)=>setFile(e.target.value)}  />

     
      <div style={{ border: "1px solid black", minHeight: '270px'}}>

      <Editor onInit={(evt, editor) => editorRef.current = editor} initialValue="<p>This is the initial content of the editor.</p>" init={{
        height: 300,menubar: true,plugins: ['a11ychecker','advlist','advcode','advtable','autolink','checklist','export','lists','link','image','charmap','preview','anchor','searchreplace','visualblocks','powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'],toolbar:'undo redo | casechange blocks | bold italic backcolor | ' +
        'alignleft aligncenter alignright alignjustify | ' +
        'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}/>
    </div>
   
      </div>
    <div className='m-9 flex-col'>
      {/* <img src={image} alt="" className="w-52 h-48 ml-7 my-10 "/> */}
      </div>
    </div>
    <div className='bg-[#F4F3F3] w-full h-28 flex items-center justify-center'>
    <button className='border text-white rounded-3xl p-3 bg-gradient-to-r 
    from-[var(--primary-dark)] to-[var(--primary-light)]' onClick={submitBlog}>Submission</button>
   
    </div>
      
  
    </>
  )
}

export default AddBlog

