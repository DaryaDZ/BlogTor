import React, { useState,useEffect } from "react";
import unknownUser from "../../Images/unknownUser.png";
import Cookie from "cookie-universal";

function EditProfile() {
  const cookies = Cookie();
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");
  const [Name, setName] = useState("");
  const [bio, setBio] = useState("");

  const token = cookies.get("token");

useEffect(()=>{
    if(file){
        const fileReader =new FileReader()
        fileReader.onload=function(e){
        setImage(e.target.result)
        }
        fileReader.readAsDataURL(file)
    }
},[file])

    const submitAvatar = async () => {
        try {
          if (!file) return;
          console.log(file);
    
          const formData = new FormData();
          formData.append("avatar", file);
    
          fetch("http://localhost:4000/user/update-avatar", {
            method: "POST",
            headers: {
              auth: `ut ${token}`,
            },
            body: formData,
          }).then((res) => {
            console.log(res);
          });
        } catch (error) {
          console.log("lol");
        }
      };
    
const EditFetch =()=>{
 
    fetch('http://localhost:4000/user/edit' ,{
        method:"POST",
        headers:{'content-Type':'application/json',
        auth:`ut ${token}`
        },
        body: JSON.stringify({name:Name,bio:bio})
        }).then(res=>res.json()).then(data=>{
          if(data.token !== undefined)
          { 
            cookies.set('token',data.token,{path:'/'})
          }
          if(data.msg)
          {
            alert(data.msg)
          }
          console.log(data)
        })
}
  
const EditUser = () =>{
    submitAvatar();
    EditFetch();
}

  return (
    <>
      <div className="flex w-[90%] ml-16 border-2 bg-white">
        {/*upload image  */}
        <div className=" flex items-center w-[50%]">
          <img
            src={file ? image : unknownUser}
            alt="profileImage"
            className="w-52 h-52 ml-7 my-10 "
          />
          <input type="file" id="file" className="ml-7 mt-5 "  onChange={(e)=>setFile(e.target.files[0])}/>
        </div>
     
        <div className="flex items-center  w-[50%] m-3 ">
          <div className="flex flex-col w-[90%]">
           
            <lable> Name</lable>
            <input
              type="text"
              className="border-2 border-[var(--primary-dark)] focus:outline-none p-1"
              onChange={(e) => setName(e.target.value)}
            />
            <lable>Bio</lable>
            <input
              type="address"
              className="border-2 border-[var(--primary-dark)] h-28 focus:outline-none p-1"
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full h-[20%] bg-[#F4F3F3]">
        <button className="border w-[20%] p-3 bg-[var(--primary-dark)] text-white m-5" onClick={EditUser}>
          Submite
        </button>
      </div>
    </>
  );
}

export default EditProfile;
