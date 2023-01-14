import React from 'react'
import logo from "../Images/logo.png";
import {FaFacebook,FaTwitter,FaPinterest,FaInstagram,} from "react-icons/fa";
import {Link} from 'react-router-dom'
function Footer() {
  return (
    <div className='w-full bg-gray-100 py-16'>
        <div className='max-w-[1240px] mx-auto flex flex-col px-4'>
            <div className='sm:flex text-center justify-between items-center'>
            <img src={logo} className="w-12 h-12" alt="logo" />
            </div>
            <div className="flex justify-between w-full my-4">
            <FaFacebook className="icon" />
            <FaTwitter className="icon" />
            <FaPinterest className="icon" />
            <FaInstagram className="icon" />
          </div>
        </div>
      <div className='flex justify-between'>
        <ul className='lg:flex'>
        <li>About</li>
          <li>Contact</li>
            <li>News</li>
            <li>Advertising</li>

        </ul>
        <ul className='text-right lg:flex '>
        <Link to='/'>
          <li>Home</li>
          </Link>
          <Link to='blogs'>
          <li>Blogs</li>
          </Link>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
