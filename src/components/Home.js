import React from 'react'
import { Outlet } from 'react-router-dom'
import BackGround from './BackGround'
import TopUser from './TopUser';
import TopBlog from './TopBlog';
import NewBlog from './NewBlog';
function Home() {
  return (
 <>
 <BackGround />
 <NewBlog />
 <TopUser />
 <TopBlog />

 </>
  )
}

export default Home
