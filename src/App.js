import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./components/Layout";
import Home from "./components/Home";
import LoginUserPage from "./components/UserProfile/LoginUserPage";
import Profile from "./components/UserProfile/Profile";
import AddBlog from "./components/UserProfile/AddBlog";
import EditBlog from "./components/UserProfile/EditBlog";
import AllMyBlog from './components/UserProfile/AllMyPost';
import EditProfile from "./components/UserProfile/EditProfile";
import Blogs from "./components/Blogs";
import BlogbyId from "./components/BlogbyId";
import TopUser from "./components/TopUser";
import TopBlog from "./components/TopBlog";
import BlogOfSpecialUser from "./components/BlogOfSpecialUser";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="blogs" element={<Blogs/>}/>
          <Route path="blogs/singleblog/:id" element={<BlogbyId />}/>
          <Route path="topuser" element={<TopUser />}/>
          <Route path="topblog" element={<TopBlog />}/>
          <Route path="blogs/blogsofspeceficuser/:id" element={<BlogOfSpecialUser />}/>
        </Route>

        {/* <Route path="LoginUserPage" element={<LoginUserPage />} /> */}
        <Route path="profile" element={<Profile />}>
          <Route  path="editprofile" element={<EditProfile />}/>
          <Route  path="allblogs" element={<AllMyBlog />}/>
          <Route path="editblog/:id" element={<EditBlog />} />
          <Route path="addblog" element={<AddBlog />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
