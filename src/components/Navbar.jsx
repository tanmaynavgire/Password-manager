import React from 'react'
import '../App.css'
const Navbar = () => {
  return (
    <div>
       <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div>
      <nav className= 'flex justify-around items-center h-12 font-medium '>
       
        <ul>
            <li className='space-x-5'>
                <a href="#"className='hover:font-bold' >Home</a>
                <a href="#"className='hover:font-bold' >About</a>
                <a href="#"className='hover:font-bold' >Contact</a>
            </li>
        </ul>

      </nav>
    </div>
  )
}

export default Navbar
