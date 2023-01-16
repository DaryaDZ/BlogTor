import React,{useState,useEffect}from 'react'

function NewBlog() {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    console.log(date)
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
    <div>
      
    </div>
  )
}

export default NewBlog
