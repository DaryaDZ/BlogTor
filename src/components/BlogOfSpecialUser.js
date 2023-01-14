import React,{useState ,useEffect} from 'react'
import {useParams} from'react-router-dom';

function BlogOfSpecialUser() {
const [blogsofuser ,setBlogsofuser]=useState([])
const [userInfo ,setuserInfo]=useState({});
const [isLoading, setisLoading] = useState(true);
let {id} =useParams();
console.log();


useEffect(()=>{

//   const abc = async () => {

//     // promise - async await vs .then  - promise.all
// // hamzaman 2 fetch ejra mishavad
//     const [res1, res2] = await Promise.all([
//       fetch('http://localhost:4000/blog/by-user', {
//         method: "GET",
//         headers: { "Content-Type": "application/json" }
//          ,body:JSON.stringify({_id:id })
//       }),
//       fetch(`http://localhost:4000/user/singleUser/${id}`, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//       })
//     ]);

//     const [blogs, userinfo] = await Promise.all([
//       res1.json(),
//       res2.json()
//     ]);

//     setBlogsofuser(blogs);
//     setuserInfo(userinfo);
//     setisLoading(false)
//   }

//   abc();


  fetch(`http://localhost:4000/blog/by-user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }
    ,body:JSON.stringify({_id:id })
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setBlogsofuser(data);
      fetch(`http://localhost:4000/user/singleUser/${id}`)
      .then((res) => res.json())
      .then((data) =>{
        console.log(data)
        setuserInfo(data)})
      .finally(() => setisLoading(false));
    });

},[])

if (isLoading) return <h1>is Loading...</h1>;

  return (
    <div className="w-full  p-20 bg-gray-900">
      <div className='flex items-center '>
      <img src={`http://localhost:4000/${userInfo.avatar}`} alt="/" className="w-14 h-14 object-cover rounded-full"/>
      <h1 className='text-white text-3xl ml-2'>{userInfo.name}</h1>
      </div>
       <div className="ml-20 w-[88%] h-full flex flex-wrap">
      {blogsofuser.map((item)=>{
        return<>
     <div className="m-5  w-[350px] h-[370px] border-2  rounded-md bg-[rgb(255, 244, 244)] bg-white">
              <ul>
                <div className="flex justify-center">
                  <img src={item.imgurl} alt="" className="w-[50%] mt-1 object-cover" />
                </div>
                <div className="p-3 font-bold text-center">
                  <h1>{item.title}</h1>
                </div>
                </ul>
              
                </div>

      </>
      })}
      </div>
    </div>
  )
}

export default BlogOfSpecialUser
